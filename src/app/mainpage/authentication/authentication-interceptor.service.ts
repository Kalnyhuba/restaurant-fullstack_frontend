import { AuthenticationService, SKIP_INTERCEPT } from './authentication.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, switchMap } from 'rxjs';


@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {

    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.context.get(SKIP_INTERCEPT) == true) {
            return next.handle(request);
        }
        return next.handle(request).pipe(
            catchError((error: any) => {
                let errorMessage = error.error;
                if (error.status == 401) {
                    if (errorMessage == "Not logged in" || errorMessage == "Insufficient permissions" || errorMessage == "Invalid access token") {
                        this.router.navigate(['/mainpage']);
                    } else if (errorMessage == "Expired access cookie" || errorMessage == "Expired access token") {
                        return this.refreshAccessToken(request, next);
                    }
                } else if (error.status == 500) {
                    if (errorMessage == "Logout unsuccessful") {
                        this.router.navigate(['/mainpage']);
                    }
                }
                throw error;
            })
        );
    }

    refreshAccessToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authenticationService.refreshAccessToken().pipe(
            switchMap((responseMessage: { message: String}) => {
                return next.handle(request);
            }),
            catchError((error) => {
                this.router.navigate(['/mainpage']);
                throw error;
            })
        );
    }
}
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, catchError, of, map } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router, private authenticationService: AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authenticationService.validateAccessTokenAndGetAuthorities().pipe(
            map((responseMessage: { message: string }) => {
                return this.setAuthorities(responseMessage.message, state.url);
            }),
            catchError((error) => {
                return this.refreshAccessToken(route, state);
            })
        );
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute, state);
    }

    refreshAccessToken(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.authenticationService.refreshAccessToken().pipe(
            map((responseMessage: { message: string }) => {
                return this.setAuthorities(responseMessage.message, state.url);
            }),
            catchError((error) => {
                if (state.url.startsWith("/mainpage/home")) {
                    this.authenticationService.setAuthorities([]);
                    return of(true);
                }
                this.router.navigate(['/mainpage']);
                return of(false);
            })
        );
    }

    setAuthorities(message: string, url: string) {
        this.authenticationService.setAuthorities(JSON.parse(message));
        if (url.startsWith("/mainpage/admin") && !this.authenticationService.hasAdminPrivileges()) {
            this.router.navigate(['/mainpage']);
            return false;
        }
        return true;
    }
}
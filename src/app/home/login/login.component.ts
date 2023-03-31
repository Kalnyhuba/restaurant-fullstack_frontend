import { ModalComponent } from './../../commons/modal/modal.component';
import { MdbModalService, MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { HomeService } from './../home.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/mainpage/authentication/authentication.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild("button") button: ElementRef;

  @ViewChild("spinner") spinner: ElementRef;

  @ViewChild("buttonText") buttonText: ElementRef;

  modalRef: MdbModalRef<ModalComponent>;

  errorMessage = null;

  username = "";

  password = "";

  isVerifiedSuccessful = null;

  constructor(private http: HttpClient, private router: Router, private modalService: MdbModalService, private authenticationService: AuthenticationService, private homeService: HomeService) {
    let currentNavigation = this.router.getCurrentNavigation();
        if (currentNavigation != null && currentNavigation.extras["state"]) {
            if (currentNavigation.extras.state["isVerifiedSuccessful"]) {
                this.isVerifiedSuccessful = true;
            } else if (currentNavigation.extras.state.isVerifiedSuccessful === false) {
                this.isVerifiedSuccessful = false;
            }
        }
  }

  ngOnInit(): void {
    if (this.isVerifiedSuccessful === false) {
        this.errorMessage = "Sikertelen hitelesítés!";
    }
  }

  ngAfterViewInit(): void {
    this.homeService.setElements({
        button: this.button,
        spinner: this.spinner,
        buttonText: this.buttonText
    });
  }

  onSubmit(form: NgForm) {
    let data = form.form.value;

    if (form.form.invalid) {
        this.errorMessage = "Sikertelen bejelentkezés!";
        return;
    }
    this.errorMessage = null;

    this.homeService.onLoadingState.next({
        isLoading: true,
        elements: this.homeService.elements
    });
    this.http.post(
        'http://localhost:8080/user/auth/login',
        data,
        {
            responseType: 'json',
            withCredentials: true
        }
    )
        .subscribe({
            next: (responseData: { message: string }) => {
                this.authenticationService.setAuthorities(JSON.parse(responseData.message));
                this.router.navigate(['/mainpage/home']);
            },
            error: (error) => {
                this.errorMessage = error.error;
                this.homeService.onLoadingState.next({
                    isLoading: false,
                    elements: this.homeService.elements
                });
            },
            complete: () => { }
        });
  }

  onForgotPassword() {
    this.router.navigate(['forgot-password']);
  }
}

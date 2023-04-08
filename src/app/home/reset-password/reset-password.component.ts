import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from '../home.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordPopupComponent } from 'src/app/commons/reset-password-popup/reset-password-popup.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {

  @ViewChild("button") button: ElementRef;

  @ViewChild("spinner") spinner: ElementRef;

  @ViewChild("buttontext") buttonText: ElementRef;

  errorMessage = null;

  password = "";

  password_confirm = "";

  token = "";

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private homeService: HomeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.token = params.token;
      }
      );
    if (!this.token) {
      this.router.navigate(['home']);
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

    if (form.form.invalid || !this.token) {
        this.errorMessage = "Hiba a jelszó visszaállítása közben!";
        return;
    }
    this.errorMessage = null;

    this.homeService.onLoadingState.next({
        isLoading: true,
        elements: this.homeService.elements
    });
    this.http.post(
        'http://localhost:8080/user/reset_password',
        { token: this.token, password: data.password },
        { responseType: 'json' }
    )
        .subscribe({
            next: (responseData) => {
              this.openDialog();
                this.homeService.onLoadingState.next({
                    isLoading: false,
                    elements: this.homeService.elements
                });
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

openDialog() {
  const dialogRef = this.dialog.open(ResetPasswordPopupComponent);
}

onLogin() {
    this.router.navigate(['login']);
}
}

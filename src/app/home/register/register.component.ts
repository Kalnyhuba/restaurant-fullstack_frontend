import { ModalComponent } from './../../commons/modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { HomeService } from './../home.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RegisterPopupComponent } from 'src/app/commons/register-popup/register-popup.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {

  @ViewChild("modal") modal: ModalComponent;

  @ViewChild("button") button: ElementRef;

  @ViewChild("spinner") spinner: ElementRef;

  @ViewChild("buttonText") buttonText: ElementRef;

  errorMessage = null;

  firstName = "";

  lastName = "";

  username = "";

  email = "";

  password = "";

  password_confirm = "";

  modalRef: MdbModalRef<ModalComponent>;

  constructor(private http: HttpClient, private router: Router, private dialog:MatDialog, private homeService: HomeService) { }

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
      this.errorMessage = "Sikertelen regisztráció";
      return;
    }
    this.errorMessage = null;

    this.homeService.onLoadingState.next({
      isLoading: true,
      elements: this.homeService.elements
    });
    this.http.post(
      'http://localhost:8080/user/register',
      data,
      {responseType: 'json'}
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
    const dialogRef = this.dialog.open(RegisterPopupComponent);
  }

  onBack() {
    this.router.navigate(['/mainpage/home']);
  }

  onLogin() {
    this.router.navigate(['login']);
  }
}

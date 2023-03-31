import { NgForm } from '@angular/forms';
import { HomeService } from './../home.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ModalComponent } from 'src/app/commons/modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements AfterViewInit {

  @ViewChild("modal") modal: ModalComponent;

  @ViewChild("button") button: ElementRef;

  @ViewChild("spinner") spinner: ElementRef;

  @ViewChild("buttontext") buttonText: ElementRef;

  errorMessage = null;

  email = "";

  modalRef: MdbModalRef<ModalComponent>;

  constructor(private http: HttpClient, private router: Router, private homeService: HomeService, private modalService: MdbModalService) { }

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
      this.errorMessage = "Jelszó visszaállítása sikertelen";
      return;
    }
    this.errorMessage = null;

    this.homeService.onLoadingState.next({
      isLoading: true,
      elements: this.homeService.elements
    });
    this.http.post(
      'http://localhost:8080/user/forgot_password',
      data.email,
      { responseType: 'json' }
    )
      .subscribe({
        next: (responseData) => {
          this.openModal();
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

  openModal() {
    this.modalRef = this.modalService.open(ModalComponent, {
      data: {
        title: 'Jelszó visszaállítás',
        body: 'Helyreállító emailt küldtünk Önnek, kérem ellenőrizze email fiókját!',
        closeString: 'Bezárás',
        buttonString: 'Tovább a bejelentkezéshez'
      }
    });
  }

  onBack() {
    this.router.navigate(['login']);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { ResetPasswordPopupComponent } from './reset-password-popup/reset-password-popup.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { RegisterPopupComponent } from './register-popup/register-popup.component';
import { LoginPopupComponent } from './login-popup/login-popup.component';

@NgModule({
  declarations: [
    ModalComponent,
    ResetPasswordPopupComponent,
    RegisterPopupComponent,
    LoginPopupComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  exports: [ModalComponent]
})
export class CommonsModule { }

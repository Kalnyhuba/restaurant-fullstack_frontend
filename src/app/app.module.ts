import { ModalComponent } from './commons/modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CommonsModule } from './commons/commons.module';
import { AuthenticationService } from './mainpage/authentication/authentication.service';
import { MainpageModule } from './mainpage/mainpage.module';
import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule,
    HomeModule,
    MainpageModule,
    CommonsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [AuthenticationService, MdbModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }

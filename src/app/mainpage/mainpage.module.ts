import { MainpageComponent } from './mainpage.component';
import { CommonsModule } from './../commons/commons.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthenticationInterceptorService } from './authentication/authentication-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainhomeComponent } from './mainhome/mainhome.component';


@NgModule({
  declarations: [
    MainpageComponent,
    MainhomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonsModule,
    BrowserAnimationsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi: true}],
  exports: []
})
export class MainpageModule { }

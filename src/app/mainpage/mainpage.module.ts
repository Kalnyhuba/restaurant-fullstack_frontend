import { AuthGuard } from './authentication/auth-guard.service';
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
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './admin/add-product/add-product.component';

@NgModule({
  declarations: [
    MainpageComponent,
    MainhomeComponent,
    HeaderComponent,
    AdminDashboardComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi: true}],
  exports: []
})
export class MainpageModule { }

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
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { DragDropDirective } from './drag-drop.directive';
import { ShowImagesComponent } from './admin/show-images/show-images.component';
import { ProductDetailsComponent } from './mainhome/product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    MainpageComponent,
    MainhomeComponent,
    HeaderComponent,
    AdminDashboardComponent,
    AddProductComponent,
    DragDropDirective,
    ShowImagesComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    OrderConfirmationComponent,
    UserOrdersComponent,
    ProfileComponent,
    AboutComponent
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
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [AuthGuard, {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi: true}],
  exports: []
})
export class MainpageModule { }

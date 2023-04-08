import { AddProductComponent } from './mainpage/admin/add-product/add-product.component';
import { AdminDashboardComponent } from './mainpage/admin/admin-dashboard/admin-dashboard.component';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { AuthGuard } from './mainpage/authentication/auth-guard.service';
import { LoginComponent } from './home/login/login.component';
import { VerifyComponent } from './home/verify/verify.component';
import { RegisterComponent } from './home/register/register.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MainhomeComponent } from './mainpage/mainhome/mainhome.component';
import { ProductResolverService } from './mainpage/_services/product-resolver.service';
import { ProductDetailsComponent } from './mainpage/mainhome/product-details/product-details.component';
import { CartComponent } from './mainpage/cart/cart.component';
import { CheckoutComponent } from './mainpage/checkout/checkout.component';
import { BuyProductResolverService } from './mainpage/_services/buy-product-resolver.service';
import { OrderConfirmationComponent } from './mainpage/order-confirmation/order-confirmation.component';
import { UserOrdersComponent } from './mainpage/user-orders/user-orders.component';
import { ResetPasswordComponent } from './home/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'mainpage'
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'home',
        component: WelcomeComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'verify',
        component: VerifyComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent
      },
      {
        path: 'reset_password',
        component: ResetPasswordComponent
      }
    ]
  },
  {
    path: 'mainpage',
    component: MainpageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: MainhomeComponent,
        canActivate: [AuthGuard]
      },
      {
          path: 'product-details',
          component: ProductDetailsComponent,
          canActivate: [AuthGuard],
          resolve: { product: ProductResolverService }
        
      },
      {
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [AuthGuard],
        resolve: {
          productDetails: BuyProductResolverService
        }
      },
      {
        path: 'order-confirmation',
        component: OrderConfirmationComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'user-orders',
        component: UserOrdersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'dashboard'
          },
          {
            path: 'dashboard',
            component: AdminDashboardComponent
          },
          {
            path: 'add-product',
            component: AddProductComponent,
            resolve: {
              product: ProductResolverService
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

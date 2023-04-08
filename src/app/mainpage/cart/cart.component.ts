import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'price', 'action'];

  cartDetails: any = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails() {
    this.productService.getCartDetails()
      .subscribe({
        next: (response) => {
          this.cartDetails = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
        complete: () => { }
      });
  }

  deleteCartItem(id) {
    this.productService.deleteCartItem(id)
    .subscribe({
      next: (response) => {
        this.getCartDetails();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
      complete: () => { }
    });
  }

  checkout() {
    this.router.navigate(['/mainpage/checkout', {
      isSingleProduct: false, productId: 0
    }]);
    /*this.productService.getProductDetails(false, 0)
    .subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
      complete: () => { }
    });*/
  }
}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  productDetails: Product[] = [];

  isSingleProduct: string = "";

  orderDetails: OrderDetails = {
    fullName: "",
    fullAddress: "",
    contactNumber: "",
    orderProductQuantityList: []
  }

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.isSingleProduct = this.activatedRoute.snapshot.paramMap.get("isSingleProduct");
    this.productDetails.forEach(
      p => this.orderDetails.orderProductQuantityList.push(
        { productId: p.id, quantity: 1 }
      )
    );
  }

  public placeOrder(form: NgForm) {
    this.productService.placeOrder(this.orderDetails, this.isSingleProduct)
      .subscribe({
        next: (response) => {
          form.reset();
          this.router.navigate(['/mainpage/order-confirmation']);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
        complete: () => { }
      });
  }

  getQuantity(id) {
    const filteredProducts = this.orderDetails.orderProductQuantityList.filter(
      (quantity) => quantity.productId === id
    );
    return filteredProducts[0].quantity;
  }

  onQuantityChanged(q, id) {
    this.orderDetails.orderProductQuantityList.filter(
      (p) => p.productId === id
    )[0].quantity = q;
  }

  getTotalPrice(id, price) {
    const quantity = this.getQuantity(id);
    return quantity * price;
  }

  getBillTotal() {
    let total = 0;
    this.orderDetails.orderProductQuantityList.forEach(
      (quantity) => {
        const totalPrice = this.productDetails.filter(product => product.id === quantity.productId)[0].price;
        total += totalPrice * quantity.quantity;
      }
    );
    return total;
  }
}

import { ProductService } from './../../_services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from './../../_model/product.model';
import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  product: Product = {
    name: "",
    description: "",
    price: 0
  }

  constructor(private productService: ProductService) { }

  onSubmit(form: NgForm) {
    this.productService.addProduct(this.product)
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
        complete: () => { }
      });
  }
}

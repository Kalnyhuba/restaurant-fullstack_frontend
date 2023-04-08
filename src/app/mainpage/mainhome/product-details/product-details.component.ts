import { Component, OnInit } from '@angular/core';
import { Product } from '../../_model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  selectedImageIndex = 0;

  product: Product;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
  }

  changeIndex(index) {
    this.selectedImageIndex = index;
  }

  buyProduct(id) {
    this.router.navigate(['/mainpage/checkout', {
      isSingleProduct: true, productId: id
    }]);
  }

  addToCart(id) {
    this.productService.addToCart(id)
    .subscribe({
      next: (response) => {
        if (response == null) {
          console.log("A termék már hozzá lett adva a kosárhoz!");
        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      },
      complete: () => { }
    });
  }
}

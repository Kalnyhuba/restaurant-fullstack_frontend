import { Component, OnInit } from '@angular/core';
import { Product } from '../../_model/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  selectedImageIndex = 0;

  product: Product;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
      this.product = this.activatedRoute.snapshot.data['product'];
  }

  changeIndex(index) {
    this.selectedImageIndex = index;
  }
}

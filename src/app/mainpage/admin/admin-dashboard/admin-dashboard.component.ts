import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../_model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ShowImagesComponent } from '../show-images/show-images.component';
import { ImageProcessingService } from '../../_services/image-processing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  productDetails: Product[];

  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'actions'];

  constructor(private router: Router, private productService: ProductService, private imageDialog: MatDialog, private imageProcessingService: ImageProcessingService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts(searchKeyword: string = "") {
    this.productService.getAllProducts(searchKeyword)
      .subscribe({
        next: (response: Product[]) => {
          response.forEach((product: Product) => this.imageProcessingService.createImages(product));
          this.productDetails = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
        complete: () => { }
      });
  }

  searchByKeyword(searchKeyword) {
    this.productDetails = [];
    this.getAllProducts(searchKeyword);
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id)
      .subscribe({
        next: (response) => {
          this.getAllProducts();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
        complete: () => { }
      });
  }

  showImages(product: Product) {
    this.imageDialog.open(ShowImagesComponent, {
      data: {
        images: product.images
      },
      height: '500px',
      width: '800px'
    });
  }

  editProduct(id) {
    this.router.navigate(['/mainpage/admin/add-product', { id: id }]);
  }
}

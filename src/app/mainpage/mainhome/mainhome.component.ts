import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../_services/image-processing.service';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.component.html',
  styleUrls: ['./mainhome.component.css']
})
export class MainhomeComponent implements OnInit {

  isAdmin = false;

  isClient = false;

  productDetails = [];

  constructor(private authenticationService: AuthenticationService, private productService: ProductService, private imageProcessingService: ImageProcessingService, private router: Router) { }

  ngOnInit(): void {
    this.isAdmin = this.authenticationService.hasAdminPrivileges();
    this.isClient = this.authenticationService.hasClientPrivileges();
    this.getAllProducts();
  }

  public getAllProducts(searchKey: string = "") {
    this.productService.noCredentialsGetAllProducts(searchKey)
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

  onProductDetails(id) {
    this.router.navigate(['/mainpage/product-details', { id: id }]);
  }

  searchByKeyword(searchKeyword) {
    this.productDetails = [];
    this.getAllProducts(searchKeyword);
  }
}

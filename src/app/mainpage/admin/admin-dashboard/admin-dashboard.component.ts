import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../../_model/product.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  productDetails: Product[];

  displayedColumns: string[] = ['id', 'name', 'description', 'price'];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService.getAllProducts()
      .subscribe({
        next: (response: Product[]) => {
          console.log(response);
          this.productDetails = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
        complete: () => { }
      });
  }
}

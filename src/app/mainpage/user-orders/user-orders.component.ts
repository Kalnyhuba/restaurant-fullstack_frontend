import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserOrdersDetails } from '../_model/user-order-details.model';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  displayedColumns = ['name', 'address', 'contactNumber', 'amount', 'status'];

  userOrderDetails: UserOrdersDetails[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
      this.getOrderDetails();
  }

  getOrderDetails() {
    this.productService.getUserOrdersDetails()
      .subscribe({
        next: (response: UserOrdersDetails[]) => {
          console.log(response);
          this.userOrderDetails = response;
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
        complete: () => { }
      });
  }
}

import { OrderItem } from './../_model/order-item.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserOrdersDetails } from '../_model/user-order-details.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserOrdersComponent implements OnInit {

  displayedColumns = ['name', 'address', 'contactNumber', 'products', 'amount', 'status'];

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

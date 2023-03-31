import { Product } from './../_model/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public addProduct(product: Product) {
    return this.http.post<Product>("http://localhost:8080/admin/add-product", product, { withCredentials: true });
  }
}

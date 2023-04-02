import { Product } from './../_model/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public addProduct(product: FormData) {
    return this.http.post<Product>("http://localhost:8080/admin/add-product", product, { withCredentials: true });
  }

  public getAllProducts() {
    return this.http.get<Product[]>("http://localhost:8080/admin/all-products", { withCredentials: true });
  }
}

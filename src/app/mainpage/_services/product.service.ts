import { Product } from './../_model/product.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductPage } from '../_model/product-page.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public addProduct(product: FormData) {
    return this.http.post<Product>("http://localhost:8080/admin/add-product", product, { withCredentials: true });
  }

  public getAllProducts(searchKeyword: string = "") {
    return this.http.get<Product[]>("http://localhost:8080/admin/all-products?searchKey=" + searchKeyword, { withCredentials: true });
  }

  public getProductById(id) {
    return this.http.get<Product>("http://localhost:8080/admin/get-product-by-id/" + id, { withCredentials: true });
  }

  public deleteProduct(id: number) {
    return this.http.delete("http://localhost:8080/admin/delete-product/" + id, { withCredentials: true });
  }

  public noCredentialsGetAllProducts(searchKeyword: string = "") {
    return this.http.get<Product[]>("http://localhost:8080/all-products?searchKey=" + searchKeyword, { withCredentials: true });
  }
}

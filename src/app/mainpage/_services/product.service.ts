import { Product } from './../_model/product.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductPage } from '../_model/product-page.model';
import { OrderDetails } from '../_model/order-details.model';

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

  public getProductDetails(isSingleProduct, productId) {
    return this.http.get<Product[]>("http://localhost:8080/product-details/" + isSingleProduct + "/" + productId, { withCredentials: true });
  }

  public placeOrder(orderDetails: OrderDetails) {
    return this.http.post("http://localhost:8080/place-order", orderDetails, { withCredentials: true });
  }

  public addToCart(id) {
    return this.http.get("http://localhost:8080/add-to-cart/" + id, { withCredentials: true });
  }

  public getCartDetails() {
    return this.http.get("http://localhost:8080/cart-details", { withCredentials: true });
  }
}

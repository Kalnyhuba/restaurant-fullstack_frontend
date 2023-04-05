import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Product } from '../_model/product.model';
import { Observable, map, of } from 'rxjs';
import { ProductService } from './product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {

  constructor(private productService: ProductService, private imageProcessingService: ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = route.paramMap.get("id");
    if (id) {
      return this.productService.getProductById(id)
        .pipe(
          map(p => this.imageProcessingService.createImages(p))
        );
    } else {
      return of(this.getProduct());
    }
  }

  getProduct() {
    return {
      id: null,
      name: "",
      description: "",
      price: 0,
      images: []
    }
  }
}

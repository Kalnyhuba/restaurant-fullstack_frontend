import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../_model/product.model';
import { ProductService } from './product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]> {

  constructor(private productService: ProductService, private imageProcessingService: ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {
    const id = route.paramMap.get("productId");
    const isSingleProduct = route.paramMap.get("isSingleProduct");
    return this.productService.getProductDetails(isSingleProduct, id)
      .pipe(
        map((p: Product[], i) => p.map((product: Product) => this.imageProcessingService.createImages(product))
        ));
  }
}

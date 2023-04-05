import { FileHandle } from './../../_model/file-handle.model';
import { ProductService } from './../../_services/product.service';
import { NgForm } from '@angular/forms';
import { Product } from './../../_model/product.model';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  isNewProduct = true;

  product: Product = {
    id: null,
    name: "",
    description: "",
    price: 0,
    images: []
  }

  constructor(private productService: ProductService, private sanitizer: DomSanitizer, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
      this.product = this.activatedRoute.snapshot.data['product'];
      if (this.product && this.product.id) {
        this.isNewProduct = false;
      }
  }

  onSubmit(form: NgForm) {
    const productFormData = this.convertToFormData(this.product);
    this.productService.addProduct(productFormData)
      .subscribe({
        next: (response) => {
          form.reset();
          this.product.images = [];
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        },
        complete: () => { }
      });
  }

  convertToFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    for (var i = 0; i < product.images.length; i++) {
      formData.append('image', product.images[i].file, product.images[i].file.name);
    }
    return formData;
  }

  onFileSelected(event) {
    if (event.target.files) {
      const fileUploaded = event.target.files[0];
      const fileHandle: FileHandle = {
        file: fileUploaded,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(fileUploaded))
      }
      this.product.images.push(fileHandle);
    }
  }

  removeImage(i: number) {
    this.product.images.splice(i, 1);
  }

  fileDropped(fileHandle: FileHandle) {
    this.product.images.push(fileHandle);
  }
}

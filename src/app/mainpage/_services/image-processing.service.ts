import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImages(product: Product) {
    const images: any[] = product.images;
    const imagesToFileHandle: FileHandle[] = [];
    for (let i = 0; i < images.length; i++) {
      const imageFileData = images[i];
      const imageBlob = this.dataURItoBlob(imageFileData.bytes, imageFileData.type);
      const imageFile = new File([imageBlob], imageFileData.name, { type: imageFileData.type });
      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
      imagesToFileHandle.push(finalFileHandle);
    }
    product.images = imagesToFileHandle;
    return product;
  }

  public dataURItoBlob(bytes, type) {
    const byteString = window.atob(bytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: type });
    return blob;
  }
}

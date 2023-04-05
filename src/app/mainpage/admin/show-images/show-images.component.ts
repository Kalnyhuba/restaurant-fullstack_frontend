import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileHandle } from '../../_model/file-handle.model';
@Component({
  selector: 'app-show-images',
  templateUrl: './show-images.component.html',
  styleUrls: ['./show-images.component.css']
})
export class ShowImagesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.receiveImages();
  }

  receiveImages() {
    console.log(this.data);
  }
}

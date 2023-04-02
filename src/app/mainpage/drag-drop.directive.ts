import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from './_model/file-handle.model';
import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  @Output() files: EventEmitter<FileHandle> = new EventEmitter();

  @HostBinding("style.background") private backgroundColor = "#eee";

  constructor(private sanitizer: DomSanitizer) { }

  @HostListener("dragover", ["$event"])
  public onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroundColor = "#999";
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroundColor = "#eee";
  }

  @HostListener("drop", ["$event"])
  public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroundColor = "#eee";

    let fileHandle: FileHandle;
    const file = event.dataTransfer.files[0];
    const url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
    fileHandle = {file, url};
    this.files.emit(fileHandle);
  }

}

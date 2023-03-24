import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  title: string; 

  body: string; 

  closeString: string; 

  buttonString: string;

  constructor(public modalRef: MdbModalRef<ModalComponent>, public router: Router) { }

  onLogin() {
    this.router.navigate(['login']);
    this.modalRef.close();
  }
}

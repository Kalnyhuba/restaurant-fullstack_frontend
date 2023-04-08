import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-popup',
  templateUrl: './register-popup.component.html',
  styleUrls: ['./register-popup.component.css']
})
export class RegisterPopupComponent {

  constructor(private router: Router) { }

  toLogin() {
    this.router.navigate(['login']);
  }
}

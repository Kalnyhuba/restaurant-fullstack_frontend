import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.css']
})
export class LoginPopupComponent {

  constructor(private router: Router) { }

  toLogin() {
    this.router.navigate(['login']);
  }
}

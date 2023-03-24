import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mainhome',
  templateUrl: './mainhome.component.html',
  styleUrls: ['./mainhome.component.css']
})
export class MainhomeComponent {

  constructor(private http: HttpClient, private router: Router) { }

  redirectToRegister() {
    this.router.navigate(['/register']);
}

redirectToLogin() {
    this.router.navigate(['/login']);
}

}

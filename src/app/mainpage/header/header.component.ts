import { AuthenticationService } from './../authentication/authentication.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  
  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router, private authenticationService: AuthenticationService) { }

  ngAfterViewInit(): void {
      this.isLoggedIn = this.isAdmin() || this.isClient();
  }

  isAdmin() {
    return this.authenticationService.hasAdminPrivileges();
  }

  isClient() {
    return this.authenticationService.hasClientPrivileges();
  }

  onLogout() {
    this.http.get(
      'http://localhost:8080/user/auth/logout',
      {
        withCredentials: true
      }
    )
      .subscribe({
        next: (responseData) => {
          setTimeout(() => {
            this.router.navigate(['/mainpage'])
              .then(() => {
                window.location.reload()
              });
          }, 1000);
        },
        error: (error) => {
          console.log("Logout error");
          this.router.navigate(['/mainpage']);
        },
        complete: () => { }
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Profile } from '../_model/profile.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  displayedColumns: string[] = ['fullName', 'username', 'email'];

  profileData: Profile = {
    fullName: "",
    username: "",
    email: ""
  };

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
      this.getProfileData();
  }

  getProfileData() {
    this.http.get(
      'http://localhost:8080/user-profile',
      {
        withCredentials: true
      }
    )
      .subscribe({
        next: (response: {
          fullName: string,
          username: string,
          email: string,
        }) => {
          this.profileData = response;
        },
        error: (error: HttpErrorResponse) => { console.log(error) },
        complete: () => { }
      });
  }
}

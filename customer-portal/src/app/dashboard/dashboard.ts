import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
   standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {

  username: string | null = '';
  profileData: any;

  constructor(
    private auth: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // ✅ Get username from storage (if saved during login)
    this.username = localStorage.getItem('username');

    // Optional: Debug
    console.log("Username:", this.username);
    console.log("Token:", this.auth.getToken());
  }

  // ✅ Call protected API
  getProfile() {

    const token = this.auth.getToken();

    if (!token) {
      alert("No token found. Please login again.");
      return;
    }

    this.http.get('http://localhost:8080/api/users/profile', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).subscribe({
      next: (res) => {
        console.log("Profile Data:", res);
        this.profileData = res;
      },
      error: (err) => {
        console.error("Error:", err);
        alert("Failed to fetch profile");
      }
    });
  }

  // ✅ Logout
  logout() {
    this.auth.logout();
    window.location.href = '/login';
  }
}
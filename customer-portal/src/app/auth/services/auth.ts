import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments-module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.api}/register`, data);
  }

  activate(token: string): Observable<any> {
    return this.http.get(`${this.api}/activate-account?token=${token}`);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.api}/authenticate`, credentials);
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  saveToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
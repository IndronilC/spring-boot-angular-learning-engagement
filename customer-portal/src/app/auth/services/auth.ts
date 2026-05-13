import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments-module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = `${environment.apiUrl}/auth`;
  private accessTokenKey = 'accessToken';
  private refreshTokenKey = 'refreshToken';

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

  saveToken(accessToken: string, refreshToken: string) {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
}

   setTokens(access: string, refresh: string) {
     localStorage.setItem(this.accessTokenKey, access);
     localStorage.setItem(this.refreshTokenKey, refresh);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

    getAccessToken(): string | null {
      return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }
    
  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  clear() {
     localStorage.removeItem('accessToken');
     localStorage.removeItem('refreshToken');
  }
}
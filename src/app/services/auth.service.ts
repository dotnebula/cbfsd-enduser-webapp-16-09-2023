import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  private AUTH_URL ="login";

  loginUser(userObj:any) {
    return this.httpClient.post<any[]>(`${environment.apiBaseUrl}/users/login`, userObj);
  }

  registerUser(userObj:any) {
    return this.httpClient.post<any[]>(`${environment.apiBaseUrl}/users`, userObj);
  }
  

  isLoggedIn():boolean {
    let authToken = localStorage.getItem('x-auth-token');
    let adminId = localStorage.getItem('x-admin-id');
    let fullName = localStorage.getItem('x-admin-name');
    return !(!authToken && !adminId && !fullName);
  }

  getCurrentUser() {
    return this.httpClient.get<any[]>(`${environment.apiBaseUrl}/users/${this.UserId}`);
  }

  get fullName() {
    return localStorage.getItem('x-admin-name');
  }

  get UserId() {
    return localStorage.getItem('x-user-id');
  }

  get AuthToken() {
    return localStorage.getItem('x-auth-token') ;
  }

  logOut() {
    localStorage.clear();
  }
}

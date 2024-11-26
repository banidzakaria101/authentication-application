import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiBaseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  signup(registerUser: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/signup`, registerUser);
  }

  login(loginUser: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/login`, loginUser);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiBaseUrl = 'http://localhost:8088/auth';

  constructor(private http: HttpClient) {}

  signup(registerUser: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/signup`, registerUser);
  }

  login(loginUser: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/login`, loginUser).pipe(
      tap((response: any) => {
        if (response?.username) {
          localStorage.setItem('userName', response.userName); 
        }
      })
    );
  }
}

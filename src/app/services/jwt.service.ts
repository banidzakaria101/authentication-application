import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  getUsernameFromToken(token: string): string {
    const decodedToken = this.decodeToken(token);
    return decodedToken?.sub || 'User'; 
}

  removeToken(): void {
    localStorage.removeItem('token');
  }

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
}

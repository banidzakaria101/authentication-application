import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { username: '', password: '' };

  constructor(private authService: AuthenticationService) {}

  onLogin() {
    this.authService.login(this.loginData).subscribe(
      (response: any) => {
        console.log('Login successful:', response);
        // Save token and redirect
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginUserDto } from '../dto/login-user-dto.dto';
import { LoginResponse } from '../dto/login-response.model';
import { JwtService } from '../../services/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private jwtService: JwtService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      const loginUser: LoginUserDto = {
        email: formValues.email,
        password: formValues.password,
      };

      this.authService.login(loginUser).subscribe({
        next: (response: LoginResponse) => {
          const token = response?.token;
          if (token) {
            this.jwtService.saveToken(token);
            const userName = this.jwtService.getUsernameFromToken(token);
            localStorage.setItem('userName', userName);
            this.router.navigate(['/welcome']);
          } else {
            this.errorMessage = 'Login failed: No token received!';
          }
        },
        error: () => {
          this.errorMessage = 'Login failed. Please check your credentials.';
        },
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
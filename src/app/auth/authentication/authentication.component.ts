import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../../services/jwt.service';
import { LoginUserDto } from '../dto/login-user-dto.dto';
import { LoginResponse } from '../dto/login-response.model';
import { User } from '../../user';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private jwtService: JwtService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggleSignup() {
    document.querySelector('.cont')?.classList.toggle('s--signup');
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

  onSignup() {
    if (this.signupForm.valid) {
      const user: User = this.signupForm.value;
      this.authService.signup(user).subscribe({
        next: response => {
          this.successMessage = 'User registered successfully!';
          this.errorMessage = '';
          this.signupForm.reset();
          this.toggleSignup(); // Optional: auto-switch to login after signup
        },
        error: err => {
          this.errorMessage = 'Error during signup. Please try again.';
          this.successMessage = '';
        }
      });
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.successMessage = '';
    }
  }
}
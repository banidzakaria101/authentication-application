import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],  // userName field
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  
  onSubmit() {
    if (this.signupForm.valid) {
      const user: User = this.signupForm.value;
      this.authService.signup(user).subscribe({
        next: response => {
          this.successMessage = 'User registered successfully!';
          this.errorMessage = '';
          this.signupForm.reset();
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

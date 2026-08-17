import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],

  templateUrl: './admin-login.html',
  styleUrl: './admin-login.scss'
})
export class AdminLogin {

  loginForm: FormGroup;

  hidePassword = true;

  loginError = '';

  isLoading = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({

      username: [
        '',
        Validators.required
      ],

      password: [
        '',
        Validators.required
      ]

    });

  }


  onLogin(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }


    this.loginError = '';

    this.isLoading = true;


    const request = {
      username:
        this.loginForm.value.username,

      password:
        this.loginForm.value.password
    };


    this.authService
      .login(request)
      .subscribe({

        next: () => {

          this.isLoading = false;

          // Login successful
          this.router.navigate([
            '/admin/enquiries'
          ]);

        },

        error: (error) => {

          this.isLoading = false;

          console.error(
            'Login failed:',
            error
          );

          this.loginError =
            'Invalid username or password.';

        }

      });

  }

}
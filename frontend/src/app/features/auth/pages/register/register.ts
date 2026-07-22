import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  private authService = inject(AuthService);

  private toastr = inject(ToastrService);

  private router = inject(Router);

  form = {
    username: '',
    email: '',
    phone: '',
    role: 'customer',
    password: '',
    confirmPassword: ''
  };

  register(): void {

    if (this.form.password !== this.form.confirmPassword) {

      this.toastr.error(
        'Passwords do not match.'
      );

      return;

    }

    this.authService.register({

      username: this.form.username,

      email: this.form.email,

      phone: this.form.phone,

      role: this.form.role,

      password: this.form.password

    }).subscribe({

      next: () => {

        this.toastr.success(
          'Registration successful!'
        );

        this.router.navigate(['/login']);

      },

      error: (error) => {

        console.error(error);

        if (error.error) {

          for (const key in error.error) {

            const message = error.error[key];

            if (Array.isArray(message)) {

              this.toastr.error(message[0]);

            } else {

              this.toastr.error(message);

            }

          }

        } else {

          this.toastr.error(
            'Registration failed.'
          );

        }

      }

    });

  }

}
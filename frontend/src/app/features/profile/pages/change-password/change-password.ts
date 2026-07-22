import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss'
})
export class ChangePassword {

  private fb = inject(FormBuilder);

  private profileService = inject(ProfileService);

  private router = inject(Router);

  passwordForm = this.fb.group({

    current_password: ['', Validators.required],

    new_password: ['', [
      Validators.required,
      Validators.minLength(8)
    ]],

    confirm_password: ['', Validators.required]

  });

  save(): void {

    if (this.passwordForm.invalid) {

      this.passwordForm.markAllAsTouched();

      return;

    }

    this.profileService.changePassword(
      this.passwordForm.value as any
    ).subscribe({

      next: () => {

        alert('Password changed successfully.');

        this.router.navigate(['/profile']);

      },

      error: (error) => {

        console.error(error);

        if (error.error?.current_password) {

          alert(error.error.current_password[0]);

        }
        else if (error.error?.new_password) {

          alert(error.error.new_password[0]);

        }
        else if (error.error?.confirm_password) {

          alert(error.error.confirm_password[0]);

        }
        else {

          alert('Failed to change password.');

        }

      }

    });

  }

}
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.scss'
})
export class EditProfile implements OnInit {

  private fb = inject(FormBuilder);

  private profileService = inject(ProfileService);

  private router = inject(Router);

  successMessage = '';

  errorMessage = '';

  profileForm = this.fb.group({

    first_name: ['', Validators.required],

    last_name: [''],

    email: ['', [Validators.required, Validators.email]],

    phone: [''],

    address: ['']

  });

  ngOnInit(): void {

    this.loadProfile();

  }

  loadProfile(): void {

    this.profileService.getProfile().subscribe({

      next: (profile) => {

        this.profileForm.patchValue({

          first_name: profile.first_name,
          last_name: profile.last_name,
          email: profile.email,
          phone: profile.phone,
          address: profile.address

        });

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  saveProfile(): void {


    if (this.profileForm.invalid) {

      this.profileForm.markAllAsTouched();

      return;

    }


    this.profileService.updateProfile(
      this.profileForm.value
    )
    .subscribe({

      next: () => {


        this.successMessage =
        'Profile updated successfully.';


        setTimeout(()=>{

          this.router.navigate(['/profile']);

        },1000);


      },


      error:(error)=>{


        console.error(error);


        this.errorMessage =
        'Failed to update profile.';


      }


    });


  }

}
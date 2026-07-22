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



  successMessage = '';

  errorMessage = '';



  passwordForm = this.fb.group({

    current_password: [
      '',
      Validators.required
    ],

    new_password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],

    confirm_password: [
      '',
      Validators.required
    ]

  });



  changePassword(): void {


    this.successMessage = '';

    this.errorMessage = '';



    if(this.passwordForm.invalid){

      this.passwordForm.markAllAsTouched();

      return;

    }



    const data = this.passwordForm.value;



    if(
      data.new_password !== data.confirm_password
    ){

      this.errorMessage =
      "New passwords do not match.";

      return;

    }



    this.profileService.changePassword(
      data as any
    )
    .subscribe({

      next:(response)=>{


        this.successMessage =
        "Password changed successfully.";



        setTimeout(()=>{

          this.router.navigate(['/profile']);

        },1500);



      },


      error:(error)=>{


        console.error(error);



        if(error.error?.current_password){

          this.errorMessage =
          error.error.current_password[0];

        }
        else if(error.error?.new_password){

          this.errorMessage =
          error.error.new_password[0];

        }
        else{

          this.errorMessage =
          "Failed to change password.";

        }


      }


    });



  }


}
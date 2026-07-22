import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from '../../services/auth';



@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  private authService = inject(AuthService);

  private router = inject(Router);

  username = '';

  password = '';

  login(): void {

    this.authService.login(this.username, this.password).subscribe({

      next: (response) => {

        this.authService.saveAuth(
          response.access,
          response.refresh,
          response.user
      );

        this.router.navigate(['/']);

      },

      error: (error) => {

        console.log(error);

      }

    });

  }

}
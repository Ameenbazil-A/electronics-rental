import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {

  private authService = inject(AuthService);

  private router = inject(Router);

  isLoggedIn(): boolean {

    return this.authService.isLoggedIn();

  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

  isAdmin(): boolean {

    return this.authService.isAdmin();

  }

  getUsername(): string {

    return this.authService.getUsername();

  }

}
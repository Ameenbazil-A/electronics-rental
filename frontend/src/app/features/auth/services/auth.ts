import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { User } from '../models/user.model';

import { RegisterRequest } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/login/`;

  login(username: string, password: string): Observable<any> {

    return this.http.post(this.apiUrl, {
      username,
      password
    });

  }

  register(data: RegisterRequest) {

    return this.http.post(
      `${environment.apiUrl}/register/`,
      data
    );

  }

  saveAuth(
    access: string,
    refresh: string,
    user: User
    ): void {

      localStorage.setItem('access', access);

      localStorage.setItem('refresh', refresh);

      localStorage.setItem(
        'user',
        JSON.stringify(user)
      );

  }

  getAccessToken(): string | null {

    return localStorage.getItem('access');

  }

  logout(): void {

    localStorage.removeItem('access');

    localStorage.removeItem('refresh');

    localStorage.removeItem('user');

  }

  getUser(): User | null {

    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;

  }

  isAdmin(): boolean {

    return this.getUser()?.is_staff ?? false;

  }

  getUsername(): string {

    return this.getUser()?.username ?? '';

  }

  isLoggedIn(): boolean {

    return !!this.getAccessToken();

  }

  isLoggedOut(): boolean {

    return !this.getAccessToken();

  }

}
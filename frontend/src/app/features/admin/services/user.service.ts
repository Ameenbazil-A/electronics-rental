import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { User } from '../models/user.model';
import { ApiResponse } from '../../products/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/users/`;

  getUsers(): Observable<ApiResponse<User>> {

    return this.http.get<ApiResponse<User>>(this.apiUrl);

    }

}
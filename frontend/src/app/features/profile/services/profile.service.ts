import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/profile/`;

  getProfile(): Observable<Profile> {

    return this.http.get<Profile>(this.apiUrl);

  }

  updateProfile(data: any): Observable<Profile> {

    return this.getProfile().pipe(

        switchMap(profile => {

        return this.http.put<Profile>(this.apiUrl, {

            username: profile.username,

            ...data

        });

        })

    );

  }

  changePassword(data: {current_password: string; new_password: string; confirm_password: string;}) {

    return this.http.post(
        `${environment.apiUrl}/change-password/`,
        data
    );

    }

}
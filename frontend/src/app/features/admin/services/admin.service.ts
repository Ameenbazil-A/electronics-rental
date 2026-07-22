import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Dashboard } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/admin/dashboard/`;

  getDashboardStats(): Observable<Dashboard> {

    return this.http.get<Dashboard>(this.apiUrl);

  }

}
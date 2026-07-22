import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';

import { Booking } from '../models/booking.model';

import { ApiResponse } from '../../products/models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/bookings/`;

  createBooking(data: any): Observable<Booking> {

    return this.http.post<Booking>(this.apiUrl, data);

  }

  getBookings(): Observable<ApiResponse<Booking>> {

    return this.http.get<ApiResponse<Booking>>(this.apiUrl);

  }

  getMyBookings(): Observable<ApiResponse<Booking>> {

    return this.http.get<ApiResponse<Booking>>(
      `${this.apiUrl}my-bookings/`
   );

  }


  cancelBooking(id: number): Observable<any> {

    return this.http.post(
      `${this.apiUrl}${id}/cancel/`,
      {}
    );

  }

  updateStatus(id: number, status: string) {

    return this.http.post(
      `${this.apiUrl}${id}/update_status/`,
      {
        status: status
      }
    );

  }

}
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterLink } from '@angular/router';

import { BookingService } from '../../services/booking';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    CommonModule, RouterLink
  ],
  templateUrl: './my-bookings.html',
  styleUrl: './my-bookings.scss',
})
export class MyBookings implements OnInit {

  private bookingService = inject(BookingService);

  bookings: Booking[] = [];

  ngOnInit(): void {

    this.loadBookings();

  }

  loadBookings(): void {

    this.bookingService.getBookings().subscribe({

      next: (response) => {

        this.bookings = response.results;

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  cancelBooking(id: number): void {

    if (!confirm('Cancel this booking?')) {
      return;
    }

    this.bookingService.cancelBooking(id).subscribe({

      next: () => {

        this.loadBookings();

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

}
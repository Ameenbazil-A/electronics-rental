import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.html',
  styleUrl: './bookings.scss',
})
export class Bookings implements OnInit {

  private bookingService = inject(BookingService);

  bookings: Booking[] = [];

  ngOnInit(): void {

    this.loadBookings();

  }

  loadBookings(): void {

    this.bookingService.getBookings().subscribe({

      next: (response) => {

        this.bookings = response.results;

        console.log(response.results);

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  cancelBooking(id: number): void {

    if (!confirm('Are you sure you want to cancel this booking?')) {

      return;

    }

    this.bookingService.cancelBooking(id).subscribe({

      next: () => {

        alert('Booking cancelled successfully.');

        this.loadBookings();

      },

      error: (error) => {

        console.error(error);

        alert('Unable to cancel booking.');

      }

    });

  }

}
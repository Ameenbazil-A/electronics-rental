import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingService } from '../../../bookings/services/booking';
import { Booking } from '../../../bookings/models/booking.model';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-bookings.html',
  styleUrl: './manage-bookings.scss',
})
export class ManageBookings implements OnInit {

  private bookingService = inject(BookingService);

  private toastr = inject(ToastrService);

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


  updateStatus(id: number, status: string): void {

    this.bookingService.updateStatus(id, status).subscribe({

      next: () => {

        this.toastr.success(
          'Booking updated successfully.',
          'Success'
        );

        this.loadBookings();

      },

      error: (error) => {

        console.error(error);

        this.toastr.error(
          'Failed to update booking.',
          'Error'
        );

      }

    });

  }

}
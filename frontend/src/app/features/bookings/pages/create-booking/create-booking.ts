import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../../products/services/product.service';
import { Product } from '../../../products/models/product.model';

import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { BookingService } from '../../services/booking';

@Component({
  selector: 'app-create-booking',
  imports: [FormsModule],
  templateUrl: './create-booking.html',
  styleUrl: './create-booking.scss',
})
export class CreateBooking implements OnInit {

  private route = inject(ActivatedRoute);

  private productService = inject(ProductService);

  private bookingService = inject(BookingService);

  private router = inject(Router);

  product?: Product;

  startDate = '';

  endDate = '';

  rentalDays = 0;

  totalRent = 0;

  successMessage = '';

  errorMessage = '';

  today = new Date().toISOString().split('T')[0];

  calculateRent(): void {

    if (!this.startDate || !this.endDate || !this.product) {

      this.rentalDays = 0;
      this.totalRent = 0;

      return;

    }

    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    const difference = end.getTime() - start.getTime();

    const days = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    if (days <= 0) {

      this.rentalDays = 0;
      this.totalRent = 0;

      return;

    }

    this.rentalDays = days;

    this.totalRent =
      days * Number(this.product.daily_rent);

  }


  confirmBooking(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (!this.product) {
      return;
    }

    if (!this.startDate || !this.endDate) {

      this.errorMessage = 'Please select both dates.';
      return;

    }

    const bookingData = {

      product: this.product.id,
      start_date: this.startDate,
      end_date: this.endDate

    };

    this.bookingService.createBooking(bookingData).subscribe({

      next: (response) => {

        this.successMessage = 'Booking created successfully!';

        console.log(response);

        setTimeout(() => {

          this.router.navigate(['/bookings']);

        }, 1500);

      },

      error: (error) => {

        console.log(error);

        if (error.error?.non_field_errors) {

          this.errorMessage = error.error.non_field_errors[0];

        } else {

          this.errorMessage = 'Failed to create booking.';

        }

      }

    });

  }


  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(id).subscribe({

      next: (response) => {

        this.product = response;

        console.log(response);

      }

    });

  }

}
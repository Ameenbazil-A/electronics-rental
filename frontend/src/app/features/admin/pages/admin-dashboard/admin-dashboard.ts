import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import { AdminService } from '../../services/admin.service';

import { RouterLink } from '@angular/router';

import {
  Dashboard,
  RecentBooking,
  MonthlyBooking,
  MonthlyRevenue
} from '../../models/dashboard.model';

// import {
//   Chart,
//   DoughnutController,
//   ArcElement,
//   Tooltip,
//   Legend
// } from 'chart.js/auto';

// Chart.register(
//   DoughnutController,
//   ArcElement,
//   Tooltip,
//   Legend
// );

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard implements OnInit {

  private adminService = inject(AdminService);

  totalProducts = 0;
  totalBookings = 0;

  pendingBookings = 0;
  approvedBookings = 0;
  activeBookings = 0;
  completedBookings = 0;
  cancelledBookings = 0;

  bookingChart?: Chart;

  monthlyChart?: Chart;

  revenueChart?: Chart;

  recentBookings: RecentBooking[] = [];

  totalRevenue = 0;

  monthlyBookings: MonthlyBooking[] = [];

  monthlyRevenue: MonthlyRevenue[] = [];

  

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard(): void {

    this.adminService.getDashboardStats().subscribe({

      next: (data) => {

        this.totalProducts = data.total_products;

        this.totalBookings = data.total_bookings;

        this.pendingBookings = data.pending_bookings;

        this.approvedBookings = data.approved_bookings;

        this.activeBookings = data.active_bookings;

        this.completedBookings = data.completed_bookings;

        this.cancelledBookings = data.cancelled_bookings;

        this.createChart();

        this.createMonthlyChart();

        this.createRevenueChart();

        this.recentBookings = data.recent_bookings;

        this.totalRevenue = Number(data.total_revenue);

        this.monthlyBookings = data.monthly_bookings;

        this.monthlyRevenue = data.monthly_revenue;

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  createChart(): void {

    if (this.bookingChart) {
      this.bookingChart.destroy();
    }

    this.bookingChart = new Chart("bookingChart", {

      type: "doughnut",

      data: {

        labels: [
          "Pending",
          "Approved",
          "Active",
          "Completed",
          "Cancelled"
        ],

        datasets: [

          {
            data: [
              this.pendingBookings,
              this.approvedBookings,
              this.activeBookings,
              this.completedBookings,
              this.cancelledBookings
            ],

            backgroundColor: [
              "#FFC107",
              "#0DCAF0",
              "#0D6EFD",
              "#198754",
              "#DC3545"
            ],

            borderWidth: 2

          }

        ]

      },

      options: {

        responsive: true,

        plugins: {

          legend: {

          position: "bottom"

          }

        }

      }

    });

  }

  createMonthlyChart(): void {

    if (this.monthlyChart) {
      this.monthlyChart.destroy();
    }

    this.monthlyChart = new Chart("monthlyChart", {

      type: "bar",

      data: {

        labels: this.monthlyBookings.map(item => item.month),

        datasets: [

          {

            label: "Bookings",

            data: this.monthlyBookings.map(item => item.count),

            backgroundColor: "#0d6efd",

            borderRadius: 8

          }

        ]

      },

      options: {

        responsive: true,

        plugins: {

          legend: {

            display: false

          }

        },

        scales: {

          y: {

            beginAtZero: true

          }

        }

      }

    });

  }

  createRevenueChart(): void {

    if (this.revenueChart) {
      this.revenueChart.destroy();
    }

    this.revenueChart = new Chart("revenueChart", {

      type: "line",

      data: {

        labels: this.monthlyRevenue.map(item => item.month),

        datasets: [

          {

            label: "Revenue",

            data: this.monthlyRevenue.map(item => item.total),

            borderColor: "#198754",

            backgroundColor: "rgba(25,135,84,0.2)",

            fill: true,

            tension: 0.4

          }

        ]

      },

      options: {

        responsive: true,

        plugins: {

          legend: {

            display: true

          }

        },

        scales: {

          y: {

            beginAtZero: true

          }

        }

      }

    });

  }

}
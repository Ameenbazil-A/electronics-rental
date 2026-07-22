export interface MonthlyRevenue {

  month: string;

  total: number;

}

export interface MonthlyBooking {

  month: string;

  count: number;

}



export interface RecentBooking {

  id: number;

  user: string;

  product: string;

  status: string;

  total_amount: number;

  booked_at: string;

}

export interface Dashboard {

  total_products: number;

  total_bookings: number;

  pending_bookings: number;

  approved_bookings: number;

  active_bookings: number;

  completed_bookings: number;

  cancelled_bookings: number;

  recent_bookings: RecentBooking[];

  total_revenue: number;

  monthly_bookings: MonthlyBooking[];

  monthly_revenue: MonthlyRevenue[];

}
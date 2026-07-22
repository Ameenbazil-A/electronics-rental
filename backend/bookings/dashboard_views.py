from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

from products.models import Product
from bookings.models import Booking
from django.db.models import Sum

from django.db.models import Count
from django.db.models.functions import TruncMonth

class DashboardStatsView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        recent_bookings = Booking.objects.select_related(
            "user",
            "product"
        ).order_by("-booked_at")[:5]

        total_revenue = (
            Booking.objects.filter(status="Completed")
            .aggregate(total=Sum("total_amount"))["total"] or 0
        )

        monthly_bookings = (
            Booking.objects
            .annotate(month=TruncMonth("booked_at"))
            .values("month")
            .annotate(count=Count("id"))
            .order_by("month")
        )

        monthly_revenue = (
            Booking.objects
            .filter(status="Completed")
            .annotate(month=TruncMonth("booked_at"))
            .values("month")
            .annotate(total=Sum("total_amount"))
            .order_by("month")
        )

        data = {

            "monthly_revenue": [
                {
                    "month": item["month"].strftime("%b"),
                    "total": float(item["total"])
                }
                for item in monthly_revenue
            ],

            "monthly_bookings": [
                {
                    "month": item["month"].strftime("%b"),
                    "count": item["count"]
                }
                for item in monthly_bookings
            ],

            "total_revenue": total_revenue,

            "total_products": Product.objects.count(),

            "total_bookings": Booking.objects.count(),

            "pending_bookings": Booking.objects.filter(
                status="Pending"
            ).count(),

            "approved_bookings": Booking.objects.filter(
                status="Approved"
            ).count(),

            "active_bookings": Booking.objects.filter(
                status="Active"
            ).count(),

            "completed_bookings": Booking.objects.filter(
                status="Completed"
            ).count(),

            "cancelled_bookings": Booking.objects.filter(
                status="Cancelled"
            ).count(),

            "recent_bookings": [

                {
                    "id": booking.id,
                    "user": booking.user.username,
                    "product": booking.product.name,
                    "status": booking.status,
                    "total_amount": booking.total_amount,
                    "booked_at": booking.booked_at,
                }

                for booking in recent_bookings

            ]

        }

        return Response(data)
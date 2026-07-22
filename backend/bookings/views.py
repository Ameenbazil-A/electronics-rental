from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Booking
from .serializers import BookingSerializer

from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status


class BookingViewSet(viewsets.ModelViewSet):

    serializer_class = BookingSerializer

    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user = self.request.user

        if user.is_staff:
            return Booking.objects.select_related(
                "user",
                "product"
            ).all()

        return Booking.objects.select_related(
            "user",
            "product"
        ).filter(user=user)

    def perform_create(self, serializer):

        serializer.save(user=self.request.user)


    @action(detail=True, methods=["post"])
    def cancel(self, request, pk=None):

        booking = self.get_object()

        if booking.status != "Pending":

            return Response(
                {
                    "error": "Only pending bookings can be cancelled."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        booking.status = "Cancelled"
        booking.save()

        return Response(
            {
                "message": "Booking cancelled successfully."
            }
        )    
    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def update_status(self, request, pk=None):

        booking = self.get_object()

        if not request.user.is_staff:
            return Response(
                {"error": "Permission denied."},
                status=status.HTTP_403_FORBIDDEN
            )

        new_status = request.data.get("status")

        allowed_statuses = [
            "Pending",
            "Approved",
            "Active",
            "Completed",
            "Cancelled"
        ]

        if new_status not in allowed_statuses:
            return Response(
                {"error": "Invalid status."},
                status=status.HTTP_400_BAD_REQUEST
            )

        booking.status = new_status
        booking.save()

        return Response(
            {"message": "Status updated successfully."}
        )
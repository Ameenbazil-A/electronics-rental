from django.db.models import Q
from rest_framework import serializers
from .models import Booking


class BookingSerializer(serializers.ModelSerializer):

    user_name = serializers.ReadOnlyField(source="user.username")

    product_name = serializers.ReadOnlyField(source="product.name")

    class Meta:
        model = Booking
        fields = "__all__"
        read_only_fields = (
            "user",
            "total_amount",
            "security_deposit",
            "status",
            "booked_at",
    )

    def validate(self, data):

        if data["end_date"] <= data["start_date"]:
            raise serializers.ValidationError(
                "End date must be after start date."
            )

        product = data["product"]

        if not product.available:

            raise serializers.ValidationError(
                "This product is currently unavailable."
            )

        start_date = data["start_date"]

        end_date = data["end_date"]

        overlapping_bookings = Booking.objects.filter(
            product=product,
            status__in=["Pending", "Approved", "Active"]
        ).filter(
            Q(start_date__lt=end_date) &
            Q(end_date__gt=start_date)
        ).count()

        if overlapping_bookings >= product.stock:
            raise serializers.ValidationError(
                "No units are available for the selected dates."
        )

        return data  
    




    def create(self, validated_data):

        product = validated_data["product"]

        start = validated_data["start_date"]

        end = validated_data["end_date"]

        total_days = (end - start).days

        validated_data["total_amount"] = (
            total_days * product.daily_rent
        )

        validated_data["security_deposit"] = (
         product.security_deposit
        )

        return super().create(validated_data)
        
    

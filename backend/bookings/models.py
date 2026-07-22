from django.db import models
from accounts.models import User
from products.models import Product


class Booking(models.Model):

    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Approved", "Approved"),
        ("Active", "Active"),
        ("Completed", "Completed"),
        ("Cancelled", "Cancelled"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="bookings"
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="bookings"
    )

    start_date = models.DateField()

    end_date = models.DateField()

    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    security_deposit = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    booked_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ["-booked_at"]

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"
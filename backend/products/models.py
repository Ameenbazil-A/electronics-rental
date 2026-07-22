from django.db import models
from categories.models import Category


class Product(models.Model):

    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="products"
    )

    name = models.CharField(max_length=200)

    brand = models.CharField(max_length=100)

    model_name = models.CharField(max_length=100)

    daily_rent = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    weekly_rent = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    monthly_rent = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    security_deposit = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    stock = models.PositiveIntegerField(default=1)

    available = models.BooleanField(default=True)

    description = models.TextField(blank=True)

    image = models.ImageField(
        upload_to="products/",
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name
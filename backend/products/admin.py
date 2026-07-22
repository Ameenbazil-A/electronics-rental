from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "category",
        "brand",
        "daily_rent",
        "stock",
        "available",
    )

    list_filter = (
        "category",
        "available",
    )

    search_fields = (
        "name",
        "brand",
        "model_name",
    )
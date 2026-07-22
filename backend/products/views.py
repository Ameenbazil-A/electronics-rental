from .permissions import IsAdminOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets


from .models import Product
from .serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related("category").all()

    serializer_class = ProductSerializer

    permission_classes = [
        IsAdminOrReadOnly,
    ]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = [
        "category",
        "available",
        "brand",
    ]

    search_fields = [
        "name",
        "brand",
        "model_name",
    ]

    ordering_fields = [
        "daily_rent",
        "weekly_rent",
        "monthly_rent",
        "created_at",
    ]

    ordering = [
        "-created_at",
    ]
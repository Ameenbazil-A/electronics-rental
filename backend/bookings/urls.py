from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import BookingViewSet
from .dashboard_views import DashboardStatsView

router = DefaultRouter()

router.register(
    "bookings",
    BookingViewSet,
    basename="booking"
)

urlpatterns = [
    path(
        "admin/dashboard/",
        DashboardStatsView.as_view(),
        name="dashboard-stats"
    ),
]

urlpatterns += router.urls
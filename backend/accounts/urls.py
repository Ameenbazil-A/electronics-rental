from django.urls import path

from rest_framework_simplejwt.views import TokenRefreshView

from .token_views import CustomTokenObtainPairView

from .views import RegisterView
from .profile_views import ProfileView

from .change_password_views import ChangePasswordView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),

    path(
            "login/",
            CustomTokenObtainPairView.as_view(),
            name="login"
    ),

    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("profile/", ProfileView.as_view(), name="profile"),

    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
]
from rest_framework import generics
from rest_framework.permissions import IsAdminUser

from .models import User
from .admin_user_serializer import AdminUserSerializer


class UserListView(generics.ListAPIView):

    queryset = User.objects.all().order_by("-date_joined")

    serializer_class = AdminUserSerializer

    permission_classes = [IsAdminUser]
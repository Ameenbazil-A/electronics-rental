from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import User
from .profile_serializer import ProfileSerializer


class ProfileView(generics.RetrieveUpdateAPIView):

    serializer_class = ProfileSerializer

    permission_classes = [IsAuthenticated]

    def get_object(self):

        return self.request.user
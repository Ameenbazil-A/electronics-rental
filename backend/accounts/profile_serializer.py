from rest_framework import serializers
from .models import User


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = [
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "phone",
            "address",
            "role",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "username",
            "role",
            "created_at",
        ]

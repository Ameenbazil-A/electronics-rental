from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .change_password_serializer import ChangePasswordSerializer


class ChangePasswordView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = ChangePasswordSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        user = request.user

        # Check current password
        if not user.check_password(
            serializer.validated_data["current_password"]
        ):

            return Response(
                {
                    "current_password": [
                        "Current password is incorrect."
                    ]
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        # Prevent using the same password again
        if user.check_password(
            serializer.validated_data["new_password"]
        ):

            return Response(
                {
                    "new_password": [
                        "New password must be different from the old password."
                    ]
                },
                status=status.HTTP_400_BAD_REQUEST
            )


        # Change password
        user.set_password(
            serializer.validated_data["new_password"]
        )

        user.save()

        return Response(
            {
                "message": "Password changed successfully."
            }
        )
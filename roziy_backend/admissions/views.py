from rest_framework import generics, permissions, status as http_status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Application, normalize_phone
from .serializers import (
    ApplicationCreateSerializer,
    ApplicationStatusLookupSerializer,
    ApplicationStatusSerializer,
)


class ApplicationCreateView(generics.CreateAPIView):
    """POST /api/admissions/apply/ - public admission application form.

    Returns the generated tracking_code so the frontend can show it to the
    parent right after submission (and they can look it up later on
    /admissions/status/).
    """

    queryset = Application.objects.all()
    serializer_class = ApplicationCreateSerializer
    permission_classes = [permissions.AllowAny]


class ApplicationStatusView(APIView):
    """POST /api/admissions/status/ - public 'check my application status' lookup.

    Requires both the tracking code AND the parent phone number used at
    submission time, so a tracking code alone (which could leak/be guessed)
    isn't enough to see another family's application.
    """

    permission_classes = [permissions.AllowAny]

    def post(self, request):
        lookup = ApplicationStatusLookupSerializer(data=request.data)
        lookup.is_valid(raise_exception=True)

        code = lookup.validated_data["tracking_code"].strip().upper()
        phone_digits = normalize_phone(lookup.validated_data["parent_phone"])

        application = None
        for candidate in Application.objects.filter(tracking_code=code):
            if normalize_phone(candidate.parent_phone) == phone_digits:
                application = candidate
                break

        if application is None:
            return Response(
                {"detail": "Ariza topilmadi. Ariza raqami va telefon raqamini tekshirib qayta urinib ko'ring."},
                status=http_status.HTTP_404_NOT_FOUND,
            )

        return Response(ApplicationStatusSerializer(application).data)

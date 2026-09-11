from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Teacher
from .serializers import TeacherSerializer


class TeacherViewSet(viewsets.ReadOnlyModelViewSet):
    """GET /api/staff/ - active teacher/staff profiles."""

    queryset = Teacher.objects.filter(is_active=True)
    serializer_class = TeacherSerializer
    permission_classes = [AllowAny]

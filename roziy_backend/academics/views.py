from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Grade, Subject
from .serializers import GradeSerializer, SubjectSerializer


class GradeViewSet(viewsets.ReadOnlyModelViewSet):
    """GET /api/academics/grades/ and /api/academics/grades/{id}/"""

    queryset = Grade.objects.all()
    serializer_class = GradeSerializer
    permission_classes = [AllowAny]


class SubjectViewSet(viewsets.ReadOnlyModelViewSet):
    """GET /api/academics/subjects/"""

    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    permission_classes = [AllowAny]

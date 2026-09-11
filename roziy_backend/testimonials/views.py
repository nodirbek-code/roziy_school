from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import Testimonial
from .serializers import TestimonialSerializer


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """GET /api/testimonials/ - published parent/founder interview testimonials."""

    queryset = Testimonial.objects.filter(is_published=True)
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]

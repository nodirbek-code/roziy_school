from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import GalleryCategory
from .serializers import GalleryCategorySerializer


class GalleryCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/gallery/ - all categories with their images nested
    (teachers / classrooms / exterior / general), for a filterable gallery page.
    """

    queryset = GalleryCategory.objects.prefetch_related("images").all()
    serializer_class = GalleryCategorySerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

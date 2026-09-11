from rest_framework import viewsets
from rest_framework.permissions import AllowAny

from .models import NewsPost
from .serializers import NewsPostSerializer


class NewsPostViewSet(viewsets.ReadOnlyModelViewSet):
    """GET /api/news/ (paginated list) and /api/news/{slug}/"""

    queryset = NewsPost.objects.filter(is_published=True)
    serializer_class = NewsPostSerializer
    permission_classes = [AllowAny]
    lookup_field = "slug"

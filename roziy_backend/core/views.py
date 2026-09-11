from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Page, SiteSettings
from .serializers import PageSerializer, SiteSettingsSerializer


class SiteSettingsView(APIView):
    """GET /api/core/settings/ - global school info (singleton, read-only for public)."""

    permission_classes = [AllowAny]

    def get(self, request):
        obj, _ = SiteSettings.objects.get_or_create(pk=1)
        return Response(SiteSettingsSerializer(obj).data)


class PageViewSet(viewsets.ReadOnlyModelViewSet):
    """GET /api/core/pages/ and /api/core/pages/{slug}/"""

    queryset = Page.objects.filter(is_published=True)
    serializer_class = PageSerializer
    lookup_field = "slug"
    permission_classes = [AllowAny]

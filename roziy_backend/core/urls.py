from rest_framework.routers import DefaultRouter
from django.urls import path, include

from .views import PageViewSet, SiteSettingsView

router = DefaultRouter()
router.register("pages", PageViewSet, basename="page")

urlpatterns = [
    path("settings/", SiteSettingsView.as_view(), name="site-settings"),
    path("", include(router.urls)),
]

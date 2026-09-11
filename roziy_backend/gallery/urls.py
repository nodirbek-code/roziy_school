from rest_framework.routers import DefaultRouter

from .views import GalleryCategoryViewSet

router = DefaultRouter()
router.register("", GalleryCategoryViewSet, basename="gallery-category")

urlpatterns = router.urls

from rest_framework.routers import DefaultRouter

from .views import GradeViewSet, SubjectViewSet

router = DefaultRouter()
router.register("grades", GradeViewSet, basename="grade")
router.register("subjects", SubjectViewSet, basename="subject")

urlpatterns = router.urls

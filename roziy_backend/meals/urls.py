from django.urls import path

from .views import WeeklyMenuView

urlpatterns = [
    path("", WeeklyMenuView.as_view(), name="weekly-menu"),
]

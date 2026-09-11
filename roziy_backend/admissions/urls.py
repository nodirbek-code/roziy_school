from django.urls import path

from .views import ApplicationCreateView, ApplicationStatusView

urlpatterns = [
    path("apply/", ApplicationCreateView.as_view(), name="application-apply"),
    path("status/", ApplicationStatusView.as_view(), name="application-status"),
]

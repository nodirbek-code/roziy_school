from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),

    # auth (JWT)
    path("api/auth/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/accounts/", include("accounts.urls")),

    # site content
    path("api/core/", include("core.urls")),
    path("api/academics/", include("academics.urls")),
    path("api/admissions/", include("admissions.urls")),
    path("api/meals/", include("meals.urls")),
    path("api/gallery/", include("gallery.urls")),
    path("api/staff/", include("staff.urls")),
    path("api/testimonials/", include("testimonials.urls")),
    path("api/news/", include("news.urls")),
    path("api/contacts/", include("contacts.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

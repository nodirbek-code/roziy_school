from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import MealAddon, MealDay
from .serializers import MealAddonSerializer, MealDaySerializer


class WeeklyMenuView(APIView):
    """
    GET /api/meals/
    Returns the full fixed 5-day weekly menu plus lunch/snack addon notes,
    in one response so the frontend can cache it indefinitely (it never changes
    week to week - only edited by an admin when the menu itself is updated).
    """

    permission_classes = [AllowAny]

    def get(self, request):
        days = MealDay.objects.prefetch_related("items").all()
        addons = MealAddon.objects.all()
        return Response(
            {
                "days": MealDaySerializer(days, many=True).data,
                "addons": MealAddonSerializer(addons, many=True).data,
            }
        )

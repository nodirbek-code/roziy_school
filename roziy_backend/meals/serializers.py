from rest_framework import serializers

from .models import MealAddon, MealDay, MealItem


class MealItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealItem
        fields = ["id", "category", "order", "name", "image"]


class MealAddonSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealAddon
        fields = ["id", "category", "text", "order"]


class MealDaySerializer(serializers.ModelSerializer):
    lunch_items = serializers.SerializerMethodField()
    snack_items = serializers.SerializerMethodField()

    class Meta:
        model = MealDay
        fields = ["id", "day_number", "day_label", "lunch_items", "snack_items"]

    def get_lunch_items(self, obj):
        items = obj.items.filter(category=MealItem.Category.LUNCH)
        return MealItemSerializer(items, many=True).data

    def get_snack_items(self, obj):
        items = obj.items.filter(category=MealItem.Category.SNACK)
        return MealItemSerializer(items, many=True).data

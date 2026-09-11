from django.contrib import admin

from .models import MealAddon, MealDay, MealItem


class MealItemInline(admin.TabularInline):
    model = MealItem
    extra = 1


@admin.register(MealDay)
class MealDayAdmin(admin.ModelAdmin):
    list_display = ("day_number", "day_label")
    inlines = [MealItemInline]


@admin.register(MealAddon)
class MealAddonAdmin(admin.ModelAdmin):
    list_display = ("category", "text", "order")
    list_filter = ("category",)

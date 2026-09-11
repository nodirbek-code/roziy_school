from django.contrib import admin

from .models import Grade, RoadmapItem, Subject


class RoadmapItemInline(admin.TabularInline):
    model = RoadmapItem
    extra = 1
    fields = ("order", "title", "description")


@admin.register(Grade)
class GradeAdmin(admin.ModelAdmin):
    list_display = ("number", "title")
    inlines = [RoadmapItemInline]


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ("name", "weekly_hours")
    filter_horizontal = ("grades",)


@admin.register(RoadmapItem)
class RoadmapItemAdmin(admin.ModelAdmin):
    list_display = ("grade", "order", "title")
    list_filter = ("grade",)
    list_editable = ("order",)

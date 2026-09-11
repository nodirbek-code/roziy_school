from django.contrib import admin

from .models import Application


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("tracking_code", "child_full_name", "grade", "parent_phone", "status", "created_at")
    list_filter = ("status", "grade")
    list_editable = ("status",)
    search_fields = ("tracking_code", "child_full_name", "parent_phone")
    readonly_fields = ("tracking_code", "created_at", "updated_at")
    fields = (
        "tracking_code", "child_full_name", "child_birth_date", "grade",
        "parent_full_name", "parent_phone", "note",
        "status", "status_note", "created_at", "updated_at",
    )

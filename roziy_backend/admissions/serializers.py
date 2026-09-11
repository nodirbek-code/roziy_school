from rest_framework import serializers

from .models import Application


class ApplicationCreateSerializer(serializers.ModelSerializer):
    """Used for the public application form - status is not settable by applicants."""

    class Meta:
        model = Application
        fields = [
            "id", "tracking_code", "child_full_name", "child_birth_date", "grade",
            "parent_full_name", "parent_phone", "note", "created_at",
        ]
        read_only_fields = ["id", "tracking_code", "created_at"]


class ApplicationStatusLookupSerializer(serializers.Serializer):
    """Input for the public 'check my application status' form."""

    tracking_code = serializers.CharField(max_length=20)
    parent_phone = serializers.CharField(max_length=50)


class ApplicationStatusSerializer(serializers.ModelSerializer):
    """Public-safe output - no internal note field, just what the parent should see."""

    status_display = serializers.CharField(source="get_status_display", read_only=True)
    grade = serializers.SerializerMethodField()

    class Meta:
        model = Application
        fields = [
            "tracking_code", "child_full_name", "grade",
            "status", "status_display", "status_note",
            "created_at", "updated_at",
        ]

    def get_grade(self, obj):
        if not obj.grade:
            return None
        return obj.grade.title or f"{obj.grade.number}-sinf"

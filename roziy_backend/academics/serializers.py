from rest_framework import serializers

from .models import Grade, RoadmapItem, Subject


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ["id", "name", "weekly_hours"]


class RoadmapItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadmapItem
        fields = ["id", "title", "description", "order"]


class GradeSerializer(serializers.ModelSerializer):
    subjects = SubjectSerializer(many=True, read_only=True)
    roadmap_items = RoadmapItemSerializer(many=True, read_only=True)

    class Meta:
        model = Grade
        fields = ["id", "number", "title", "description", "subjects", "roadmap_items"]

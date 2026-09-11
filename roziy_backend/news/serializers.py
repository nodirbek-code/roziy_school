from rest_framework import serializers

from .models import NewsPost


class NewsPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsPost
        fields = ["id", "title", "slug", "cover_image", "body", "published_at"]

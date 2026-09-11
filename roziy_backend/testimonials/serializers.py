from rest_framework import serializers

from .models import Testimonial


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            "id", "author_name", "role", "text_quote",
            "video_url", "video_file", "photo",
        ]

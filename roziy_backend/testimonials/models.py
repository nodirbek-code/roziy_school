from django.db import models


class Testimonial(models.Model):
    """
    A parent (or graduate) testimonial. Supports either a short text quote,
    or a video (embedded via URL - e.g. Instagram/YouTube link - or an
    uploaded file), such as the founder's parent-interview videos.
    """

    author_name = models.CharField(max_length=150)
    role = models.CharField(max_length=100, default="Ota-ona")
    text_quote = models.TextField(blank=True)
    video_url = models.URLField(blank=True, help_text="Instagram/YouTube link, if embedding externally")
    video_file = models.FileField(upload_to="testimonials/", blank=True, null=True)
    photo = models.ImageField(upload_to="testimonials/photos/", blank=True, null=True)
    order = models.PositiveSmallIntegerField(default=1)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "-id"]

    def __str__(self):
        return f"{self.author_name} ({self.role})"

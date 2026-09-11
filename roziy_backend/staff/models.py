from django.db import models


class Teacher(models.Model):
    """A teacher/staff member profile shown on the 'O'qituvchilar' page."""

    full_name = models.CharField(max_length=255)
    subject = models.CharField(max_length=150, blank=True)
    photo = models.ImageField(upload_to="staff/", blank=True, null=True)
    bio = models.TextField(blank=True)
    order = models.PositiveSmallIntegerField(default=1)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["order", "full_name"]

    def __str__(self):
        return self.full_name

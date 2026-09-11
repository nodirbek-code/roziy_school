from django.db import models


class ContactMessage(models.Model):
    """A message submitted through the public 'Aloqa' (Contact us) form."""

    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=50)
    message = models.TextField()
    is_handled = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.full_name} - {self.created_at:%Y-%m-%d}"

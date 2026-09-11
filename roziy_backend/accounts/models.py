from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom user model with a role field so the same login endpoint serves
    parents, teachers/staff, and admins with different frontend permissions.
    """

    class Role(models.TextChoices):
        ADMIN = "admin", "Administrator"
        STAFF = "staff", "Xodim / o'qituvchi"
        PARENT = "parent", "Ota-ona"

    role = models.CharField(max_length=20, choices=Role.choices, default=Role.PARENT)
    phone = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.username

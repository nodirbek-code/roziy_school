import random
import string

from django.db import models

from academics.models import Grade


def generate_tracking_code():
    """RZ-XXXXXX, e.g. RZ-482913. Short enough to read over the phone."""
    digits = "".join(random.choices(string.digits, k=6))
    return f"RZ-{digits}"


def normalize_phone(raw: str) -> str:
    """Keep digits only, so '+998 97 751-00-65' and '998977510065' match."""
    return "".join(ch for ch in (raw or "") if ch.isdigit())


class Application(models.Model):
    """An admission application submitted by a prospective parent."""

    class Status(models.TextChoices):
        NEW = "new", "Yangi"
        REVIEWING = "reviewing", "Ko'rib chiqilmoqda"
        ACCEPTED = "accepted", "Qabul qilindi"
        REJECTED = "rejected", "Rad etildi"

    tracking_code = models.CharField(
        max_length=20,
        unique=True,
        editable=False,
        blank=True,
        help_text="Avtomatik yaratiladi. Ota-ona shu kod orqali ariza holatini tekshiradi.",
    )

    child_full_name = models.CharField(max_length=255)
    child_birth_date = models.DateField(null=True, blank=True)
    grade = models.ForeignKey(Grade, on_delete=models.SET_NULL, null=True, blank=True)

    parent_full_name = models.CharField(max_length=255)
    parent_phone = models.CharField(max_length=50)

    note = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    status_note = models.TextField(
        blank=True,
        help_text="Ota-onaga ko'rinadigan qisqa izoh, masalan: 'Hujjatlaringiz tekshirilmoqda, 2 kun ichida qo'ng'iroq qilamiz.'",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.child_full_name} ({self.get_status_display()})"

    def save(self, *args, **kwargs):
        if not self.tracking_code:
            code = generate_tracking_code()
            while Application.objects.filter(tracking_code=code).exists():
                code = generate_tracking_code()
            self.tracking_code = code
        super().save(*args, **kwargs)

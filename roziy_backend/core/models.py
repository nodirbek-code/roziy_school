from django.core.exceptions import ValidationError
from django.db import models


class SiteSettings(models.Model):
    """
    Singleton model holding global school info shown across the site:
    name, tagline, contact details, tuition, license image, etc.
    Only one row is allowed - enforced in save().
    """

    school_name = models.CharField(max_length=255, default="Roziy Xalqaro Xususiy Maktabi")
    tagline = models.CharField(
        max_length=500,
        default="Bilim va tarbiya - bizning yo'limiz, rozi ota-ona va baxtli o'quvchi - NATIJAMIZ!",
    )
    since_year = models.PositiveSmallIntegerField(default=2026)

    phone = models.CharField(max_length=50, default="+998 97 751 00 65")
    instagram_url = models.URLField(blank=True, default="https://www.instagram.com/roziy_maktabi/")

    region = models.CharField(max_length=255, default="Xorazm viloyati")
    district = models.CharField(max_length=255, default="Shovot tumani")
    address_note = models.CharField(
        max_length=500,
        default="Today ta'lim markazi yonida (Shovot pochta ro'parasi)",
    )

    grades_offered = models.CharField(max_length=100, default="1-9-sinflar")
    monthly_tuition = models.DecimalField(max_digits=12, decimal_places=2, default=1990000)

    # License / accreditation
    license_number = models.CharField(max_length=100, blank=True, default="1839743")
    license_holder_name = models.CharField(
        max_length=255, blank=True, default="RAZIY XALQARO MAKTABI MChJ"
    )
    license_activity_type = models.CharField(
        max_length=255, blank=True, default="Umumiy o'rta ta'lim xizmatlari"
    )
    license_image_front = models.ImageField(upload_to="license/", blank=True, null=True)
    license_image_back = models.ImageField(upload_to="license/", blank=True, null=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Sayt sozlamalari"
        verbose_name_plural = "Sayt sozlamalari"

    def clean(self):
        if not self.pk and SiteSettings.objects.exists():
            raise ValidationError("SiteSettings faqat bitta bo'lishi mumkin (singleton).")

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def __str__(self):
        return self.school_name


class Page(models.Model):
    """Simple static/CMS-like page, e.g. 'Haqida', 'Missiya'."""

    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=255)
    body = models.TextField()
    is_published = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["title"]

    def __str__(self):
        return self.title

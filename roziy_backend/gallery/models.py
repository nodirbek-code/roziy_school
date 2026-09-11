from django.db import models


class GalleryCategory(models.Model):
    """e.g. 'teachers', 'classrooms', 'exterior', 'general'."""

    slug = models.SlugField(unique=True)
    name = models.CharField(max_length=150)  # "O'qituvchilar", "Xonalar", "Tashqi ko'rinish"
    order = models.PositiveSmallIntegerField(default=1)

    class Meta:
        ordering = ["order"]
        verbose_name_plural = "Gallery categories"

    def __str__(self):
        return self.name


class GalleryImage(models.Model):
    category = models.ForeignKey(GalleryCategory, related_name="images", on_delete=models.CASCADE)
    image = models.ImageField(upload_to="gallery/")
    caption = models.CharField(max_length=255, blank=True)
    order = models.PositiveSmallIntegerField(default=1)

    class Meta:
        ordering = ["category__order", "order"]

    def __str__(self):
        return self.caption or f"{self.category} #{self.pk}"

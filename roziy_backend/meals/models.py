from django.db import models


class MealDay(models.Model):
    """One day of the fixed weekly menu (1-kun .. 5-kun). Repeats every week."""

    day_number = models.PositiveSmallIntegerField(unique=True)  # 1..5
    day_label = models.CharField(max_length=30, blank=True)  # "1-KUN" (auto if blank)

    class Meta:
        ordering = ["day_number"]

    def __str__(self):
        return self.day_label or f"{self.day_number}-kun"

    def save(self, *args, **kwargs):
        if not self.day_label:
            self.day_label = f"{self.day_number}-KUN"
        super().save(*args, **kwargs)


class MealItem(models.Model):
    """A single dish shown for a given day, under 'tushlik' or 'choy vaqti'."""

    class Category(models.TextChoices):
        LUNCH = "lunch", "Tushlik"
        SNACK = "snack", "Choy vaqti"

    day = models.ForeignKey(MealDay, related_name="items", on_delete=models.CASCADE)
    category = models.CharField(max_length=10, choices=Category.choices)
    order = models.PositiveSmallIntegerField(default=1)  # "1.", "2." order within lunch
    name = models.CharField(max_length=255)  # e.g. "Tefteli sho'rva (go'shtli)"
    image = models.ImageField(upload_to="meals/", blank=True, null=True)

    class Meta:
        ordering = ["day__day_number", "category", "order"]

    def __str__(self):
        return f"{self.day} - {self.get_category_display()} - {self.name}"


class MealAddon(models.Model):
    """Extra items offered on top of lunch/snack every day, e.g. 'Non', 'Qatiq'."""

    class Category(models.TextChoices):
        LUNCH = "lunch", "Tushlik uchun qo'shimcha"
        SNACK = "snack", "Choy vaqti uchun qo'shimcha"

    category = models.CharField(max_length=10, choices=Category.choices)
    text = models.CharField(max_length=255)  # "Meva (olma - 1/4 dona, banan - 1/2 dona)"
    order = models.PositiveSmallIntegerField(default=1)

    class Meta:
        ordering = ["category", "order"]

    def __str__(self):
        return self.text

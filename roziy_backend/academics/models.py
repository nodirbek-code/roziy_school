from django.db import models


class Grade(models.Model):
    """A grade/class level, e.g. '1-sinf' ... '9-sinf'."""

    number = models.PositiveSmallIntegerField(unique=True)  # 1..9
    title = models.CharField(max_length=50, blank=True)  # optional override, e.g. "1-sinf (A)"
    description = models.TextField(blank=True)

    class Meta:
        ordering = ["number"]

    def __str__(self):
        return self.title or f"{self.number}-sinf"


class Subject(models.Model):
    """A subject taught at the school, optionally linked to specific grades."""

    name = models.CharField(max_length=150)
    grades = models.ManyToManyField(Grade, related_name="subjects", blank=True)
    weekly_hours = models.PositiveSmallIntegerField(null=True, blank=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class RoadmapItem(models.Model):
    """
    One milestone/skill in a grade's development roadmap, written in plain
    language for parents (not curriculum jargon) - e.g. "Ravon o'qish va
    qayta hikoya qilish" for 1-sinf. Shown as a simple visual roadmap on the
    academics page, so parents can see what their child will be able to do
    by the end of the year.
    """

    grade = models.ForeignKey(Grade, related_name="roadmap_items", on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    order = models.PositiveSmallIntegerField(default=1)

    class Meta:
        ordering = ["grade__number", "order"]

    def __str__(self):
        return f"{self.grade} - {self.title}"

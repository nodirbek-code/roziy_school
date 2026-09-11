from django.core.management.base import BaseCommand

from academics.models import Grade


class Command(BaseCommand):
    help = "Seeds grades 1-9 (the school currently offers 1-9-sinflar)."

    def handle(self, *args, **options):
        for number in range(1, 10):
            Grade.objects.get_or_create(number=number)
        self.stdout.write(self.style.SUCCESS("Grades 1-9 seeded successfully."))

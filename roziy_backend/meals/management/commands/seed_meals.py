from django.core.management.base import BaseCommand

from meals.models import MealAddon, MealDay, MealItem

# Real weekly menu data from the school's "Taomnoma" poster.
MENU = {
    1: {
        "lunch": ["Tefteli sho'rva (go'shtli)", "Bifshteks (pyure, guruch, grechka)"],
        "snack": "Lavash",
    },
    2: {
        "lunch": ["Spagetti sho'rva", "Palov"],
        "snack": "Pishloqli, tovuqli so'msa",
    },
    3: {
        "lunch": ["Barak sho'rva (mol go'shtli)", "Tovuqli katlet + fri"],
        "snack": "Pitsa",
    },
    4: {
        "lunch": ["Tovuqli vermishel sho'rva", "Go'shtli katlet + fri"],
        "snack": "Xot-dog",
    },
    5: {
        "lunch": ["Unoshi sho'rva (qoqarikli)", "KFC + fri"],
        "snack": "Pishloqli, jemli va murabboli bulochka",
    },
}

LUNCH_ADDONS = ["Non", "Uy komposti", "Bodiring", "Qatiq"]
SNACK_ADDONS = [
    "Meva (olma - 1/4 dona, banan - 1/2 dona) + sok",
    "Yogurt (qulupnayli, bananli yoki miks) + sok",
]


class Command(BaseCommand):
    help = "Seeds the fixed weekly meal menu (taomnoma) with the school's real data."

    def handle(self, *args, **options):
        for day_number, data in MENU.items():
            day, _ = MealDay.objects.get_or_create(day_number=day_number)
            day.items.all().delete()
            for order, name in enumerate(data["lunch"], start=1):
                MealItem.objects.create(
                    day=day, category=MealItem.Category.LUNCH, order=order, name=name
                )
            MealItem.objects.create(
                day=day, category=MealItem.Category.SNACK, order=1, name=data["snack"]
            )

        MealAddon.objects.all().delete()
        for order, text in enumerate(LUNCH_ADDONS, start=1):
            MealAddon.objects.create(category=MealAddon.Category.LUNCH, text=text, order=order)
        for order, text in enumerate(SNACK_ADDONS, start=1):
            MealAddon.objects.create(category=MealAddon.Category.SNACK, text=text, order=order)

        self.stdout.write(self.style.SUCCESS("Taomnoma (weekly menu) seeded successfully."))

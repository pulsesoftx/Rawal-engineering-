from django.core.management.base import BaseCommand
from django.utils.text import slugify

from portal.models import Job


JOBS = [
    ("Intern", "Early Careers", "Kathmandu, Nepal", "0-1 year"),
    ("Frontend Developer", "Technology", "Kathmandu / Hybrid", "0-2 years"),
    ("Backend Developer", "Technology", "Kathmandu / Hybrid", "2-4 years"),
    ("Civil Engineer", "Engineering", "Kathmandu, Nepal", "2-5 years"),
    ("Site Engineer", "Delivery", "Project sites across Nepal", "1-3 years"),
    ("Project Manager", "Delivery", "Kathmandu, Nepal", "5+ years"),
]


class Command(BaseCommand):
    help = "Seed the initial RAWAL Engineering job listings."

    def handle(self, *args, **options):
        for title, department, location, experience in JOBS:
            Job.objects.update_or_create(
                slug=slugify(title),
                defaults={
                    "title": title,
                    "department": department,
                    "location": location,
                    "employment_type": "Full-time",
                    "experience": experience,
                    "description": f"Join RAWAL as a {title} and help build work that matters.",
                    "requirements": ["Clear communication", "Ownership mindset"],
                    "responsibilities": ["Contribute to project delivery"],
                    "benefits": ["Health cover", "Learning budget"],
                },
            )
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(JOBS)} job listings."))

import uuid

from django.db import models


class Job(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    department = models.CharField(max_length=120)
    location = models.CharField(max_length=200)
    employment_type = models.CharField(max_length=120)
    experience = models.CharField(max_length=120)
    salary = models.CharField(max_length=120, blank=True, null=True)
    description = models.TextField()
    requirements = models.JSONField(default=list)
    responsibilities = models.JSONField(default=list)
    benefits = models.JSONField(default=list)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]


class Application(models.Model):
    class Status(models.TextChoices):
        PENDING = "Pending"
        REVIEWING = "Reviewing"
        SHORTLISTED = "Shortlisted"
        INTERVIEW = "Interview"
        SELECTED = "Selected"
        REJECTED = "Rejected"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name="applications")
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    address = models.CharField(max_length=255, blank=True, null=True)
    date_of_birth = models.DateTimeField(blank=True, null=True)
    gender = models.CharField(max_length=50, blank=True, null=True)
    qualification = models.CharField(max_length=200)
    university = models.CharField(max_length=200, blank=True, null=True)
    graduation_year = models.PositiveIntegerField(blank=True, null=True)
    experience = models.TextField(blank=True, null=True)
    current_company = models.CharField(max_length=200, blank=True, null=True)
    expected_salary = models.CharField(max_length=120, blank=True, null=True)
    linkedin = models.URLField(blank=True, null=True)
    github = models.URLField(blank=True, null=True)
    portfolio = models.URLField(blank=True, null=True)
    cover_letter = models.TextField()
    skills = models.TextField(blank=True, null=True)
    resume_url = models.CharField(max_length=500)
    additional_documents = models.JSONField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

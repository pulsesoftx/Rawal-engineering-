import json
import os
import uuid
from pathlib import Path

import bcrypt
import jwt
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .auth import require_admin
from .models import Application, Job
from .serializers import application_json, job_json, validate_application, validate_job

ALLOWED_RESUME_TYPES = {
    "application/pdf": ".pdf",
    "application/msword": ".doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
}


def body(request):
    try:
        return json.loads(request.body or "{}")
    except json.JSONDecodeError:
        raise ValidationError({"body": "Request body must be valid JSON."})


def validation_error(error):
    return JsonResponse({"error": error.message_dict if hasattr(error, "message_dict") else str(error)}, status=400)


def health(request):
    return JsonResponse({"status": "ok"})


@csrf_exempt
def login(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        data = body(request)
        email = data.get("email", "")
        password = data.get("password", "")
        expected_email = os.getenv("ADMIN_EMAIL", "admin@rawal.engineering")
        expected_password = os.getenv("ADMIN_PASSWORD", "change-this-password")
        valid = email == expected_email and bcrypt.checkpw(password.encode(), bcrypt.hashpw(expected_password.encode(), bcrypt.gensalt()))
        if not valid:
            return JsonResponse({"error": "Invalid credentials"}, status=401)
        token = jwt.encode({"email": email}, os.getenv("JWT_SECRET", "development-secret-key-change-me-32"), algorithm="HS256")
        return JsonResponse({"token": token})
    except ValidationError as error:
        return validation_error(error)


@csrf_exempt
def jobs(request):
    if request.method == "GET":
        return JsonResponse([job_json(job) for job in Job.objects.filter(is_active=True)], safe=False)
    if request.method == "POST":
        return create_job(request)
    return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
@require_admin
def create_job(request):
    try:
        job = Job.objects.create(**validate_job(body(request)))
        return JsonResponse(job_json(job), status=201)
    except ValidationError as error:
        return validation_error(error)


@csrf_exempt
def job_detail(request, job_id):
    try:
        job = Job.objects.get(id=job_id)
    except Job.DoesNotExist:
        return JsonResponse({"error": "Job not found"}, status=404)
    if request.method == "GET":
        return JsonResponse(job_json(job))
    if request.method == "PUT":
        return update_job(request, job)
    if request.method == "DELETE":
        return delete_job(request, job)
    return JsonResponse({"error": "Method not allowed"}, status=405)


@require_admin
def update_job(request, job):
    try:
        for field, value in validate_job(body(request), partial=True).items():
            setattr(job, field, value)
        job.save()
        return JsonResponse(job_json(job))
    except ValidationError as error:
        return validation_error(error)


@require_admin
def delete_job(request, job):
    job.delete()
    return JsonResponse({}, status=204)


@csrf_exempt
def upload_resume(request):
    if request.method != "POST":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    resume = request.FILES.get("resume")
    if not resume or resume.content_type not in ALLOWED_RESUME_TYPES or resume.size > 5 * 1024 * 1024:
        return JsonResponse({"error": "A valid resume is required"}, status=400)
    filename = f"{uuid.uuid4()}{ALLOWED_RESUME_TYPES[resume.content_type]}"
    settings.MEDIA_ROOT.mkdir(parents=True, exist_ok=True)
    destination = Path(settings.MEDIA_ROOT) / filename
    with destination.open("wb+") as target:
        for chunk in resume.chunks():
            target.write(chunk)
    return JsonResponse({"url": f"{settings.MEDIA_URL}{filename}", "filename": filename}, status=201)


@csrf_exempt
def applications(request):
    if request.method == "POST":
        return create_application(request)
    if request.method == "GET":
        return list_applications(request)
    return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
def create_application(request):
    try:
        data = body(request)
        try:
            job = Job.objects.filter(id=data.get("jobId")).first()
        except (ValidationError, ValueError):
            job = None
        if not job and data.get("position"):
            job = Job.objects.filter(slug=data["position"].lower().replace(" ", "-")).first()
        if not job:
            return JsonResponse({"error": "Selected job not found"}, status=400)
        values = validate_application(data)
        application = Application.objects.create(job=job, **values)
        if settings.EMAIL_HOST:
            send_mail(f"Application received: {job.title}", f"Thank you for applying for the {job.title} position. We have successfully received your application.", settings.DEFAULT_FROM_EMAIL, [application.email])
            if os.getenv("HR_EMAIL"):
                send_mail(f"New application: {job.title}", f"{application.full_name} has applied for {job.title}.", settings.DEFAULT_FROM_EMAIL, [os.environ["HR_EMAIL"]])
        return JsonResponse({"id": str(application.id), "message": "Application received"}, status=201)
    except (ValidationError, ValueError) as error:
        return validation_error(error)


@require_admin
def list_applications(request):
    return JsonResponse([application_json(application) for application in Application.objects.select_related("job")], safe=False)


@require_admin
def application_detail(request, application_id):
    try:
        application = Application.objects.select_related("job").get(id=application_id)
    except Application.DoesNotExist:
        return JsonResponse({"error": "Application not found"}, status=404)
    if request.method == "GET":
        return JsonResponse(application_json(application))
    if request.method == "DELETE":
        application.delete()
        return JsonResponse({}, status=204)
    return JsonResponse({"error": "Method not allowed"}, status=405)


@csrf_exempt
@require_admin
def application_status(request, application_id):
    if request.method != "PUT":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        application = Application.objects.get(id=application_id)
        status = body(request).get("status")
        valid_statuses = {choice for choice, _ in Application.Status.choices}
        if status not in valid_statuses:
            return JsonResponse({"error": "Invalid application status"}, status=400)
        application.status = status
        application.save(update_fields=["status", "updated_at"])
        return JsonResponse(application_json(application))
    except Application.DoesNotExist:
        return JsonResponse({"error": "Application not found"}, status=404)
    except ValidationError as error:
        return validation_error(error)

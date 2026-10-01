from datetime import date, datetime

from django.core.exceptions import ValidationError
from django.core.validators import URLValidator, validate_email

from .models import Application, Job

JOB_FIELDS = {
    "title": "title", "slug": "slug", "department": "department", "location": "location",
    "employmentType": "employment_type", "experience": "experience", "salary": "salary",
    "description": "description", "requirements": "requirements", "responsibilities": "responsibilities",
    "benefits": "benefits", "isActive": "is_active",
}
APPLICATION_FIELDS = {
    "fullName": "full_name", "email": "email", "phone": "phone", "address": "address",
    "gender": "gender", "qualification": "qualification", "university": "university",
    "experience": "experience", "currentCompany": "current_company", "expectedSalary": "expected_salary",
    "linkedin": "linkedin", "github": "github", "portfolio": "portfolio", "coverLetter": "cover_letter",
    "skills": "skills", "resumeUrl": "resume_url", "additionalDocuments": "additional_documents",
}


def job_json(job):
    return {
        "id": str(job.id), "title": job.title, "slug": job.slug, "department": job.department,
        "location": job.location, "employmentType": job.employment_type, "experience": job.experience,
        "salary": job.salary, "description": job.description, "requirements": job.requirements,
        "responsibilities": job.responsibilities, "benefits": job.benefits, "isActive": job.is_active,
        "createdAt": job.created_at.isoformat(), "updatedAt": job.updated_at.isoformat(),
    }


def application_json(application):
    data = {
        "id": str(application.id), "jobId": str(application.job_id), "fullName": application.full_name,
        "email": application.email, "phone": application.phone, "address": application.address,
        "dateOfBirth": application.date_of_birth.isoformat() if application.date_of_birth else None,
        "gender": application.gender, "qualification": application.qualification, "university": application.university,
        "graduationYear": application.graduation_year, "experience": application.experience,
        "currentCompany": application.current_company, "expectedSalary": application.expected_salary,
        "linkedin": application.linkedin, "github": application.github, "portfolio": application.portfolio,
        "coverLetter": application.cover_letter, "skills": application.skills, "resumeUrl": application.resume_url,
        "additionalDocuments": application.additional_documents, "status": application.status,
        "createdAt": application.created_at.isoformat(), "updatedAt": application.updated_at.isoformat(),
        "job": job_json(application.job),
    }
    return data


def validate_job(data, partial=False):
    required = ["title", "slug", "department", "location", "employmentType", "experience", "description", "requirements", "responsibilities", "benefits"]
    errors = {}
    for field in required:
        if not partial and (field not in data or data[field] in (None, "", [])):
            errors[field] = "This field is required."
    for field in ["requirements", "responsibilities", "benefits"]:
        if field in data and not isinstance(data[field], list):
            errors[field] = "Expected a list of strings."
    if errors:
        raise ValidationError(errors)
    return {JOB_FIELDS[key]: value for key, value in data.items() if key in JOB_FIELDS}


def validate_application(data):
    required = ["jobId", "fullName", "email", "phone", "qualification", "coverLetter", "resumeUrl"]
    errors = {field: "This field is required." for field in required if not data.get(field)}
    if data.get("email"):
        try:
            validate_email(data["email"])
        except ValidationError:
            errors["email"] = "Enter a valid email address."
    if data.get("phone") and not (data["phone"].replace("+977", "").replace("-", "").replace(" ", "").isdigit() and len(data["phone"].replace("+977", "").replace("-", "").replace(" ", "")) == 10):
        errors["phone"] = "Use a valid Nepal phone number."
    if data.get("coverLetter") and len(data["coverLetter"]) < 20:
        errors["coverLetter"] = "Cover letter must be at least 20 characters."
    for field in ["linkedin", "github", "portfolio"]:
        if data.get(field):
            try:
                URLValidator()(data[field])
            except ValidationError:
                errors[field] = "Enter a valid URL."
    if errors:
        raise ValidationError(errors)
    values = {APPLICATION_FIELDS[key]: value for key, value in data.items() if key in APPLICATION_FIELDS}
    if data.get("dateOfBirth"):
        values["date_of_birth"] = datetime.fromisoformat(data["dateOfBirth"]).date() if "T" in data["dateOfBirth"] else date.fromisoformat(data["dateOfBirth"])
    if data.get("graduationYear"):
        values["graduation_year"] = int(data["graduationYear"])
    return values

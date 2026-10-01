from django.urls import path

from . import views

urlpatterns = [
    path("health", views.health),
    path("api/auth/login", views.login),
    path("api/jobs", views.jobs),
    path("api/jobs/<uuid:job_id>", views.job_detail),
    path("api/upload/resume", views.upload_resume),
    path("api/applications", views.applications),
    path("api/applications/<uuid:application_id>", views.application_detail),
    path("api/applications/<uuid:application_id>/status", views.application_status),
]

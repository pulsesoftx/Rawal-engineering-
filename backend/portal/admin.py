from django.contrib import admin

from .models import Application, Job


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ("title", "department", "location", "is_active", "created_at")
    prepopulated_fields = {"slug": ("title",)}
    list_filter = ("is_active", "department")


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "job", "status", "created_at")
    list_filter = ("status", "job")
    search_fields = ("full_name", "email", "phone")

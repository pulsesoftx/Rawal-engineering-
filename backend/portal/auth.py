import os
from functools import wraps

import jwt
from django.http import JsonResponse


def require_admin(view):
    @wraps(view)
    def wrapped(request, *args, **kwargs):
        header = request.headers.get("Authorization", "")
        if not header.startswith("Bearer "):
            return JsonResponse({"error": "Authentication required"}, status=401)
        try:
            request.admin = jwt.decode(header[7:], os.getenv("JWT_SECRET", "development-secret-key-change-me-32"), algorithms=["HS256"])
        except jwt.InvalidTokenError:
            return JsonResponse({"error": "Invalid token"}, status=401)
        return view(request, *args, **kwargs)
    return wrapped

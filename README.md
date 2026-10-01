# RAWAL Engineering

Company website and careers portal for RAWAL Engineering. The repository contains a Next.js frontend and a Django REST-style API.

## Project Structure

- `frontend/`: Next.js App Router website, careers pages, and client-side application form.
- `backend/`: Django project, jobs and applications API, resume uploads, and database migrations.
- `backend/portal/management/commands/seed_jobs.py`: idempotently creates the initial job listings.

The website includes the home, about, services, projects, contact, and careers pages. The careers listings and `/admin` workspace currently use frontend sample/demo data; the Django API is a separate backend and is not fully wired to those views yet.

## Requirements

- Node.js 20.9 or newer and npm.
- Python 3.10 or newer.
- SQLite for a zero-setup local database, or PostgreSQL if configuring `DATABASE_URL`.

## Local Development

1. Clone the repository and create local environment files:

	```bash
	cp backend/.env.example backend/.env
	cp frontend/.env.example frontend/.env.local
	```

2. Configure `backend/.env`. For SQLite, remove or leave `DATABASE_URL` empty. To use PostgreSQL, set it to a valid connection URL and ensure the database is running. Replace the example Django, JWT, and admin secrets before exposing the API to a network.

3. Install backend dependencies, migrate the database, and seed sample jobs:

	```bash
	cd backend
	python3 -m venv .venv
	source .venv/bin/activate
	pip install -r requirements.txt
	python manage.py migrate
	python manage.py seed_jobs
	python manage.py runserver 4000
	```

4. In a second terminal, install and start the frontend:

	```bash
	cd frontend
	npm ci
	npm run dev
	```

	Open <http://localhost:3000>. The API health endpoint is <http://localhost:4000/health>.

To stop either service, press `Ctrl+C` in its terminal. The local SQLite database is created at `backend/db.sqlite3` and is ignored by Git.

## Environment Variables

Backend settings are read from `backend/.env`:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Optional PostgreSQL connection URL. When unset, Django uses SQLite. |
| `DJANGO_SECRET_KEY` | Django signing key. Use a unique, long random value outside local development. |
| `DJANGO_DEBUG` | Enables Django debug mode when `true`; use `false` in production. |
| `ALLOWED_HOSTS` | Comma-separated hostnames accepted by Django. |
| `CLIENT_URL` | Comma-separated frontend origins allowed by CORS. |
| `JWT_SECRET` | Secret used to sign API authentication tokens. |
| `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Credentials accepted by `POST /api/auth/login`. Change the sample values. |
| `UPLOAD_DIR` | Resume storage directory; defaults to `backend/uploads`. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` | SMTP configuration for application emails. |
| `HR_EMAIL` | Optional recipient for new-application notifications. |

The frontend reads `NEXT_PUBLIC_API_URL` from `frontend/.env.local`; the example points to `http://localhost:4000`. Frontend environment variables prefixed with `NEXT_PUBLIC_` are included in browser bundles and must not contain secrets.

## API

All endpoints below are served by Django. Protected endpoints require `Authorization: Bearer <token>`; obtain a token with the login endpoint.

| Method | Path | Access and purpose |
| --- | --- | --- |
| `GET` | `/health` | Health check. |
| `POST` | `/api/auth/login` | Admin login; JSON body: `email` and `password`. Returns a JWT. |
| `GET` | `/api/jobs` | List active jobs. |
| `POST` | `/api/jobs` | Create a job; admin token required. |
| `GET` | `/api/jobs/<uuid>` | Read a job. |
| `PUT`, `DELETE` | `/api/jobs/<uuid>` | Update or delete a job; admin token required. |
| `POST` | `/api/upload/resume` | Upload multipart field `resume`; PDF, DOC, or DOCX up to 5 MB. |
| `POST` | `/api/applications` | Submit an application. |
| `GET` | `/api/applications` | List applications; admin token required. |
| `GET`, `DELETE` | `/api/applications/<uuid>` | Read or delete an application; admin token required. |
| `PUT` | `/api/applications/<uuid>/status` | Update application status; admin token required. |

The seed command can be rerun safely; it updates the seeded listings by slug. Django serves uploaded media locally only while debug mode is enabled.

## Checks

Run the frontend lint and production build:

```bash
cd frontend
npm run lint
npm run build
```

Run Django's configuration check:

```bash
cd backend
.venv/bin/python manage.py check
```

## Deployment Notes

The frontend can be deployed to Vercel or another Next.js host. Set `NEXT_PUBLIC_API_URL` to the public API origin at build time. Deploy Django separately to a Django-compatible host, configure PostgreSQL, set `DJANGO_DEBUG=false`, provide strong `DJANGO_SECRET_KEY` and `JWT_SECRET` values, set `ALLOWED_HOSTS` and `CLIENT_URL` to the production domains, and configure SMTP if email notifications are needed. Use persistent/object storage for resumes; local filesystem uploads and Django's debug media serving are intended for development, not production. Never commit `.env` files, credentials, database files, uploaded resumes, or dependency/build directories.

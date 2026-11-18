# CivicLens AI

**Understand your city. Report problems. Drive change.**

CivicLens AI is a multilingual, AI-powered civic complaint platform for Bengaluru residents. Upload a photo of a civic issue, describe it, and get a professional complaint in English or Kannada — ready to send to the right authority.

> 🚀 **Live Demo:** *(add Vercel URL after deployment)*  
> 📡 **API:** *(add Render URL after deployment)*

---

## What It Does

1. **Upload** a photo of a civic problem (pothole, garbage, broken streetlight, drainage, water leakage)
2. **AI analyzes** the image using Google Gemini and generates a formal complaint
3. **Review and edit** the complaint text
4. **Save, copy, or download** the complaint
5. **Find the right authority** via the verified Bengaluru Civic Guide

The platform does **not** submit anything to any government system. That step is always done manually by the user.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Python FastAPI + Uvicorn |
| AI | Google Gemini 1.5 Flash |
| Database | Supabase (PostgreSQL + Auth) |
| Frontend deploy | Vercel |
| Backend deploy | Render |

---

## Local Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- A Supabase project (see DEPLOYMENT.md)
- A Gemini API key (https://aistudio.google.com/app/apikey)

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp ../.env.example .env        # Fill in your values
uvicorn app.main:app --reload
```

Backend runs at http://localhost:8000. Test: http://localhost:8000/health

### Frontend

```bash
cd frontend
npm install
cp ../.env.example .env        # Fill in VITE_* values
npm run dev
```

Frontend runs at http://localhost:5173.

### Database

Run migrations in `supabase/migrations/` in order via Supabase SQL Editor, then run `supabase/seed/reporting_resources.sql`.

---

## Environment Variables

| Variable | Where | Description |
|---|---|---|
| `GEMINI_API_KEY` | Backend | Google Gemini API key |
| `SUPABASE_URL` | Backend | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Backend | Supabase service role key (server only) |
| `SUPABASE_JWT_SECRET` | Backend | Supabase JWT secret for token verification |
| `ALLOWED_ORIGINS` | Backend | Comma-separated allowed CORS origins |
| `VITE_SUPABASE_URL` | Frontend | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Frontend | Supabase anon key (safe for frontend) |
| `VITE_API_BASE_URL` | Frontend | Backend API base URL |

---

## Project Structure

```
civiclens-ai/
├── frontend/       React + Vite application
├── backend/        FastAPI application  
├── supabase/       Migrations and seed data
├── SPEC.md         Full technical specification
├── PAGE_DESIGNS.md Page layout and component guide
├── TASKS.md        Ordered implementation tasks
└── DEPLOYMENT.md   Step-by-step deployment guide
```

---

## Disclaimer

CivicLens AI generates complaint drafts for personal use. It is not affiliated with BBMP, BESCOM, BWSSB, or any government body. All AI-generated content should be reviewed before use.

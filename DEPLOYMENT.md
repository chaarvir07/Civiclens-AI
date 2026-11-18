# CivicLens AI — Deployment Guide

## Prerequisites

- GitHub account with this repository pushed
- Supabase account (free tier)
- Google AI Studio account (for Gemini API key)
- Vercel account (free tier)
- Render account (free tier)

---

## Step 1: Supabase Setup

1. Go to https://supabase.com and create a new project.
2. Set a strong database password and note it down.
3. Wait for the project to provision (~2 minutes).
4. In the SQL editor, paste and run each file from `supabase/migrations/` in numerical order (001 through 008).
5. Run the seed file: `supabase/seed/reporting_resources.sql`.
6. Go to Authentication > Providers > Email and ensure it is enabled.
7. Under Project Settings > API, copy:
   - **Project URL** → `VITE_SUPABASE_URL` and `SUPABASE_URL`
   - **Anon Key** → `VITE_SUPABASE_ANON_KEY`
   - **Service Role Key** → `SUPABASE_SERVICE_ROLE_KEY`
8. Under Project Settings > API > JWT Settings, copy the **JWT Secret** → `SUPABASE_JWT_SECRET`

---

## Step 2: Gemini API Key

1. Go to https://aistudio.google.com/app/apikey
2. Create a new API key.
3. Copy it → `GEMINI_API_KEY`

---

## Step 3: Deploy Backend to Render

1. Go to https://render.com and log in.
2. New > Web Service > connect your GitHub repository.
3. Configure:
   - **Name:** civiclens-api
   - **Root Directory:** backend
   - **Environment:** Python
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Under Environment Variables, add:
   ```
   GEMINI_API_KEY=<your key>
   SUPABASE_URL=<your supabase url>
   SUPABASE_SERVICE_ROLE_KEY=<your service role key>
   SUPABASE_JWT_SECRET=<your jwt secret>
   ENVIRONMENT=production
   ALLOWED_ORIGINS=https://civiclens-ai.vercel.app
   ```
   (Update ALLOWED_ORIGINS after Vercel deploy gives you the real URL)
5. Click Deploy. Wait for build to complete.
6. Test: visit `https://<your-render-url>/health` — should return `{"status":"ok"}`.
7. Note the full Render URL → `VITE_API_BASE_URL`

---

## Step 4: Deploy Frontend to Vercel

1. Go to https://vercel.com and log in.
2. New Project > Import your GitHub repository.
3. Configure:
   - **Root Directory:** frontend
   - **Framework Preset:** Vite
4. Under Environment Variables, add:
   ```
   VITE_SUPABASE_URL=<your supabase url>
   VITE_SUPABASE_ANON_KEY=<your anon key>
   VITE_API_BASE_URL=https://<your-render-url>
   ```
5. Click Deploy. Vercel provides a URL like `https://civiclens-ai.vercel.app`.

---

## Step 5: Post-Deploy Configuration

1. **Update Render CORS:** Go to Render environment variables, change `ALLOWED_ORIGINS` to your actual Vercel URL. Redeploy.
2. **Update Supabase Auth redirects:**
   - Go to Supabase > Authentication > URL Configuration
   - Set **Site URL** to your Vercel URL
   - Add `https://<your-vercel-url>/**` to **Redirect URLs**

---

## Step 6: Verify Production

Run through the smoke test checklist in TASKS.md TASK-026.

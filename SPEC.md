# CivicLens AI — Project Specification Document

**Version:** 1.0  
**Date:** 2025  
**Status:** Approved for Implementation

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement](#2-problem-statement)
3. [Target Users](#3-target-users)
4. [Product Scope](#4-product-scope)
5. [User Stories](#5-user-stories)
6. [Feature Requirements](#6-feature-requirements)
7. [Page-by-Page UI Specification](#7-page-by-page-ui-specification)
8. [Navigation Structure](#8-navigation-structure)
9. [Design System](#9-design-system)
10. [Reusable Components](#10-reusable-components)
11. [Application Architecture](#11-application-architecture)
12. [Database Schema](#12-database-schema)
13. [API Contracts](#13-api-contracts)
14. [AI Prompt and Response Specifications](#14-ai-prompt-and-response-specifications)
15. [Data Sources and Verification Strategy](#15-data-sources-and-verification-strategy)
16. [Authentication and Security](#16-authentication-and-security)
17. [Folder Structure](#17-folder-structure)
18. [Deployment Architecture](#18-deployment-architecture)
19. [Environment Variables](#19-environment-variables)
20. [Testing and Acceptance Criteria](#20-testing-and-acceptance-criteria)
21. [Four-Day Implementation Plan](#21-four-day-implementation-plan)
22. [Risks and Fallback Strategies](#22-risks-and-fallback-strategies)
23. [Definition of Done](#23-definition-of-done)
24. [Hackathon Submission Checklist](#24-hackathon-submission-checklist)

---

## 1. Executive Summary

CivicLens AI is a multilingual, AI-powered civic assistance platform built for Bengaluru residents. Citizens upload a photograph of a civic problem, optionally describe it, and receive an AI-generated professional complaint in English or Kannada. They can save, copy, download, and manually submit the complaint to the appropriate government authority.

The platform addresses three core gaps: identifying the correct reporting authority, composing a formal complaint, and accessing verified reporting channels — all in one place.

**Key constraints:**
- The platform never claims to have submitted anything to a government body.
- All AI-generated content is explicitly labeled as AI-generated and requires user review before use.
- Dashboard metrics derive only from the user's own saved records.
- Civic agency information is only shown if independently verified.

---

## 2. Problem Statement

Bengaluru residents frequently encounter civic infrastructure failures — potholes, overflowing garbage, broken streetlights, blocked drains, water leakage. Reporting these issues is fragmented:

- Multiple agencies handle different issues with no single entry point.
- Citizens don't know which authority to contact for which problem.
- Filing a formal complaint requires formal language many citizens find difficult.
- Existing portals (BBMP, BESCOM, BWSSB) have poor UX and limited multilingual support.
- WhatsApp groups and social media posts rarely reach the right authority.

The result: most civic problems go unreported or get reported to the wrong channel, reducing resolution likelihood.

---

## 3. Target Users

**Primary:** Bengaluru residents, 18–55, with a smartphone or laptop, who encounter and want to report civic infrastructure problems.

**Secondary:** Local civic volunteers, resident welfare associations (RWAs), journalists documenting civic issues.

**User characteristics:**
- May prefer Kannada over English
- May not know the name of the responsible government department
- Need guided, low-friction report creation
- Want to retain a record of what they reported

**Out of scope for MVP:**
- Government officials using the platform to manage complaints
- Automated complaint routing to government systems
- Civic data analytics for the public

---

## 4. Product Scope

### In Scope (MVP)

- Image upload with AI-powered issue analysis
- AI complaint generation in English and Kannada
- Report saving, editing, and management
- Verified civic reporting guide for Bengaluru
- User authentication (Supabase Auth)
- Dashboard showing user's own report history and stats
- Public deployment on Vercel + Render + Supabase

### Out of Scope (MVP)

- Direct API integration with BBMP/BESCOM/BWSSB portals
- Automated complaint submission to any government system
- Real-time status tracking from government systems
- Map-based issue visualization
- Voice input
- Mobile app (native iOS/Android)
- Push notifications
- Community voting or upvoting of issues

---

## 5. User Stories

### Reporting

- **US-01:** As a resident, I want to upload a photo of a civic problem so the AI can identify what the issue is.
- **US-02:** As a resident, I want to add a description and locality so the complaint is specific and accurate.
- **US-03:** As a resident, I want to choose English or Kannada so the complaint matches my preferred language.
- **US-04:** As a resident, I want to review the AI-generated complaint before saving or using it.
- **US-05:** As a resident, I want to edit the complaint text before saving.
- **US-06:** As a resident, I want to copy or download the complaint so I can submit it elsewhere.

### Report Management

- **US-07:** As a user, I want to see all my saved reports in one place.
- **US-08:** As a user, I want to filter my reports by category, status, and date.
- **US-09:** As a user, I want to mark a report as "submitted" after I have manually sent it to an authority.
- **US-10:** As a user, I want to delete a report I no longer need, with a confirmation step.

### Guidance

- **US-11:** As a resident, I want to see which Bengaluru agency handles which civic problem.
- **US-12:** As a resident, I want verified links to official reporting portals.
- **US-13:** As a resident, I want to know when the guide information was last verified.

### Account

- **US-14:** As a user, I want to sign up with email and password.
- **US-15:** As a user, I want my reports to persist across sessions when I am logged in.
- **US-16:** As an anonymous user, I want to use the report creator without signing up (session-only storage).

---

## 6. Feature Requirements

### F-01: Image Upload and Validation

- Accept JPEG, PNG, WEBP formats
- Maximum file size: 10 MB
- Show preview after selection
- Display file name and size
- Reject unsupported formats with a clear error message
- Do not send the image to the AI until the user clicks "Analyze"

### F-02: AI Issue Analysis

- Send image + description + category hint + locality to backend
- Backend sends to Gemini Vision API
- Return structured JSON with: detected category, title, visual observations, suggested description, urgency estimate, limitations/uncertainties
- Display results clearly labeled as "AI Analysis"
- Show a spinner during analysis
- Handle Gemini API failures gracefully with a user-friendly error

### F-03: Complaint Generation

- Use analysis result to generate a formal complaint
- Support English and Kannada
- Output: subject line + body text
- Body must include: salutation, description of issue, location, request for action, closing
- Label all generated text as "AI-Generated — Please review before use"
- Allow user to edit the complaint before saving

### F-04: Report Persistence

- Save reports to Supabase `reports` table
- Associate with authenticated user via `user_id`
- For anonymous users: store in browser localStorage with a warning that data is not persisted across devices
- Support draft and ready-to-submit statuses

### F-05: Report Status Management

- Status values: `draft`, `ready_to_submit`, `marked_submitted`, `archived`
- User can change status manually
- Status `marked_submitted` means the user has indicated they submitted it themselves — not that the government received it
- Never display statuses that imply government action

### F-06: Dashboard Metrics

- Total reports: COUNT of user's reports
- Draft reports: COUNT where status = 'draft'
- Ready to submit: COUNT where status = 'ready_to_submit'
- Marked submitted: COUNT where status = 'marked_submitted'
- Category distribution: GROUP BY category on user's reports
- Recent reports: last 5 reports ordered by created_at DESC
- All queries run against the authenticated user's data only

### F-07: Civic Reporting Guide

- Static content page backed by seed data in the database
- Each entry: category, agency name, official URL, instructions, verified_at date
- Only display entries with a verified_at date populated
- Include a prominent disclaimer: "This information was verified on [date]. Official contact details may change. Always confirm with the official website."
- Do not list phone numbers unless independently verified

### F-08: Multilingual Support

- Language selector on the report page: English / ಕನ್ನಡ
- Language preference stored in user profile
- Complaint generated in selected language
- UI language switching is a P2 feature; P0 delivers English UI with Kannada complaint generation

### F-09: Authentication

- Supabase Auth with email/password
- Protected routes: /dashboard, /reports, /reports/:id
- Unauthenticated users redirected to /login with return URL
- Session persisted via Supabase client
- Logout clears session

---

## 7. Page-by-Page UI Specification

### Page 1: Landing Page (`/`)

**Purpose:** Introduce CivicLens AI, build trust, drive sign-up and report creation.

**Sections:**

1. **Navbar**
   - Left: CivicLens AI logo + wordmark
   - Right: "Guide", "About", "Login", "Sign Up" (primary button)
   - Mobile: hamburger menu

2. **Hero**
   - Headline: "Understand your city. Report problems. Drive change."
   - Subheadline: "AI-powered civic complaint generation for Bengaluru residents. Upload a photo, describe the issue, get a professional complaint in English or Kannada."
   - CTA 1 (primary): "Report an Issue" → /report
   - CTA 2 (secondary): "Explore Features" → scrolls to features section
   - Background: subtle geometric pattern or civic image with overlay

3. **How It Works** (3 steps)
   - Step 1: Upload a photo of the issue
   - Step 2: AI analyzes and generates a complaint
   - Step 3: Save, copy, or download — then submit to the right authority

4. **Features** (card grid)
   - AI-Powered Analysis
   - English & Kannada Complaints
   - Verified Reporting Guide
   - Personal Report History
   - Privacy-First Design

5. **Bengaluru Focus Banner**
   - "Built for Bengaluru" with brief text about BBMP, BESCOM, BWSSB coverage

6. **CTA Section**
   - "Ready to report your first issue?" + Sign Up button

7. **Footer**
   - Links: Home, Report, Guide, About, Login
   - Disclaimer: "CivicLens AI generates complaints for your personal use. It does not submit complaints to any government authority."
   - © 2025 CivicLens AI

---

### Page 2: Dashboard (`/dashboard`)

**Purpose:** Show the authenticated user their report activity and provide navigation to core actions.

**Layout:** Sidebar + main content area.

**Components:**

1. **Welcome header:** "Welcome back, [name]"

2. **Stats row (4 cards):**
   - Total Reports (blue)
   - Drafts (gray)
   - Ready to Submit (amber)
   - Marked Submitted (green)
   - Each card: icon + count + label
   - Count comes from live database query

3. **Category Distribution Chart:**
   - Recharts Pie or Bar chart
   - Data: user's own reports grouped by category
   - If 0 reports: show empty state with text and a "Create Report" button
   - No invented data

4. **Recent Reports table/cards:**
   - Last 5 reports: title, category, status badge, created date, "View" link
   - If 0 reports: empty state with illustration and CTA

5. **Quick action:** "Create New Report" button → /report

---

### Page 3: Report an Issue (`/report`)

**Purpose:** Core feature. Upload image, trigger AI analysis, review and save complaint.

**Layout:** Two-column on desktop (upload/input left, results right), single column on mobile.

**Step 1 — Input:**

1. **Image Upload Zone**
   - Drag-and-drop area with dashed border
   - "Click to upload or drag and drop" label
   - Accepted: JPG, PNG, WEBP — max 10 MB
   - Preview shown after selection with file name and "Remove" option

2. **Description field** (optional)
   - Textarea: "Describe the issue (optional)"
   - Placeholder: "e.g. Large pothole near the main entrance, approximately 1 foot deep..."
   - Max 500 characters with counter

3. **Area/Locality input**
   - Text input: "Area or locality in Bengaluru"
   - Placeholder: "e.g. Koramangala 5th Block"

4. **Category selector**
   - Dropdown: Potholes, Garbage and Waste, Damaged Streetlights, Drainage Problems, Water Leakage, Other Civic Infrastructure
   - Default: "Select a category"

5. **Language selector**
   - Toggle/select: English / ಕನ್ನಡ

6. **Analyze button** (primary, full width)
   - Disabled until image is uploaded
   - Shows spinner during analysis

**Step 2 — AI Results (shown after analysis):**

1. **AI Analysis panel** (labeled "AI Analysis — Automatically Generated")
   - Detected category
   - Issue title
   - Visual observations (bulleted)
   - Urgency estimate
   - Limitations note (what the AI could not determine)

2. **Generated Complaint panel** (labeled "AI-Generated Complaint — Review Before Use")
   - Subject line (editable)
   - Complaint body (editable textarea)
   - Language badge

3. **Action buttons:**
   - "Save Report" (primary) — saves to database
   - "Copy Complaint" — copies body to clipboard with toast confirmation
   - "Download as TXT" — downloads as plain text file
   - "Start Over" — clears form

4. **Guidance note** below actions:
   - "After saving, visit the Civic Guide to find the right authority to send this complaint to."

---

### Page 4: My Reports (`/reports`)

**Purpose:** List and manage all saved reports.

**Layout:** Full-width table with filter sidebar or top filter bar.

**Components:**

1. **Page header:** "My Reports" + "New Report" button

2. **Filter bar:**
   - Search input (title search)
   - Category filter dropdown
   - Status filter dropdown
   - Sort: Newest First / Oldest First

3. **Reports list:**
   - Each item (card or table row): Title, Category badge, Status badge, Created date, Actions (View, Edit, Delete)
   - Status badge colors: Draft=gray, Ready=amber, Marked Submitted=green, Archived=slate

4. **Delete confirmation:**
   - Modal: "Are you sure you want to delete this report? This cannot be undone."
   - Confirm (red) / Cancel

5. **Empty state:**
   - If no reports: illustration + "No reports yet. Start by creating your first report." + CTA button

6. **Pagination:** Show 10 per page with page controls if > 10 reports

---

### Page 5: Report Details (`/reports/:id`)

**Purpose:** Full view of a single report.

**Layout:** Single column, max-width container.

**Sections:**

1. **Breadcrumb:** My Reports > [Report Title]

2. **Report header:**
   - Title (h1)
   - Status badge + "Change Status" button (opens dropdown)
   - Created/Updated timestamps

3. **Metadata row:** Category, Locality, Language

4. **Description section:** User's original description

5. **AI Analysis section** (collapsible):
   - All fields from analysis JSON
   - Labeled "AI Analysis"

6. **Complaint section:**
   - Subject line
   - Complaint body
   - Language badge
   - Edit button (opens inline edit mode)
   - Copy button
   - Download button

7. **Reporting Guidance section:**
   - "Where to submit this complaint" with agency name and official link pulled from reporting_resources for the matching category
   - Disclaimer: "This guidance was verified on [date]. Please confirm current contact details before submitting."

8. **Danger zone:** Delete report (red, with confirmation)

---

### Page 6: Civic Reporting Guide (`/guide`)

**Purpose:** Verified, static reference for Bengaluru civic reporting channels.

**Layout:** Full-width, section-based.

**Sections:**

1. **Page header:** "Bengaluru Civic Reporting Guide"
   - Subheading: "Verified reporting channels for common civic issues"
   - Important disclaimer box (amber/warning): "This guide is maintained manually. Information was last verified on the dates shown. Always confirm on the official website before submitting."

2. **Category cards** (one per issue type):
   - Issue category name + icon
   - Responsible agency
   - Official website link (opens in new tab)
   - Reporting instructions (numbered steps)
   - "Last verified: [date]"
   - If not verified: "⚠️ Unverified — confirm before use"

3. **General disclaimer** (bottom):
   - "CivicLens AI is not affiliated with BBMP, BESCOM, BWSSB, or any government body. Links are provided for convenience and may change."

---

### Page 7: About (`/about`)

**Purpose:** Explain the project, its limitations, and the technology used.

**Sections:**

1. Mission
2. Problem We're Solving
3. How AI is Used (with explicit note: AI generates text, it does not submit to government)
4. Bengaluru Focus
5. Technology stack (Gemini, Supabase, FastAPI, React)
6. Privacy: what data is stored, user owns their data, no data sold
7. Limitations: AI may misidentify issues, Kannada output quality may vary, guide information may become outdated
8. Contact / GitHub link

---

### Page 8: Authentication (`/login`, `/signup`)

**Login page:**
- Email input
- Password input
- "Login" button
- "Forgot password?" link (future)
- "Don't have an account? Sign up" link
- Error message display (invalid credentials, etc.)

**Signup page:**
- Display name input
- Email input
- Password input (min 8 chars)
- Confirm password input
- "Create Account" button
- "Already have an account? Login" link
- Clear validation errors

**Post-auth redirect:** to /dashboard or the originally requested protected route.

---

## 8. Navigation Structure

```
/ (Landing)
├── /login
├── /signup
├── /guide
├── /about
└── [Protected]
    ├── /dashboard
    ├── /report
    ├── /reports
    └── /reports/:id
```

**Navbar (authenticated):**
Left: Logo | Right: Dashboard, New Report, Guide, About, User menu (Profile, Logout)

**Navbar (unauthenticated):**
Left: Logo | Right: Guide, About, Login, Sign Up

**Sidebar (dashboard views, desktop):**
Dashboard, New Report, My Reports, Civic Guide, About, Logout

---

## 9. Design System

### Color Tokens

```css
--color-primary: #2563EB;         /* Blue 600 */
--color-primary-dark: #1D4ED8;    /* Blue 700 (hover) */
--color-navy: #0F172A;            /* Slate 900 */
--color-teal: #0D9488;            /* Teal 600 (accent) */
--color-background: #F8FAFC;      /* Slate 50 */
--color-surface: #FFFFFF;
--color-border: #E2E8F0;          /* Slate 200 */
--color-text-primary: #0F172A;    /* Slate 900 */
--color-text-secondary: #64748B;  /* Slate 500 */
--color-error: #DC2626;           /* Red 600 */
--color-warning: #D97706;         /* Amber 600 */
--color-success: #059669;         /* Emerald 600 */
```

### Typography

```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-kannada: 'Noto Sans Kannada', sans-serif;

--text-xs: 0.75rem / 1rem
--text-sm: 0.875rem / 1.25rem
--text-base: 1rem / 1.5rem
--text-lg: 1.125rem / 1.75rem
--text-xl: 1.25rem / 1.75rem
--text-2xl: 1.5rem / 2rem
--text-3xl: 1.875rem / 2.25rem
--text-4xl: 2.25rem / 2.5rem
```

### Spacing Scale

Tailwind default scale: 4px base unit. Use multiples of 4.

### Border Radius

```css
--radius-sm: 0.375rem;   /* 6px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-full: 9999px;   /* Pills */
```

### Shadows

```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.07);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
```

### Component Patterns

**Cards:** white background, border `--color-border`, `--radius-lg`, `--shadow-sm`, padding 24px.

**Buttons:**
- Primary: `--color-primary` bg, white text, hover `--color-primary-dark`
- Secondary: white bg, `--color-primary` border and text
- Danger: `--color-error` bg, white text
- Disabled: opacity 50%, not-allowed cursor

**Badges:**
- Draft: gray-100 text gray-700
- Ready: amber-100 text amber-700
- Marked Submitted: green-100 text green-700
- Archived: slate-100 text slate-600

**Inputs:** border `--color-border`, rounded-md, focus ring `--color-primary`, placeholder text `--color-text-secondary`.

**Loading states:** Tailwind `animate-pulse` skeleton divs matching the shape of the content being loaded.

**Empty states:** Centered container, light icon (Lucide), heading, subtext, optional CTA button.

**Toast notifications:** Top-right, auto-dismiss 3s, variants: success (green), error (red), info (blue).

---

## 10. Reusable Components

### Layout
- `AppLayout` — authenticated layout with sidebar
- `PublicLayout` — unauthenticated layout with top nav
- `PageHeader` — title + subtitle + optional action button
- `Sidebar` — navigation links with active state

### Data Display
- `StatCard` — icon + number + label
- `ReportCard` — compact report summary
- `StatusBadge` — colored badge for report status
- `CategoryBadge` — colored badge for issue category
- `DataTable` — sortable table with pagination

### Forms
- `ImageUpload` — drag-drop upload zone
- `FormInput` — labeled text input with error state
- `FormTextarea` — labeled textarea with character counter
- `FormSelect` — styled select dropdown
- `LanguageToggle` — English/Kannada selector

### Feedback
- `Toast` — notification toast
- `Modal` — confirmation dialog
- `Spinner` — loading spinner
- `SkeletonCard` — loading placeholder
- `EmptyState` — empty list/data state
- `ErrorMessage` — inline form or API error display
- `AIDisclaimer` — standardized AI-generated content label

### Navigation
- `Navbar` — top navigation bar
- `Breadcrumb` — page breadcrumb trail

---

## 11. Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Vercel)                       │
│  React + Vite + Tailwind + React Router                      │
│  ┌──────────┐  ┌───────────┐  ┌────────────┐               │
│  │  Pages   │  │  Context  │  │  Services  │               │
│  │  /report │  │  AuthCtx  │  │  apiService│               │
│  │  /reports│  │  ToastCtx │  │  supabase  │               │
│  │  /dashboard   └───────────┘  └────────────┘             │
│  └──────────┘                                               │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTPS REST
┌──────────────────────▼──────────────────────────────────────┐
│                    BACKEND (Render)                          │
│  Python FastAPI + Uvicorn                                    │
│  ┌──────────┐  ┌───────────┐  ┌────────────┐               │
│  │  Routes  │  │  Services │  │  Schemas   │               │
│  │  /analyze│  │  gemini   │  │  Pydantic  │               │
│  │  /reports│  │  reports  │  │  models    │               │
│  └──────────┘  └───────────┘  └────────────┘               │
└──────────────────────┬──────────────────────────────────────┘
          ┌────────────┴────────────┐
          │                         │
┌─────────▼──────┐       ┌─────────▼──────┐
│  Supabase DB   │       │  Google Gemini │
│  PostgreSQL    │       │  Vision API    │
│  Auth          │       │                │
│  Row Level Sec │       └────────────────┘
└────────────────┘
```

**Data flow for report creation:**

1. User uploads image on frontend
2. Frontend sends multipart POST to `/api/analyze` on FastAPI backend
3. Backend validates file, encodes image, sends to Gemini Vision API
4. Gemini returns structured analysis
5. Backend returns JSON analysis to frontend
6. Frontend displays analysis; user reviews and optionally edits complaint
7. User clicks Save → frontend POSTs to `/api/reports` (authenticated via Supabase JWT)
8. Backend verifies JWT, inserts record into Supabase `reports` table
9. Frontend redirects to report detail page

**Authentication flow:**

1. User signs up/logs in via Supabase Auth on the frontend
2. Supabase returns a JWT access token
3. Frontend stores token in memory (Supabase client manages this)
4. All protected API calls include `Authorization: Bearer <token>` header
5. Backend verifies token using Supabase JWT secret

---

## 12. Database Schema

### Entity Relationship Summary

- `auth.users` (Supabase managed) ← `profiles` (1:1)
- `auth.users` ← `reports` (1:many)
- `reports` ← `report_events` (1:many)
- `reporting_resources` (independent seed data, no user FK)

### SQL Migration

```sql
-- Migration 001: Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Migration 002: Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  preferred_language TEXT NOT NULL DEFAULT 'en' CHECK (preferred_language IN ('en', 'kn')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Migration 003: Reports table
CREATE TYPE report_status AS ENUM (
  'draft',
  'ready_to_submit',
  'marked_submitted',
  'archived'
);

CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'potholes',
    'garbage_and_waste',
    'damaged_streetlights',
    'drainage_problems',
    'water_leakage',
    'other'
  )),
  description TEXT,
  locality TEXT,
  city TEXT NOT NULL DEFAULT 'Bengaluru',
  status report_status NOT NULL DEFAULT 'draft',
  preferred_language TEXT NOT NULL DEFAULT 'en' CHECK (preferred_language IN ('en', 'kn')),
  ai_analysis JSONB,
  complaint_subject TEXT,
  complaint_body TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reports_user_id ON public.reports(user_id);
CREATE INDEX idx_reports_status ON public.reports(status);
CREATE INDEX idx_reports_category ON public.reports(category);
CREATE INDEX idx_reports_created_at ON public.reports(created_at DESC);

-- Migration 004: Reporting resources
CREATE TABLE public.reporting_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  issue_category TEXT NOT NULL,
  agency_name TEXT NOT NULL,
  official_url TEXT,
  reporting_instructions TEXT,
  source_url TEXT,
  verified_at DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Migration 005: Report events
CREATE TABLE public.report_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  event_metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_report_events_report_id ON public.report_events(report_id);

-- Migration 006: Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_reports_updated_at
  BEFORE UPDATE ON public.reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Migration 007: Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reporting_resources ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only see/edit their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Reports: users can only CRUD their own reports
CREATE POLICY "Users can view own reports"
  ON public.reports FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reports"
  ON public.reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reports"
  ON public.reports FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reports"
  ON public.reports FOR DELETE
  USING (auth.uid() = user_id);

-- Report events: users can view/insert their own
CREATE POLICY "Users can view own report events"
  ON public.report_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own report events"
  ON public.report_events FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Reporting resources: publicly readable, no user writes
CREATE POLICY "Anyone can read reporting resources"
  ON public.reporting_resources FOR SELECT
  USING (true);

-- Migration 008: Profile auto-creation trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, preferred_language)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'User'),
    'en'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Seed Data

```sql
-- Seed verified reporting resources for Bengaluru
-- Note: URLs verified as of 2025. Confirm before each deployment.

INSERT INTO public.reporting_resources 
  (issue_category, agency_name, official_url, reporting_instructions, source_url, verified_at)
VALUES
(
  'potholes',
  'Bruhat Bengaluru Mahanagara Palike (BBMP)',
  'https://bbmpsmart.in/',
  'Visit https://bbmpsmart.in/ and select "Complaint Registration". Alternatively, call BBMP Helpline 1533. You can also use the Fix My Street portal if available in your ward.',
  'https://bbmp.gov.in/',
  '2025-01-01'
),
(
  'garbage_and_waste',
  'Bruhat Bengaluru Mahanagara Palike (BBMP) — Solid Waste Management',
  'https://bbmpsmart.in/',
  'Report missed garbage collection via BBMP Helpline 1533 or the BBMP Smart app. For bulk waste or illegal dumping, file a complaint at the BBMP Smart portal with photo evidence.',
  'https://bbmp.gov.in/solidwaste',
  '2025-01-01'
),
(
  'damaged_streetlights',
  'Bruhat Bengaluru Mahanagara Palike (BBMP) — Electrical Wing',
  'https://bbmpsmart.in/',
  'Report at the BBMP Smart portal under "Street Light Complaint" or call 1533. Provide the pole number if visible on the streetlight pole.',
  'https://bbmp.gov.in/',
  '2025-01-01'
),
(
  'drainage_problems',
  'Bruhat Bengaluru Mahanagara Palike (BBMP) — Storm Water Drain Division',
  'https://bbmpsmart.in/',
  'File a complaint at BBMP Smart portal under "Drainage". For flooding emergencies call 1533 immediately. Provide GPS location or nearest landmark.',
  'https://bbmp.gov.in/',
  '2025-01-01'
),
(
  'water_leakage',
  'Bangalore Water Supply and Sewerage Board (BWSSB)',
  'https://bwssb.gov.in/',
  'Call BWSSB Helpline 1916 for water leakage, pipe bursts, or sewerage overflow. Register online at https://bwssb.gov.in/complaints. Have your property/account number ready if available.',
  'https://bwssb.gov.in/',
  '2025-01-01'
),
(
  'other',
  'Bruhat Bengaluru Mahanagara Palike (BBMP)',
  'https://bbmpsmart.in/',
  'For general civic infrastructure issues, file a complaint at the BBMP Smart portal or call 1533. Describe the issue clearly and include the nearest landmark.',
  'https://bbmp.gov.in/',
  '2025-01-01'
);
```

---

## 13. API Contracts

### Base URL
- Development: `http://localhost:8000`
- Production: `https://civiclens-api.onrender.com` (configure during deployment)

### Authentication
All `/api/reports*` endpoints require `Authorization: Bearer <supabase_jwt>` header.
`/api/analyze`, `/api/generate-complaint`, `/api/reporting-resources`, and `/health` are public.

---

### GET /health

**Response 200:**
```json
{
  "status": "ok",
  "timestamp": "2025-01-01T12:00:00Z",
  "version": "1.0.0"
}
```

---

### POST /api/analyze

**Purpose:** Analyze an uploaded image and return structured civic issue data.

**Request:** `multipart/form-data`
```
image: File (required, JPEG/PNG/WEBP, max 10MB)
description: string (optional, max 500 chars)
category: string (optional, one of the category enum values)
locality: string (optional, max 100 chars)
language: string (optional, "en" | "kn", default "en")
```

**Response 200:**
```json
{
  "detected_category": "potholes",
  "issue_title": "Large pothole on road surface",
  "visual_observations": [
    "Visible road surface depression approximately 1-2 feet in diameter",
    "Cracked asphalt around the edges",
    "No visible safety markings"
  ],
  "suggested_description": "A significant pothole is present on the road surface, posing a risk to vehicles and pedestrians.",
  "urgency_estimate": "moderate",
  "limitations": "Exact depth cannot be determined from photograph. Location is based on user input, not GPS.",
  "complaint_subject": "Complaint Regarding Dangerous Pothole — Koramangala 5th Block",
  "complaint_body": "To,\nThe Executive Engineer,\nBBMP Road Infrastructure Division,\nBengaluru.\n\nSub: Complaint Regarding Dangerous Pothole at Koramangala 5th Block\n\nRespected Sir/Madam,\n\nI am writing to bring to your attention a significant pothole located at Koramangala 5th Block, Bengaluru. The pothole poses a hazard to road users...\n\nI request that this issue be inspected and repaired at the earliest.\n\nThank you,\n[Your Name]\n[Date]",
  "language": "en"
}
```

**Response 400:** Invalid file type or size
```json
{ "detail": "File must be JPEG, PNG, or WEBP and under 10MB." }
```

**Response 422:** Validation error
```json
{ "detail": [{ "loc": ["body", "language"], "msg": "value is not a valid enum value" }] }
```

**Response 503:** Gemini API unavailable
```json
{ "detail": "AI service temporarily unavailable. Please try again in a few minutes." }
```

---

### POST /api/generate-complaint

**Purpose:** Generate a complaint from text input without image (fallback).

**Request:** `application/json`
```json
{
  "category": "potholes",
  "description": "Large pothole near school entrance",
  "locality": "Jayanagar 4th Block",
  "language": "en"
}
```

**Response 200:** Same schema as `/api/analyze` complaint fields.

---

### GET /api/reports

**Auth:** Required

**Query params:** `status`, `category`, `page` (default 1), `limit` (default 10), `sort` (default `created_at:desc`)

**Response 200:**
```json
{
  "reports": [ { ...report object... } ],
  "total": 42,
  "page": 1,
  "limit": 10
}
```

---

### POST /api/reports

**Auth:** Required

**Request:** `application/json`
```json
{
  "title": "Pothole on 100 Feet Road",
  "category": "potholes",
  "description": "Large pothole near the signal",
  "locality": "Indiranagar",
  "preferred_language": "en",
  "ai_analysis": { ...analysis object... },
  "complaint_subject": "Complaint Regarding...",
  "complaint_body": "To,\nThe Engineer...",
  "status": "draft"
}
```

**Response 201:**
```json
{ "id": "uuid", ...report fields... }
```

---

### GET /api/reports/{id}

**Auth:** Required  
**Response 200:** Full report object  
**Response 404:** `{ "detail": "Report not found." }`  
**Response 403:** If report belongs to a different user

---

### PATCH /api/reports/{id}

**Auth:** Required  
**Request:** Partial report object (any editable fields)  
**Response 200:** Updated report object

---

### DELETE /api/reports/{id}

**Auth:** Required  
**Response 204:** No content  
**Response 404 / 403:** As above

---

### GET /api/reporting-resources

**Auth:** Not required

**Query params:** `category` (optional)

**Response 200:**
```json
{
  "resources": [
    {
      "id": "uuid",
      "issue_category": "potholes",
      "agency_name": "BBMP",
      "official_url": "https://bbmpsmart.in/",
      "reporting_instructions": "...",
      "verified_at": "2025-01-01"
    }
  ]
}
```

---

## 14. AI Prompt and Response Specifications

### System Prompt (sent on every Gemini request)

```
You are a civic issue analysis assistant for Bengaluru, India. 
Your task is to analyze images of civic infrastructure problems and generate formal complaint text.

RULES:
1. Only describe what is visibly present in the image. Do not invent details.
2. Do not claim to know the exact location unless the user provides it.
3. Do not claim any government verification or official assessment.
4. If the image is unclear, blurry, or does not show a civic issue, say so explicitly.
5. Never fabricate measurements, severity statistics, or government response expectations.
6. The urgency estimate must only be: "low", "moderate", "high", or "unclear".
7. Always include a limitations field noting what you could not determine.
8. For Kannada output (language: "kn"), generate the complaint_subject and complaint_body in Kannada script.
   The other fields (detected_category, visual_observations, etc.) remain in English.

Respond ONLY with valid JSON matching the schema provided. No markdown, no extra text.
```

### User Prompt Template

```
Analyze this civic infrastructure image for a complaint report.

User-provided context:
- Description: {description or "Not provided"}
- Category hint: {category or "Not specified"}
- Locality: {locality or "Not specified"}, Bengaluru, Karnataka, India
- Preferred language for complaint: {language}

Return a JSON object with exactly these fields:
{
  "detected_category": one of [potholes, garbage_and_waste, damaged_streetlights, drainage_problems, water_leakage, other],
  "issue_title": string (max 80 chars),
  "visual_observations": array of strings (2-5 items, describe only what you see),
  "suggested_description": string (1-2 sentences),
  "urgency_estimate": one of [low, moderate, high, unclear],
  "limitations": string (what you could not determine from the image),
  "complaint_subject": string (formal subject line),
  "complaint_body": string (formal complaint letter body, 150-300 words)
}
```

### Pydantic Response Schema

```python
from pydantic import BaseModel, Field
from typing import List, Literal
from enum import Enum

class IssueCategoryEnum(str, Enum):
    potholes = "potholes"
    garbage_and_waste = "garbage_and_waste"
    damaged_streetlights = "damaged_streetlights"
    drainage_problems = "drainage_problems"
    water_leakage = "water_leakage"
    other = "other"

class UrgencyEnum(str, Enum):
    low = "low"
    moderate = "moderate"
    high = "high"
    unclear = "unclear"

class AIAnalysisResponse(BaseModel):
    detected_category: IssueCategoryEnum
    issue_title: str = Field(max_length=80)
    visual_observations: List[str] = Field(min_items=1, max_items=5)
    suggested_description: str
    urgency_estimate: UrgencyEnum
    limitations: str
    complaint_subject: str
    complaint_body: str
    language: Literal["en", "kn"] = "en"
```

### Fallback Behavior

If Gemini returns invalid JSON or a non-200 response:
1. Retry once after 2 seconds
2. If retry fails, return HTTP 503 with message: "AI service temporarily unavailable. Please try again."
3. Log the error server-side (do not expose Gemini error details to the client)

---

## 15. Data Sources and Verification Strategy

| Dataset | Source | Format | Update Frequency | Verified | Storage | Privacy |
|---|---|---|---|---|---|---|
| User reports | User-generated | Structured JSON + text | On create/edit | N/A — user owns this | Supabase `reports` | Private, RLS enforced |
| AI analysis | Gemini API | JSON | Per request | AI-generated, labeled | JSONB in reports | Private |
| Complaint text | Gemini API | Text | Per request | AI-generated, labeled | Text in reports | Private |
| Reporting resources | BBMP/BWSSB official sites | Text | Manual review | Manually verified, dated | Supabase `reporting_resources` | Public read |
| Dashboard metrics | Derived from user's reports | Aggregated counts | Per page load | Derived from real data | Query-time | Private |
| Demo/sample data | Manually created for seeding | JSON | Once | Labeled as sample | Seed script only | Marked as demo |

**Verification policy for reporting_resources:**
- Each row must have a `verified_at` date
- The person verifying must check: agency name matches official site, URL is reachable, instructions are consistent with current portal
- Re-verify every 3 months or after any government portal redesign

---

## 16. Authentication and Security

### Supabase Auth

- Provider: Email/Password
- JWT expiry: Supabase default (1 hour, with refresh token)
- Frontend: `@supabase/supabase-js` client manages session
- Backend: Verifies JWT using `python-jose` with Supabase JWT secret

### Protected Routes (Frontend)

```
/dashboard, /reports, /reports/:id, /report (save action only)
```

Unauthenticated access to `/report` page is allowed for anonymous use. The Save action requires authentication.

### Row Level Security

All user data tables have RLS policies that restrict each user to their own rows. See Migration 007.

### API Security

- CORS: allow only the production frontend origin + localhost in development
- File upload: validate MIME type server-side (not just extension)
- Max request size: 12 MB (10 MB image + overhead)
- No Gemini API key in frontend code — all Gemini calls go through the backend
- Supabase anon key (safe to expose) used for auth on the frontend
- Supabase service role key never sent to the frontend

### Environment Variable Security

- Backend: `GEMINI_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET` stored as Render environment variables, never in code
- Frontend: only `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_BASE_URL` — these are safe to expose as they are designed for client use with RLS

### Anonymous User Strategy

Anonymous users (not logged in) can use the report creator. Their reports are stored only in `localStorage` with a banner: "Sign in to save your reports across devices. Local reports are lost if you clear your browser data."

The backend `/api/analyze` does not require authentication, limiting risk. No personal data from anonymous users is stored server-side.

---

## 17. Folder Structure

```
civiclens-ai/
├── frontend/
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── AppLayout.jsx
│   │   │   │   ├── PublicLayout.jsx
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Sidebar.jsx
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   ├── Textarea.jsx
│   │   │   │   ├── Select.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Toast.jsx
│   │   │   │   ├── Spinner.jsx
│   │   │   │   ├── SkeletonCard.jsx
│   │   │   │   ├── EmptyState.jsx
│   │   │   │   ├── ErrorMessage.jsx
│   │   │   │   └── AIDisclaimer.jsx
│   │   │   ├── report/
│   │   │   │   ├── ImageUpload.jsx
│   │   │   │   ├── AnalysisResults.jsx
│   │   │   │   ├── ComplaintPreview.jsx
│   │   │   │   └── LanguageToggle.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── StatCard.jsx
│   │   │   │   └── CategoryChart.jsx
│   │   │   └── reports/
│   │   │       ├── ReportCard.jsx
│   │   │       ├── ReportTable.jsx
│   │   │       ├── FilterBar.jsx
│   │   │       └── StatusBadge.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── ReportCreate.jsx
│   │   │   ├── ReportList.jsx
│   │   │   ├── ReportDetail.jsx
│   │   │   ├── Guide.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useReports.js
│   │   │   ├── useAnalyze.js
│   │   │   └── useToast.js
│   │   ├── services/
│   │   │   ├── api.js          (FastAPI client)
│   │   │   └── supabase.js     (Supabase client init)
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ToastContext.jsx
│   │   ├── utils/
│   │   │   ├── formatDate.js
│   │   │   ├── downloadText.js
│   │   │   └── categoryLabels.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── routes.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── dependencies.py     (auth verification)
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── health.py
│   │   │   ├── analyze.py
│   │   │   ├── reports.py
│   │   │   └── resources.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── report.py
│   │   ├── schemas/
│   │   │   ├── __init__.py
│   │   │   ├── analysis.py
│   │   │   ├── report.py
│   │   │   └── resource.py
│   │   └── services/
│   │       ├── __init__.py
│   │       ├── gemini_service.py
│   │       └── supabase_service.py
│   ├── data/
│   │   └── sample_reports.json (labeled demo data)
│   ├── tests/
│   │   ├── test_health.py
│   │   ├── test_analyze.py
│   │   └── test_reports.py
│   ├── requirements.txt
│   ├── .env.example
│   └── Procfile (or render.yaml)
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_extensions.sql
│   │   ├── 002_profiles.sql
│   │   ├── 003_reports.sql
│   │   ├── 004_reporting_resources.sql
│   │   ├── 005_report_events.sql
│   │   ├── 006_triggers.sql
│   │   ├── 007_rls.sql
│   │   └── 008_profile_trigger.sql
│   └── seed/
│       └── reporting_resources.sql
│
├── .gitignore
├── .env.example
├── README.md
├── SPEC.md
├── PAGE_DESIGNS.md
├── TASKS.md
└── DEPLOYMENT.md
```

---

## 18. Deployment Architecture

### Supabase Setup

1. Create project at https://supabase.com
2. Run migrations in order via Supabase SQL editor or CLI
3. Run seed script for reporting_resources
4. Enable Email Auth in Authentication settings
5. Set site URL to production Vercel URL in Auth settings
6. Copy: Project URL, Anon Key, Service Role Key, JWT Secret

### Backend (Render)

1. Connect GitHub repository
2. Create new Web Service, select `backend/` as root directory
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Set environment variables (see Section 19)
6. Free tier is acceptable for hackathon; note cold start latency (~30s)

### Frontend (Vercel)

1. Connect GitHub repository
2. Set root directory to `frontend/`
3. Framework preset: Vite
4. Set environment variables (see Section 19)
5. Deploy; Vercel auto-builds on push to main

### Production CORS Configuration

Backend `main.py` must set:
```python
origins = [
    "https://civiclens-ai.vercel.app",   # production
    "http://localhost:5173",               # development
]
```

Update the production origin after the Vercel URL is known.

---

## 19. Environment Variables

### Backend (.env / Render Environment Variables)

```bash
GEMINI_API_KEY=your_google_gemini_api_key
SUPABASE_URL=https://yourproject.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret
ENVIRONMENT=production
ALLOWED_ORIGINS=https://civiclens-ai.vercel.app
```

### Frontend (.env / Vercel Environment Variables)

```bash
VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_API_BASE_URL=https://civiclens-api.onrender.com
```

### .env.example (committed to repo)

```bash
# Backend
GEMINI_API_KEY=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_JWT_SECRET=
ENVIRONMENT=development
ALLOWED_ORIGINS=http://localhost:5173

# Frontend
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_API_BASE_URL=http://localhost:8000
```

The actual `.env` files are listed in `.gitignore`. Never commit them.

---

## 20. Testing and Acceptance Criteria

### Frontend Tests

| Test | Acceptance Criteria |
|---|---|
| Navigation | All navbar links route to correct pages; active link highlighted |
| Image upload | Valid image shows preview; invalid type shows error; >10MB shows error |
| Analyze button | Disabled without image; shows spinner during request; shows results after |
| AI analysis display | AI label shown; all fields populated; limitations visible |
| Complaint edit | Complaint text editable after generation |
| Copy button | Clicking copies to clipboard; toast confirms |
| Download button | Clicking downloads .txt file with complaint |
| Save report | Authenticated users save to DB; redirected to report detail |
| Anonymous save | Shows "sign in to save" message |
| Dashboard metrics | Counts match actual DB records |
| Category chart | Renders correctly; shows empty state when 0 reports |
| Report list filters | Filter by status/category updates displayed list |
| Delete confirmation | Modal appears before delete; canceling does not delete |
| Auth — signup | Account created; redirected to dashboard |
| Auth — login | Valid credentials succeed; invalid show error |
| Auth — logout | Session cleared; redirect to home |
| Mobile responsive | All pages usable at 375px width |

### Backend Tests

| Test | Acceptance Criteria |
|---|---|
| GET /health | Returns 200 with status ok |
| POST /api/analyze valid | Returns 200 with correct schema |
| POST /api/analyze invalid file | Returns 400 |
| POST /api/analyze no image | Returns 422 |
| POST /api/reports no auth | Returns 401 |
| POST /api/reports with auth | Returns 201 with report |
| GET /api/reports own only | Returns only the authenticated user's reports |
| GET /api/reports/:id wrong user | Returns 403 |
| DELETE /api/reports/:id | Removes record; subsequent GET returns 404 |
| GET /api/reporting-resources | Returns seeded records |

### Deployment Tests

| Test | Acceptance Criteria |
|---|---|
| Vercel deploy | Frontend loads at production URL |
| Render deploy | Backend /health returns 200 |
| Supabase connection | Backend can query Supabase |
| CORS | Frontend can call backend without CORS error |
| Auth redirect | Supabase auth email links work |

---

## 21. Four-Day Implementation Plan

### Day 1: Foundation

**AM:**
- [ ] Initialize monorepo, install dependencies
- [ ] Set up Supabase project, run migrations, run seed
- [ ] Set up FastAPI project structure, verify /health endpoint
- [ ] Deploy skeleton backend to Render

**PM:**
- [ ] Set up React/Vite project with Tailwind, React Router
- [ ] Build design system: tokens, Button, Card, Badge, Input, Spinner
- [ ] Build PublicLayout, AppLayout, Navbar, Sidebar
- [ ] Build Landing page (complete)
- [ ] Deploy skeleton frontend to Vercel

---

### Day 2: Core Feature (Report Creation)

**AM:**
- [ ] Build ImageUpload component
- [ ] Implement `/api/analyze` backend route with Gemini integration
- [ ] Build Pydantic schemas and validate Gemini response
- [ ] Test AI endpoint with Postman/curl

**PM:**
- [ ] Build ReportCreate page (upload → analyze → results → complaint)
- [ ] Wire frontend to backend analyze API
- [ ] Implement Copy and Download functionality
- [ ] Build Supabase Auth: Signup and Login pages
- [ ] Implement AuthContext and protected routes

---

### Day 3: Data and Dashboard

**AM:**
- [ ] Implement `/api/reports` CRUD endpoints with JWT auth
- [ ] Build ReportList page with filters and search
- [ ] Build ReportDetail page with status management
- [ ] Implement Save Report flow (authenticated + anonymous fallback)

**PM:**
- [ ] Build Dashboard page with real database queries
- [ ] Build CategoryChart using Recharts
- [ ] Build StatCards from real counts
- [ ] Build Guide page from reporting_resources data
- [ ] Build About page

---

### Day 4: Polish and Deploy

**AM:**
- [ ] Implement empty states, skeleton loading, error messages
- [ ] Mobile responsive testing and fixes
- [ ] Toast notifications for all user actions
- [ ] End-to-end user flow testing

**PM:**
- [ ] Production environment variable configuration
- [ ] CORS configuration for production URLs
- [ ] Final Vercel + Render deployment
- [ ] Smoke test all features on production URLs
- [ ] Write README with deployment link

---

## 22. Risks and Fallback Strategies

| Risk | Likelihood | Impact | Fallback |
|---|---|---|---|
| Gemini API rate limit hit | Medium | High | Show clear error; allow manual complaint editing without AI |
| Render cold start (30s) | High | Medium | Add loading state/message; show "Waking up backend..." |
| Supabase free tier RLS performance | Low | Low | Acceptable for MVP scale |
| Kannada output quality poor | Medium | Medium | Label output as "AI-generated Kannada — verify before use" |
| Supabase Auth email delivery delayed | Medium | Medium | Allow skipping email verification for hackathon demo |
| Vercel/Render deploy failure | Low | High | Have local demo ready as backup |
| Gemini JSON format deviation | Medium | High | Pydantic validation catches it; return 503 with retry |

---

## 23. Definition of Done

A feature is complete when:

1. It works correctly in production (not just locally)
2. It handles empty states without crashing
3. It handles API errors with a user-visible message
4. All buttons are functional (no disabled or placeholder buttons)
5. No hardcoded fake data appears as real user or civic data
6. AI-generated content is labeled as such
7. Mobile layout is functional at 375px
8. No API keys are exposed in frontend code or git history

The MVP is complete when:
- All P0 features are deployed and working
- A user can create a report from scratch (image → AI → complaint → saved) on the production URL
- The civic guide shows verified agency information
- Authentication works end-to-end

---

## 24. Hackathon Submission Checklist

- [ ] Production frontend URL (Vercel) accessible publicly
- [ ] Production backend URL (Render) /health returns 200
- [ ] User can sign up and log in
- [ ] User can upload an image and receive AI analysis
- [ ] User can generate a complaint in English
- [ ] User can generate a complaint in Kannada
- [ ] User can save a report
- [ ] User can view all their reports
- [ ] User can copy and download a complaint
- [ ] Dashboard shows real counts from the database
- [ ] Civic Guide shows verified Bengaluru agency information
- [ ] No fake government statistics displayed
- [ ] All pages are mobile-responsive
- [ ] README has deployment URL and setup instructions
- [ ] GitHub repository is public or shared with judges
- [ ] No API keys in source control

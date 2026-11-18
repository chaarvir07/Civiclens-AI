# CivicLens AI — Implementation Tasks

**Version:** 1.0  
**Usage:** Work through tasks in order within each phase. Each task is atomic — it has one clear output. Mark a task done only when its acceptance criteria pass.

**Priority levels:**  
- P0: Must ship for a working MVP demo  
- P1: Should ship for a complete product  
- P2: Nice to have  

---

## Phase 0 — Project Setup

### TASK-001 · Initialize Monorepo Structure
**Priority:** P0  
**Estimated time:** 20 min

Create the full folder structure as defined in SPEC.md Section 17.

```
civiclens-ai/
├── frontend/
├── backend/
├── supabase/
├── .gitignore
├── .env.example
├── README.md
```

**Acceptance criteria:**
- [ ] All directories exist
- [ ] `.gitignore` excludes: `*.env`, `.env`, `node_modules/`, `__pycache__/`, `*.pyc`, `dist/`, `.DS_Store`, `venv/`
- [ ] `.env.example` contains all variable names from SPEC.md Section 19 with empty values
- [ ] Git repository initialized with an initial commit

---

### TASK-002 · Set Up Supabase Project
**Priority:** P0  
**Estimated time:** 30 min

Create a Supabase project and run all database migrations.

**Steps:**
1. Create project at https://supabase.com
2. In SQL Editor, run each migration file from `supabase/migrations/` in order (001 through 008)
3. Run the seed script `supabase/seed/reporting_resources.sql`
4. Enable Email Auth in Authentication > Providers
5. Copy Project URL, Anon Key, Service Role Key, JWT Secret

**Acceptance criteria:**
- [ ] All 4 tables exist: `profiles`, `reports`, `reporting_resources`, `report_events`
- [ ] RLS is enabled on all 4 tables
- [ ] 6 rows exist in `reporting_resources` (one per category)
- [ ] `profiles` auto-creation trigger works (create a test user, verify profile row appears)
- [ ] Environment variables noted for use in TASK-003 and TASK-005

---

### TASK-003 · Initialize FastAPI Backend
**Priority:** P0  
**Estimated time:** 30 min

Create the Python backend project.

**Steps:**
1. In `backend/`, create a virtual environment: `python -m venv venv`
2. Create `requirements.txt`:
```
fastapi==0.111.0
uvicorn[standard]==0.29.0
python-multipart==0.0.9
pydantic==2.7.1
pydantic-settings==2.2.1
google-generativeai==0.5.4
supabase==2.4.3
python-jose[cryptography]==3.3.0
httpx==0.27.0
pillow==10.3.0
python-dotenv==1.0.1
```
3. Create `app/main.py` with FastAPI app, CORS middleware (allow localhost:5173 and env ALLOWED_ORIGINS), and import all routers
4. Create `app/config.py` using pydantic-settings to load env vars
5. Create `GET /health` route returning `{ "status": "ok", "version": "1.0.0" }`
6. Create `backend/.env` from `.env.example`

**Acceptance criteria:**
- [ ] `uvicorn app.main:app --reload` starts without errors
- [ ] `GET http://localhost:8000/health` returns 200 `{ "status": "ok" }`
- [ ] CORS allows requests from localhost:5173
- [ ] No API keys in source code (loaded via env only)

---

### TASK-004 · Initialize React Frontend
**Priority:** P0  
**Estimated time:** 20 min

Create the React/Vite frontend project.

**Steps:**
1. In `frontend/`, run: `npm create vite@latest . -- --template react`
2. Install dependencies:
```
npm install react-router-dom @supabase/supabase-js axios lucide-react recharts
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
3. Configure `tailwind.config.js`: add content paths, extend theme with the design tokens from SPEC.md Section 9 as CSS custom properties
4. Add Google Fonts to `index.html`: Inter and Noto Sans Kannada
5. Set up `src/styles/index.css` with Tailwind directives + CSS variable definitions
6. Create `frontend/.env` from `.env.example`
7. Create `src/services/supabase.js` initializing the Supabase client from env vars
8. Create `src/services/api.js` with axios instance pointing to `VITE_API_BASE_URL`

**Acceptance criteria:**
- [ ] `npm run dev` starts at localhost:5173 with no errors
- [ ] Tailwind classes work (add a test `text-blue-600` to App.jsx)
- [ ] `import { supabase } from './services/supabase'` works without error
- [ ] `.env` is not committed (verify with `git status`)

---

## Phase 1 — Design System and Layouts

### TASK-005 · Build Core UI Components
**Priority:** P0  
**Estimated time:** 90 min

Build all reusable UI components in `src/components/ui/`.

**Components to build:**

**Button.jsx**
- Props: `variant` (primary|secondary|danger|ghost), `size` (sm|md|lg), `loading`, `disabled`, `onClick`, `children`
- Primary: bg-blue-600, hover:bg-blue-700, text-white
- Secondary: border border-blue-600, text-blue-600, hover:bg-blue-50
- Danger: bg-red-600, hover:bg-red-700, text-white
- Ghost: text-slate-500, hover:bg-slate-100
- Loading: shows Spinner + disabled state
- Full-width option via `className` prop

**Badge.jsx**
- Props: `variant` (category|status), `value`
- Status variants: draft=gray, ready_to_submit=amber, marked_submitted=green, archived=slate
- Category variants: potholes=blue, garbage_and_waste=emerald, etc.

**Card.jsx**
- Props: `children`, `className`, `padding` (sm|md|lg)
- White bg, border border-slate-200, rounded-xl, shadow-sm

**Input.jsx**
- Props: `label`, `error`, `helper`, standard HTML input props
- Shows red border + error text when `error` prop set

**Textarea.jsx**
- Props: same as Input + `maxLength`, `showCounter`
- Counter: bottom-right, text-xs, text-slate-400

**Select.jsx**
- Props: `label`, `options` (array of {value, label}), `error`, standard select props

**Modal.jsx**
- Props: `isOpen`, `onClose`, `title`, `children`, `footer`
- Overlay: bg-black/50, flex items-center justify-center
- Closes on overlay click and Escape key

**Spinner.jsx**
- Props: `size` (sm|md|lg), `color`
- CSS animation rotating border

**SkeletonCard.jsx**
- Props: `lines` (number of skeleton lines)
- animate-pulse gray blocks

**EmptyState.jsx**
- Props: `icon`, `title`, `description`, `action` ({label, onClick})

**ErrorMessage.jsx**
- Props: `message`
- bg-red-50, border-red-200, text-red-700, rounded-lg, p-3

**AIDisclaimer.jsx**
- Static component, amber warning box, fixed text from SPEC.md

**Toast.jsx** + **ToastContext.jsx**
- Context provides `showToast(message, variant)` function
- Toast stack fixed top-right, auto-dismiss 3s
- Variants: success, error, info, warning

**Acceptance criteria:**
- [ ] All components render without errors in a test file
- [ ] Button shows spinner when `loading={true}`
- [ ] Modal closes on Escape key
- [ ] Toast auto-dismisses after 3 seconds
- [ ] All components accept `className` for extension

---

### TASK-006 · Build Layout Components
**Priority:** P0  
**Estimated time:** 60 min

Build `AppLayout`, `PublicLayout`, `Navbar`, and `Sidebar`.

**Navbar.jsx**
- Renders differently when `isAuthenticated` (from AuthContext)
- Authenticated right side: Dashboard, New Report, Guide, About, user menu dropdown (name + Logout)
- Unauthenticated right side: Guide, About, Login, Sign Up button
- Mobile: hamburger icon, slide-down or drawer nav
- Sticky top-0, z-50, bg-white, border-bottom

**Sidebar.jsx**
- Fixed 240px, full height, white bg, border-right
- Links: Dashboard (/dashboard), New Report (/report), My Reports (/reports), Civic Guide (/guide), About (/about)
- Active link detection via `useLocation()`
- User section at bottom: display name + Logout button
- Mobile: hidden by default, toggleable via AppLayout

**AppLayout.jsx**
- Wraps authenticated pages
- Renders Sidebar + main content area
- Main content: ml-60 (desktop), ml-0 (mobile), min-h-screen, bg-slate-50

**PublicLayout.jsx**
- Wraps public pages
- Renders Navbar + main content + Footer

**PageHeader.jsx**
- Props: `title`, `subtitle`, `action` ({label, onClick, href})

**Acceptance criteria:**
- [ ] AppLayout shows sidebar on desktop, hides on mobile
- [ ] Active nav link is highlighted correctly
- [ ] PublicLayout navbar login/signup links are correct
- [ ] User name appears in sidebar

---

### TASK-007 · Set Up React Router and Auth Context
**Priority:** P0  
**Estimated time:** 45 min

Wire up routing and authentication.

**AuthContext.jsx**
- Wraps the app
- State: `user`, `loading`
- Methods: `signIn(email, password)`, `signUp(email, password, displayName)`, `signOut()`
- Uses `supabase.auth.getSession()` on mount and `supabase.auth.onAuthStateChange()` for updates

**ProtectedRoute.jsx**
- HOC that checks AuthContext
- If not authenticated: redirect to `/login?redirect=<current path>`
- If loading: show full-page spinner

**routes.jsx**
- Define all routes:
  - `/` → Landing (PublicLayout)
  - `/login` → Login (PublicLayout, redirect to /dashboard if already logged in)
  - `/signup` → Signup (PublicLayout, same redirect)
  - `/guide` → Guide (PublicLayout)
  - `/about` → About (PublicLayout)
  - `/dashboard` → Dashboard (AppLayout, ProtectedRoute)
  - `/report` → ReportCreate (AppLayout for auth, PublicLayout for anon — handle both)
  - `/reports` → ReportList (AppLayout, ProtectedRoute)
  - `/reports/:id` → ReportDetail (AppLayout, ProtectedRoute)
  - `*` → 404 page (simple "Page not found" with link home)

**Acceptance criteria:**
- [ ] Visiting /dashboard while logged out redirects to /login
- [ ] After login, user is redirected back to the original destination
- [ ] AuthContext user is populated after login
- [ ] Logout clears user and redirects to /

---

## Phase 2 — Backend AI and Reports API

### TASK-008 · Build AI Analysis Endpoint
**Priority:** P0  
**Estimated time:** 90 min

Implement `POST /api/analyze` in the backend.

**Files to create/edit:**
- `app/schemas/analysis.py` — Pydantic models from SPEC.md Section 14
- `app/services/gemini_service.py` — Gemini API integration
- `app/routes/analyze.py` — FastAPI route

**gemini_service.py:**
1. Initialize `google.generativeai` client with `GEMINI_API_KEY`
2. Use model `gemini-1.5-flash` (supports vision + is fast and cheap)
3. Function `analyze_image(image_bytes, description, category, locality, language)`:
   - Encode image bytes to base64
   - Build prompt from SPEC.md Section 14 templates
   - Send to Gemini with `generation_config` requesting JSON output
   - Parse response JSON
   - Validate with `AIAnalysisResponse` Pydantic model
   - Retry once on failure
   - Raise `HTTPException(503)` if retry also fails

**analyze.py route:**
1. Accept `multipart/form-data` with file + optional fields
2. Validate file: check content_type in `['image/jpeg', 'image/png', 'image/webp']`
3. Validate file size: read bytes, check len <= 10_485_760 (10MB)
4. Call gemini_service
5. Return response

**Acceptance criteria:**
- [ ] `POST /api/analyze` with a valid image returns 200 with correct schema
- [ ] Invalid file type returns 400
- [ ] File > 10MB returns 400
- [ ] Gemini failure returns 503 (not 500 with internal details)
- [ ] `visual_observations` is always a list
- [ ] `language` field in response matches what was sent

---

### TASK-009 · Build Reports CRUD API
**Priority:** P0  
**Estimated time:** 90 min

Implement all report endpoints.

**Files to create/edit:**
- `app/schemas/report.py` — ReportCreate, ReportUpdate, ReportResponse Pydantic models
- `app/dependencies.py` — JWT verification middleware
- `app/services/supabase_service.py` — Supabase client using service role key
- `app/routes/reports.py` — all 5 report endpoints

**dependencies.py:**
```python
async def get_current_user(authorization: str = Header(None)):
    # Verify Bearer token using python-jose and SUPABASE_JWT_SECRET
    # Return user_id or raise HTTPException(401)
```

**reports.py routes:**
- `GET /api/reports` — query with filters, pagination, return paginated list
- `POST /api/reports` — insert, return created report
- `GET /api/reports/{id}` — fetch by id, verify user_id matches
- `PATCH /api/reports/{id}` — update allowed fields, verify ownership
- `DELETE /api/reports/{id}` — delete, verify ownership, return 204

All routes use `Depends(get_current_user)`.

**Acceptance criteria:**
- [ ] All 5 endpoints return correct status codes
- [ ] Request without auth token returns 401
- [ ] Request with valid token for wrong user's report returns 403
- [ ] `GET /api/reports` respects `status`, `category` filters
- [ ] `GET /api/reports` returns paginated results with `total`, `page`, `limit`
- [ ] Deleted report returns 404 on subsequent GET

---

### TASK-010 · Build Reporting Resources Endpoint
**Priority:** P0  
**Estimated time:** 20 min

**`GET /api/reporting-resources`**
- Optional `category` query param
- Returns rows from `reporting_resources` table
- No auth required

**Acceptance criteria:**
- [ ] Returns all 6 seeded rows when no filter
- [ ] Returns 1 matching row when `category=potholes`
- [ ] Only returns rows with `verified_at` populated

---

## Phase 3 — Core Pages

### TASK-011 · Build Landing Page
**Priority:** P0  
**Estimated time:** 90 min

Build `src/pages/Landing.jsx` per PAGE_DESIGNS.md Page 1.

**Sections to build:**
1. Hero — dark navy bg, headline, two CTAs
2. How It Works — 3 cards
3. Features — 5 feature cards
4. Bengaluru Focus Banner
5. Final CTA section

Use only components from the design system. No inline styles except for the hero background.

**Acceptance criteria:**
- [ ] All 5 sections render on desktop and mobile
- [ ] "Report an Issue" button navigates to /report
- [ ] "Explore Features" scrolls to the features section
- [ ] "Sign Up" button navigates to /signup
- [ ] Mobile nav drawer opens and closes
- [ ] Footer disclaimer is visible

---

### TASK-012 · Build Login and Signup Pages
**Priority:** P0  
**Estimated time:** 60 min

**Login.jsx:**
- Email + password form
- Calls `AuthContext.signIn()`
- Shows ErrorMessage on failure
- Shows Spinner during submit
- Link to /signup

**Signup.jsx:**
- Display name + email + password + confirm password
- Client-side validation: password >= 8 chars, passwords match
- Calls `AuthContext.signUp()`
- Shows errors
- After success: redirect to /dashboard

**Acceptance criteria:**
- [ ] Login with correct credentials → redirected to /dashboard (or original destination)
- [ ] Login with wrong password → shows error "Invalid email or password"
- [ ] Signup with mismatched passwords → shows validation error before submit
- [ ] Signup with existing email → shows Supabase error
- [ ] Forms show spinner on submit, re-enable on error

---

### TASK-013 · Build Report Creation Page
**Priority:** P0  
**Estimated time:** 120 min

Build `src/pages/ReportCreate.jsx` with all sub-components.

**Sub-components to build:**

**ImageUpload.jsx**
- Drag-and-drop zone (use `onDrop` and `onDragOver` events)
- File input fallback (hidden, triggered by click on zone)
- Preview after selection (img tag + file name + size)
- Remove button
- Validates type and size, shows error if invalid

**LanguageToggle.jsx**
- Two-pill toggle: English / ಕನ್ನಡ
- Returns "en" or "kn"

**AnalysisResults.jsx**
- Props: `analysis` object
- Displays all fields from AIAnalysisResponse
- Always includes AIDisclaimer component

**ComplaintPreview.jsx**
- Props: `subject`, `body`, `language`, `onSubjectChange`, `onBodyChange`
- Subject: editable Input
- Body: editable Textarea
- Language badge
- Copy button (uses `navigator.clipboard.writeText`)
- Download button (creates Blob, triggers download)

**ReportCreate page wiring:**
1. State: `image`, `description`, `locality`, `category`, `language`, `analysis`, `complaint`, `loading`, `error`
2. Analyze button: POST to `/api/analyze` with FormData
3. After analysis: set analysis state, complaint state
4. Save button (authenticated only): POST to `/api/reports`, redirect to /reports/:id
5. Anonymous save: store in localStorage, show sign-in prompt

**Acceptance criteria:**
- [ ] Cannot click Analyze without an image
- [ ] Invalid image file shows error message
- [ ] Spinner shows during analysis
- [ ] AI results appear after successful analysis
- [ ] AIDisclaimer is visible
- [ ] Subject and body are editable
- [ ] Copy button copies body text, shows success toast
- [ ] Download button downloads a .txt file
- [ ] Save button (authenticated) saves report and redirects
- [ ] Start Over clears all state

---

### TASK-014 · Build Dashboard Page
**Priority:** P0  
**Estimated time:** 90 min

Build `src/pages/Dashboard.jsx`.

**Data fetching:**
- Use `GET /api/reports` to fetch the user's reports
- Compute counts on the frontend from the returned data (or add a dedicated `/api/reports/stats` endpoint if preferred)

**CategoryChart.jsx**
- Recharts BarChart
- Data: group reports by category, count each
- X-axis: category display names (from `src/utils/categoryLabels.js`)
- Y-axis: count
- Color each bar with a distinct color from the design system
- Tooltip showing category + count
- Empty state: show EmptyState component with chart placeholder

**StatCard.jsx**
- Props: `title`, `count`, `icon`, `colorVariant`
- Shows SkeletonCard during load

**Acceptance criteria:**
- [ ] All 4 stat cards show real counts from the database
- [ ] Category chart renders with real data
- [ ] Empty dashboard shows meaningful empty states (not zeros that look like data)
- [ ] Recent reports list shows last 5 reports
- [ ] "Create New Report" button navigates to /report
- [ ] Skeleton loaders shown during data fetch

---

### TASK-015 · Build My Reports Page
**Priority:** P1  
**Estimated time:** 90 min

Build `src/pages/ReportList.jsx`.

**Features:**
- Fetch reports with current filters via `GET /api/reports?status=X&category=Y&sort=Z&page=N`
- Debounce search input (300ms) before fetching
- ReportCard shows: title, category badge, status badge, locality, created date, View + Delete actions
- Delete opens Modal for confirmation, then calls `DELETE /api/reports/:id`, shows toast, refreshes list
- Pagination controls

**Acceptance criteria:**
- [ ] Reports list loads from real database
- [ ] Search filters results (by title)
- [ ] Category filter works
- [ ] Status filter works
- [ ] Newest/Oldest sort works
- [ ] Delete confirmation modal appears
- [ ] After delete, report disappears from list
- [ ] Empty state shown when no reports match filters
- [ ] Pagination controls appear when > 10 reports
- [ ] Mobile layout is correct (cards stack, filter bar wraps)

---

### TASK-016 · Build Report Detail Page
**Priority:** P1  
**Estimated time:** 90 min

Build `src/pages/ReportDetail.jsx`.

**Features:**
- Fetch report by ID via `GET /api/reports/:id`
- Breadcrumb navigation
- Status change dropdown (PATCH /api/reports/:id with new status, toast on success)
- Collapsible AI analysis section
- Inline edit for complaint subject and body
- Copy and Download buttons
- Reporting guidance from `/api/reporting-resources?category=X`
- Delete with confirmation (then redirect to /reports)

**Acceptance criteria:**
- [ ] All report fields display correctly
- [ ] Status can be changed, change persists on page refresh
- [ ] AI analysis section collapses/expands
- [ ] Edit mode works for complaint subject and body
- [ ] Save Changes button updates report via PATCH
- [ ] Copy and Download work
- [ ] Reporting guidance section shows correct agency for the report's category
- [ ] Delete redirects to /reports with success toast

---

### TASK-017 · Build Civic Guide Page
**Priority:** P1  
**Estimated time:** 60 min

Build `src/pages/Guide.jsx`.

**Data fetching:**
- Call `GET /api/reporting-resources` on mount
- Display one card per resource

**Acceptance criteria:**
- [ ] Disclaimer banner is prominent and visible
- [ ] All 6 category cards render
- [ ] "Verified" badge shows for entries with `verified_at`
- [ ] All official URLs open in a new tab
- [ ] "Last verified" date is shown per card
- [ ] No unverified data is presented as official

---

### TASK-018 · Build About Page
**Priority:** P1  
**Estimated time:** 30 min

Build `src/pages/About.jsx` per PAGE_DESIGNS.md Page 7.

**Acceptance criteria:**
- [ ] All 7 sections render with correct content
- [ ] Technology stack section lists correct tools
- [ ] AI limitations section explicitly states AI does not submit to government
- [ ] Page is readable at 375px

---

## Phase 4 — Polish and Production

### TASK-019 · Implement Error Handling and Edge Cases
**Priority:** P0  
**Estimated time:** 60 min

Ensure the application handles all failure modes gracefully.

**Items:**
- Backend: add request size limit (12MB) to FastAPI settings
- Backend: return structured error responses `{ "detail": "..." }` on all errors
- Frontend: catch all API errors in axios interceptors, show toast on 5xx
- Frontend: handle `GET /api/reports` empty array (not null/undefined)
- Frontend: handle Render cold start (add "Service is waking up, please wait..." message if request takes > 5s)
- Frontend: handle Supabase auth session expiry gracefully (re-login prompt)

**Acceptance criteria:**
- [ ] 503 from backend shows "Service temporarily unavailable" toast
- [ ] Network offline shows "Check your connection" toast
- [ ] 401 responses redirect to /login
- [ ] Empty report list shows EmptyState, not an error
- [ ] Cold start shows informative loading message after 5s

---

### TASK-020 · Implement Mobile Responsiveness
**Priority:** P0  
**Estimated time:** 60 min

Test and fix all pages at 375px width.

**Checklist per page:**
- [ ] Landing: hero readable, cards stack, navbar drawer works
- [ ] Dashboard: stat cards 2-column, chart scrollable or simplified
- [ ] Report Create: single column, all inputs full width, buttons full width
- [ ] My Reports: cards stack, filter bar wraps to two rows
- [ ] Report Detail: all sections full width, metadata row wraps
- [ ] Guide: cards single column, links tappable (min 44px touch target)
- [ ] Login/Signup: card fills screen with padding
- [ ] Sidebar hidden, hamburger visible

---

### TASK-021 · Implement Kannada Complaint Generation
**Priority:** P1  
**Estimated time:** 30 min

**Steps:**
1. Verify that the Gemini service sends the correct language parameter
2. Add `font-kannada` class to complaint body when `language === "kn"` (loads Noto Sans Kannada)
3. Badge in ComplaintPreview shows "ಕನ್ನಡ" label when Kannada
4. Download filename: `complaint_kn.txt` for Kannada

**Acceptance criteria:**
- [ ] Selecting ಕನ್ನಡ and clicking Analyze returns a Kannada complaint body
- [ ] Kannada text renders with Noto Sans Kannada font
- [ ] English complaint is not affected
- [ ] Language badge displays correctly

---

### TASK-022 · Anonymous User Local Storage Fallback
**Priority:** P1  
**Estimated time:** 30 min

For unauthenticated users on /report:
1. After AI analysis and complaint generation, show Save button with note: "Sign in to save to your account"
2. Optionally store the current draft in `localStorage` under a key like `civiclens_draft`
3. Show banner: "Your report is saved locally. Sign in to save it permanently."
4. On login, check for draft in localStorage and prompt to save it

**Acceptance criteria:**
- [ ] Anonymous user can complete analysis and generation workflow
- [ ] Save button for anonymous user shows sign-in message
- [ ] Draft is recoverable after login

---

### TASK-023 · Configure Production Deployment
**Priority:** P0  
**Estimated time:** 60 min

**Backend (Render):**
1. Connect GitHub repo to Render
2. Set root directory: `backend/`
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Add all backend environment variables
6. Deploy and test `/health` endpoint

**Frontend (Vercel):**
1. Connect GitHub repo to Vercel
2. Set root directory: `frontend/`
3. Framework: Vite
4. Add all frontend environment variables (`VITE_*`)
5. Set `VITE_API_BASE_URL` to the Render backend URL
6. Deploy

**Supabase:**
1. Set Auth > URL Configuration > Site URL to Vercel URL
2. Add Vercel URL to Auth > Redirect URLs

**Update CORS in backend:**
1. Update `ALLOWED_ORIGINS` env var on Render to include the Vercel URL

**Acceptance criteria:**
- [ ] `GET https://<render-url>/health` returns 200
- [ ] Frontend loads at Vercel URL
- [ ] User can sign up on production
- [ ] User can analyze an image on production
- [ ] No CORS errors in browser console
- [ ] No environment variable errors in Render logs

---

### TASK-024 · Write README.md
**Priority:** P0  
**Estimated time:** 30 min

**Include:**
- Project description (2 sentences)
- Live demo link (Vercel URL)
- Screenshot or GIF of the main feature
- Tech stack list
- Local setup instructions:
  1. Clone repo
  2. Backend setup (venv, install, .env, uvicorn)
  3. Frontend setup (npm install, .env, npm run dev)
  4. Supabase migrations
- Environment variables table (name, where to get it, required?)
- Link to SPEC.md, PAGE_DESIGNS.md
- Hackathon context note

**Acceptance criteria:**
- [ ] README has the production Vercel URL
- [ ] Local setup instructions are accurate (another person can follow them)
- [ ] No secrets in README
- [ ] Repository is public or accessible to judges

---

### TASK-025 · Create DEPLOYMENT.md
**Priority:** P1  
**Estimated time:** 30 min

Detailed step-by-step deployment guide for all three services, including:
- Exact commands for each step
- Screenshots or specific UI references for Supabase/Vercel/Render setup
- Troubleshooting: common errors and fixes
- How to run migrations via Supabase CLI vs SQL editor

---

### TASK-026 · Final End-to-End Smoke Test
**Priority:** P0  
**Estimated time:** 30 min

Run through the complete user journey on production:

1. Visit Vercel URL — landing page loads
2. Sign up with a new email
3. Navigate to /report
4. Upload an image of a civic issue
5. Fill in description and locality
6. Click Analyze — AI results appear
7. Review and edit the complaint
8. Click Copy — clipboard content is correct
9. Click Download — .txt file downloads
10. Click Save Report — redirects to report detail
11. Visit /dashboard — stat cards show counts, chart shows data
12. Visit /reports — report appears in list
13. Change status to "Ready to Submit"
14. Visit /guide — 6 agency cards appear with links
15. Log out — redirected to home
16. Log back in — reports still appear

**Acceptance criteria:**
- [ ] All 16 steps complete without error on production
- [ ] No console errors during the workflow
- [ ] All pages load without blank white screens
- [ ] Mobile version tested on a real device or Chrome DevTools 375px

---

## Phase 5 — Optional Enhancements (P2)

These tasks are only attempted after all P0 and P1 tasks are complete and deployed.

### TASK-027 · Add Report Image Storage (Supabase Storage)
**Priority:** P2

- Create a Supabase Storage bucket `report-images` (private)
- Upload image to bucket on save, store URL in `reports.image_url`
- Display image in Report Detail page

### TASK-028 · Add Category Distribution Chart to Guide Page
**Priority:** P2

- Show a small bar chart of "My Reports" by category inline in the guide

### TASK-029 · UI Language Toggle (Full Kannada UI)
**Priority:** P2

- Implement i18n with react-i18next
- Translate all UI labels to Kannada

### TASK-030 · Voice Description Input
**Priority:** P2

- Use Web Speech API for voice-to-text in the description field
- English and Kannada language modes

---

## Task Status Tracker

| Task | Name | Priority | Status |
|---|---|---|---|
| TASK-001 | Initialize Monorepo | P0 | ⬜ Not started |
| TASK-002 | Supabase Project | P0 | ⬜ Not started |
| TASK-003 | FastAPI Backend | P0 | ⬜ Not started |
| TASK-004 | React Frontend | P0 | ⬜ Not started |
| TASK-005 | UI Components | P0 | ⬜ Not started |
| TASK-006 | Layout Components | P0 | ⬜ Not started |
| TASK-007 | Router and Auth Context | P0 | ⬜ Not started |
| TASK-008 | AI Analyze Endpoint | P0 | ⬜ Not started |
| TASK-009 | Reports CRUD API | P0 | ⬜ Not started |
| TASK-010 | Reporting Resources API | P0 | ⬜ Not started |
| TASK-011 | Landing Page | P0 | ⬜ Not started |
| TASK-012 | Login and Signup | P0 | ⬜ Not started |
| TASK-013 | Report Create Page | P0 | ⬜ Not started |
| TASK-014 | Dashboard Page | P0 | ⬜ Not started |
| TASK-015 | My Reports Page | P1 | ⬜ Not started |
| TASK-016 | Report Detail Page | P1 | ⬜ Not started |
| TASK-017 | Civic Guide Page | P1 | ⬜ Not started |
| TASK-018 | About Page | P1 | ⬜ Not started |
| TASK-019 | Error Handling | P0 | ⬜ Not started |
| TASK-020 | Mobile Responsiveness | P0 | ⬜ Not started |
| TASK-021 | Kannada Generation | P1 | ⬜ Not started |
| TASK-022 | Anonymous Fallback | P1 | ⬜ Not started |
| TASK-023 | Production Deploy | P0 | ⬜ Not started |
| TASK-024 | README | P0 | ⬜ Not started |
| TASK-025 | DEPLOYMENT.md | P1 | ⬜ Not started |
| TASK-026 | Smoke Test | P0 | ⬜ Not started |
| TASK-027 | Image Storage | P2 | ⬜ Not started |
| TASK-028 | Guide Chart | P2 | ⬜ Not started |
| TASK-029 | Full Kannada UI | P2 | ⬜ Not started |
| TASK-030 | Voice Input | P2 | ⬜ Not started |

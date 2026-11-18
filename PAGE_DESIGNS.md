# CivicLens AI — Page Designs

**Version:** 1.0  
**Purpose:** Exact layout, component, spacing, and behavior specification for every page. All pages share one design system. Refer to SPEC.md Section 9 for design tokens.

---

## Global Rules

All pages must:
- Use `Inter` font for English text, `Noto Sans Kannada` for Kannada
- Use the color tokens from SPEC.md Section 9
- Have minimum 16px side padding on mobile, 24px on tablet, 32px+ on desktop
- Show skeleton loaders (not spinners) for content that loads from an API
- Show toast notifications top-right for all user actions (save, copy, delete)
- Never show a blank white screen — always show either content, a skeleton, or an empty state

---

## Page 1 — Landing Page (`/`)

### Layout
Full-width, single column, no sidebar. PublicLayout wrapper.

---

### Section 1.1: Navbar

```
┌─────────────────────────────────────────────────────────────────┐
│ [🏛 CivicLens AI]            [Guide] [About] [Login] [Sign Up▶] │
└─────────────────────────────────────────────────────────────────┘
```

- Height: 64px
- Background: white, border-bottom: 1px solid `--color-border`
- Position: sticky top-0, z-index 50
- Logo: icon (Lucide `MapPin` in `--color-primary`) + wordmark "CivicLens AI" in font-semibold, text-lg, `--color-navy`
- Nav links: text-sm, `--color-text-secondary`, hover `--color-primary`
- "Sign Up" button: primary filled, text-sm, px-4 py-2, rounded-full
- Mobile (< 768px): hide nav links, show hamburger (Lucide `Menu`). Clicking opens a slide-down or drawer menu with all links.

---

### Section 1.2: Hero

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│           [Background: subtle grid/civic pattern + overlay]      │
│                                                                   │
│   Understand your city.                                          │
│   Report problems. Drive change.                                 │
│                                                                   │
│   AI-powered civic complaint generation for Bengaluru            │
│   residents. Upload a photo, describe the issue, get a           │
│   professional complaint in English or Kannada.                  │
│                                                                   │
│   [▶ Report an Issue]    [Explore Features ↓]                   │
│                                                                   │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

- Min-height: 85vh on desktop, auto on mobile
- Background: `#0F172A` (dark navy) with subtle CSS grid pattern or a low-opacity image overlay
- Headline: text-4xl (desktop) / text-3xl (mobile), font-bold, text-white, leading-tight
- Subheadline: text-xl (desktop) / text-lg (mobile), text-slate-300, mt-4, max-w-xl
- CTA "Report an Issue": primary button, px-6 py-3, text-base, font-semibold, rounded-lg, `--color-primary` bg
- CTA "Explore Features": secondary ghost button (white border + white text), same sizing
- CTA row: mt-8, flex gap-4, flex-wrap
- Centered content in a max-w-6xl container, px-6

---

### Section 1.3: How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│                     How It Works                                 │
│           Three simple steps to report your issue               │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   📷  1      │  │   🤖  2      │  │   📤  3      │          │
│  │  Upload      │  │  AI Analyzes │  │  Copy &      │          │
│  │  a Photo     │  │  & Drafts    │  │  Submit      │          │
│  │              │  │  Complaint   │  │  Yourself    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

- Section: py-20, bg-white
- Section heading: text-3xl, font-bold, text-center, `--color-navy`
- Subheading: text-lg, text-center, `--color-text-secondary`, mt-2
- Cards: 3-column grid (desktop), 1-column (mobile), gap-8, mt-12
- Each card: white bg, border `--color-border`, rounded-xl, p-8, shadow-sm
  - Icon: 48px circle bg `--color-primary`/10, `--color-primary` icon, mx-auto
  - Step number: text-sm, `--color-primary`, font-semibold, mt-4
  - Title: text-xl, font-semibold, `--color-navy`, mt-2
  - Description: text-base, `--color-text-secondary`, mt-2

---

### Section 1.4: Features

```
┌─────────────────────────────────────────────────────────────────┐
│                        Features                                  │
│                                                                   │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐   │
│  │  🤖    │  │  🌐    │  │  📋    │  │  📁    │  │  🔒    │   │
│  │ AI     │  │ Bi-    │  │Verified│  │Personal│  │Privacy │   │
│  │Analysis│  │lingual │  │Guide   │  │History │  │ First  │   │
│  └────────┘  └────────┘  └────────┘  └────────┘  └────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

- Section: py-20, bg-slate-50
- 5-column grid (desktop), 2-column (tablet), 1-column (mobile)
- Each card: white bg, border, rounded-xl, p-6, shadow-sm, hover shadow-md transition
  - Icon: Lucide icon in `--color-teal`, size 32
  - Title: text-base, font-semibold, `--color-navy`, mt-3
  - Body: text-sm, `--color-text-secondary`, mt-1

---

### Section 1.5: Bengaluru Focus Banner

- Full-width strip, bg `--color-primary`, text white
- py-12, text-center
- Heading: text-2xl, font-bold
- Body: text-base, opacity-90, mt-2, max-w-2xl, mx-auto
- "Covers BBMP, BESCOM, BWSSB complaint domains"

---

### Section 1.6: Final CTA

- Section: py-20, bg-white, text-center
- Heading: text-3xl, font-bold, `--color-navy`
- Body: text-lg, `--color-text-secondary`, mt-2
- Button: primary, large (px-8 py-4), mt-8

---

### Section 1.7: Footer

```
┌─────────────────────────────────────────────────────────────────┐
│ CivicLens AI                     Home  Report  Guide  About     │
│ Understand your city.                                            │
│                                                                   │
│ ⚠️ CivicLens AI generates complaints for your personal use.     │
│    It does not submit complaints to any government authority.    │
│                                                                   │
│ © 2025 CivicLens AI                               [GitHub link] │
└─────────────────────────────────────────────────────────────────┘
```

- bg `--color-navy`, text white
- py-12, px-6
- 2-column layout (desktop): brand left, links right
- Disclaimer: text-sm, text-slate-400, border-top slate-700, pt-6, mt-6
- Link hover: text-white

---

## Page 2 — Dashboard (`/dashboard`)

### Layout
AppLayout: fixed sidebar (240px wide, desktop) + main content area.

---

### Sidebar

```
┌────────────────────┐
│ 🏛 CivicLens AI    │
├────────────────────┤
│ 📊 Dashboard       │  ← active: bg-blue-50 text-blue-600 border-r-2 blue
│ ➕ New Report       │
│ 📄 My Reports      │
│ 🗺 Civic Guide     │
│ ℹ️ About           │
├────────────────────┤
│ 👤 [User Name]     │
│ 🚪 Logout          │
└────────────────────┘
```

- Width: 240px, fixed, full height
- Background: white, border-right `--color-border`
- Logo at top: 64px header area, border-bottom
- Nav items: px-4 py-3, text-sm, flex items-center gap-3, cursor-pointer
  - Inactive: `--color-text-secondary`, hover bg-slate-50
  - Active: `--color-primary` text, bg-blue-50, font-medium, border-right 2px `--color-primary`
- User section at bottom: border-top, py-4 px-4
- Mobile: sidebar hidden, replaced by hamburger + slide-out drawer

---

### Main Content Area

**Top bar (inside main):**
- py-6 px-8
- "Welcome back, [Name] 👋" — text-2xl, font-bold, `--color-navy`
- Right: "Create New Report" button (primary)

**Stats Row:**
```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ 📋           │ │ 📝           │ │ 📤           │ │ ✅           │
│ Total Reports│ │ Drafts       │ │ Ready to     │ │ Marked       │
│     12       │ │      4       │ │ Submit  5    │ │ Submitted 3  │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

- 4-column grid (desktop), 2-column (tablet), 1-column (mobile), gap-4, mt-6
- Each card: white bg, border, rounded-xl, p-6, shadow-sm
  - Icon circle: top-right, 40px, colored bg (blue/gray/amber/green) with icon
  - Count: text-3xl, font-bold, `--color-navy`, mt-2
  - Label: text-sm, `--color-text-secondary`, mt-1
- Skeleton: 4 gray rounded-xl blocks during load

**Category Distribution:**
- 2-column layout: chart left (60%), recent reports right (40%) on desktop; stacked on mobile
- Chart card: white bg, border, rounded-xl, p-6
  - Title: "My Reports by Category", text-lg, font-semibold
  - Recharts BarChart or PieChart, responsive, 300px height
  - Colors: use a consistent set (blue-500, teal-500, amber-500, etc.)
  - X-axis: category labels (truncated if needed)
  - Y-axis: count
  - Empty state: "No reports yet" with a create CTA

**Recent Reports:**
- Card: white bg, border, rounded-xl, p-6
- Title: "Recent Reports", text-lg, font-semibold
- List of up to 5 items:
  - Each: flex row, title (truncated, flex-1), category badge, status badge, date, "View →" link
  - Hover: bg-slate-50
- "View All Reports →" link at bottom
- Empty state: Lucide `FileText` icon, "No reports yet", "Create your first report" button

---

## Page 3 — Report an Issue (`/report`)

### Layout
AppLayout (authenticated) or PublicLayout (anonymous). max-w-5xl container, mx-auto, px-6, py-8.

---

### Page Header
```
Create New Report
Report a civic issue in Bengaluru using AI assistance
```
- PageHeader component
- If anonymous: amber info banner below header:
  "You're not signed in. Your report won't be saved to your account. Sign in to save reports across devices."

---

### Two-Column Form (desktop)

```
┌─────────────────────────────────┬─────────────────────────────┐
│  STEP 1: DESCRIBE THE ISSUE     │  AI ANALYSIS (after click)  │
│                                  │                             │
│  [Image Upload Zone]            │  [Analysis Results]         │
│                                  │                             │
│  [Description textarea]         │  [Complaint Preview]        │
│                                  │                             │
│  [Locality input]               │  [Action Buttons]           │
│                                  │                             │
│  [Category select]              │                             │
│                                  │                             │
│  [Language toggle]              │                             │
│                                  │                             │
│  [🔍 Analyze with AI]           │                             │
└─────────────────────────────────┴─────────────────────────────┘
```

On mobile: single column, Step 1 above, results below.

---

### Image Upload Zone

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│          📷                                                  │
│    Drag & drop or click to upload                           │
│    JPG, PNG, WEBP — max 10 MB                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

- Border: 2px dashed `--color-border`, rounded-xl, p-10
- Background: `--color-background`
- Hover: border `--color-primary`, bg-blue-50 transition
- After upload:
  ```
  ┌──────────────┐
  │  [preview]   │  filename.jpg  ×
  │   image      │  2.4 MB
  └──────────────┘
  ```
  - Image preview: 120px × 120px, rounded-lg, object-cover
  - Remove button: Lucide `X`, text-slate-500, hover text-red-500

**Validation error:** red border, red text below: "File must be JPG, PNG, or WEBP and under 10 MB."

---

### Form Fields

Each field:
- Label: text-sm, font-medium, `--color-navy`, mb-1
- Input: full width, border `--color-border`, rounded-md, px-3 py-2, text-sm
- Focus: ring-2 ring-blue-500 ring-offset-1
- Error state: border-red-500, red text below

**Description:** Textarea, 4 rows, resize-y. Character counter bottom-right: "143 / 500"

**Locality:** Text input, placeholder "e.g. Koramangala 5th Block"

**Category:** Select dropdown
Options:
- Select a category (disabled default)
- Potholes
- Garbage and Waste
- Damaged Streetlights
- Drainage Problems
- Water Leakage
- Other Civic Infrastructure

**Language Toggle:**
```
[ English ]  [ ಕನ್ನಡ ]
```
- Pill toggle: selected = `--color-primary` bg + white text; unselected = white + border

---

### Analyze Button

- Full width on mobile, auto width on desktop
- Primary variant, text-base, py-3
- Disabled: when no image uploaded — opacity 50%, not-allowed cursor
- During analysis: shows `Spinner` + "Analyzing with AI..."

---

### AI Results (right column / below form)

Appears after successful analysis. Each panel is a Card component.

**AI Analysis Panel:**

```
┌──────────────────────────────────────────────────────────┐
│ 🤖 AI Analysis — Automatically Generated           [i]  │
├──────────────────────────────────────────────────────────┤
│ Category:     Potholes                                   │
│ Issue:        Large pothole on road surface             │
│ Urgency:      🟡 Moderate                               │
├──────────────────────────────────────────────────────────┤
│ What the AI observed:                                    │
│ • Visible road depression approximately 1-2 feet wide   │
│ • Cracked asphalt around the edges                      │
│ • No visible safety markings or barriers                │
├──────────────────────────────────────────────────────────┤
│ ⚠️ Limitations: Exact depth cannot be determined...    │
└──────────────────────────────────────────────────────────┘
```

- Card header: bg-blue-50, border-b, `--color-primary` text, flex justify-between
- `[i]` icon: tooltip "This analysis was generated by AI. It may not be fully accurate."
- Urgency: colored dot: low=green, moderate=amber, high=red, unclear=gray
- Limitations: amber bg `warning-50`, amber border-l-4, text-sm, italic

**AI Disclaimer component:** Always shown below the panel.
```
⚠️ AI-Generated Content — Review Before Use
This analysis was produced automatically. It may contain errors. 
Verify before submitting to any authority.
```
- bg-amber-50, border border-amber-200, rounded-lg, p-3, text-sm, text-amber-800

---

### Complaint Preview Panel

```
┌──────────────────────────────────────────────────────────┐
│ 📄 Generated Complaint  [EN] [ಕನ್ನಡ] badge             │
├──────────────────────────────────────────────────────────┤
│ Subject:                                                 │
│ [Complaint Regarding Dangerous Pothole — Koramangala]   │
│                                                          │
│ Complaint Body:                                          │
│ ┌────────────────────────────────────────────────────┐  │
│ │ To,                                                │  │
│ │ The Executive Engineer,                            │  │
│ │ BBMP Road Infrastructure Division,                │  │
│ │ Bengaluru.                                         │  │
│ │                                                    │  │
│ │ Sub: Complaint Regarding...                        │  │
│ │ ...                                                │  │
│ └────────────────────────────────────────────────────┘  │
│ (Editable — click to modify)                            │
└──────────────────────────────────────────────────────────┘
```

- Subject: text input (editable), border, full width
- Body: textarea (editable), min-height 200px, font-mono text-sm, border, rounded

**Action buttons row:**
```
[💾 Save Report]  [📋 Copy]  [⬇️ Download .txt]  [↺ Start Over]
```
- Save: primary
- Copy: secondary
- Download: secondary
- Start Over: ghost/text button, text-slate-500

**Post-save guidance:**
```
✅ Report saved! Visit the Civic Guide to find the right authority for submission.
```
- Green success banner, with link to /guide

---

## Page 4 — My Reports (`/reports`)

### Layout
AppLayout, max-w-6xl, mx-auto, px-6, py-8.

---

### Page Header
```
My Reports                              [+ New Report]
X reports found
```

---

### Filter Bar

```
┌────────────────────────────────────────────────────────────────┐
│ [🔍 Search reports...        ] [Category ▼] [Status ▼] [Sort ▼]│
└────────────────────────────────────────────────────────────────┘
```

- Full-width horizontal bar on desktop, stacked on mobile
- Search input: flex-1, min-width 200px
- Category, Status, Sort: select dropdowns, min-width 140px
- All inputs share same height (38px) and border style

---

### Reports List

Each report card (table row style on desktop):

```
┌──────────────────────────────────────────────────────────────────┐
│ [Category Badge] Report Title                   [Status Badge]   │
│ 📍 Koramangala   📅 Jan 15, 2025                [View] [Delete]  │
└──────────────────────────────────────────────────────────────────┘
```

- Card: white bg, border, rounded-lg, p-4, hover shadow-sm transition
- Title: text-base, font-semibold, `--color-navy`, truncate
- Meta row: text-sm, `--color-text-secondary`, flex gap-4, mt-1
- Action row: flex gap-2, mt-2 (or right-aligned on desktop)
- "View" link: text-sm, `--color-primary`
- "Delete" button: text-sm, text-red-500, hover text-red-700

**Delete Confirmation Modal:**
```
┌─────────────────────────────────────────┐
│ Delete Report                           │
│                                         │
│ Are you sure you want to delete         │
│ "Report Title"? This cannot be undone. │
│                                         │
│         [Cancel]  [Delete Report 🗑️]   │
└─────────────────────────────────────────┘
```
- Overlay: bg-black/50
- Modal: white, rounded-xl, shadow-xl, max-w-sm, p-6
- Delete button: bg-red-600, text-white

---

### Empty State

```
┌────────────────────────────────────────────┐
│                                            │
│                📄                          │
│         No reports yet                    │
│  Start by reporting your first civic      │
│  issue in Bengaluru.                      │
│                                            │
│          [Create First Report]            │
│                                            │
└────────────────────────────────────────────┘
```

- Centered in content area
- Icon: Lucide `FileText`, size 64, color slate-300
- Heading: text-xl, `--color-navy`
- Body: text-base, `--color-text-secondary`
- Button: primary

---

### Pagination

```
← Previous   Page 1 of 3   Next →
```
- Centered below list, mt-6
- Prev/Next: ghost buttons, disabled at boundaries

---

## Page 5 — Report Details (`/reports/:id`)

### Layout
AppLayout, max-w-4xl, mx-auto, px-6, py-8.

---

### Breadcrumb

```
My Reports > Pothole on 100 Feet Road
```
- text-sm, `--color-text-secondary`
- Current page: `--color-navy`, font-medium
- Separator: Lucide `ChevronRight`, size 14

---

### Report Header

```
Pothole on 100 Feet Road
[● Ready to Submit ▼]              Created Jan 15, 2025
```

- Title: text-3xl, font-bold, `--color-navy`
- Status badge: clickable dropdown to change status
  - Options: Draft, Ready to Submit, Marked Submitted, Archived
- Timestamps: text-sm, `--color-text-secondary`, mt-1

---

### Metadata Row

```
[🏷 Potholes]  [📍 Koramangala 5th Block]  [🌐 English]
```
- Flex row, gap-3, mt-4
- Each: pill with icon + text, bg-slate-100, rounded-full, px-3 py-1, text-sm

---

### Description Section

**Card:**
- Title: "Your Description", text-sm, font-semibold, `--color-text-secondary`, uppercase, tracking-wide
- Body: text-base, `--color-navy`, mt-2

---

### AI Analysis Section (collapsible)

```
▼ AI Analysis  [AI-Generated label]
```

- Collapsible with Lucide `ChevronDown`/`ChevronUp`
- Collapsed by default on mobile, expanded on desktop
- Inner content matches the analysis display from the report page

---

### Complaint Section

**Card:**
```
📄 Complaint  [EN badge]                    [Edit ✏️]
─────────────────────────────────────────────────────
Subject: Complaint Regarding Dangerous Pothole...

Body:
To,
The Executive Engineer...
─────────────────────────────────────────────────────
[📋 Copy Complaint]    [⬇️ Download .txt]
```

- Edit button: switches subject and body to editable inputs, button changes to "Save Changes"
- Copy/Download: same behavior as report page

---

### Reporting Guidance Section

**Card (amber-tinted border):**
```
🗺 Where to Submit This Complaint
─────────────────────────────────────────────────────
Responsible Agency: Bruhat Bengaluru Mahanagara Palike (BBMP)
Official Portal:    https://bbmpsmart.in/  ↗
Instructions:       Visit BBMP Smart portal and select 
                    "Complaint Registration"...

⚠️ Verified on Jan 1, 2025. Confirm current details 
   at the official website before submitting.
```
- Border: 1px solid amber-200, bg-amber-50
- Agency name: font-semibold
- Link: `--color-primary`, underline, opens new tab
- Disclaimer: text-sm, text-amber-700

---

### Danger Zone Section

```
┌───────────────────────────────────────────────────────┐
│ ⚠️ Danger Zone                                        │
│                                                        │
│ Deleting a report is permanent and cannot be undone.  │
│                                      [Delete Report]  │
└───────────────────────────────────────────────────────┘
```
- Border: 1px solid red-200, bg-red-50, rounded-xl, p-4
- Delete button: outlined red variant

---

## Page 6 — Civic Reporting Guide (`/guide`)

### Layout
PublicLayout (accessible without login), max-w-5xl, mx-auto, px-6, py-8.

---

### Page Header

```
Bengaluru Civic Reporting Guide
Verified reporting channels for common civic issues in Bengaluru
```

---

### Disclaimer Banner

```
┌──────────────────────────────────────────────────────────────────┐
│ ⚠️  Important Notice                                            │
│                                                                   │
│  This guide is maintained manually. All information was verified │
│  on the dates shown below. Official contact details and portals  │
│  may change. Always confirm on the official government website   │
│  before submitting a complaint.                                  │
│                                                                   │
│  CivicLens AI is not affiliated with any government body.        │
└──────────────────────────────────────────────────────────────────┘
```

- Full-width, bg-amber-50, border border-amber-200, rounded-xl, p-5, mb-8
- Icon: Lucide `AlertTriangle`, amber-600
- Text: text-sm, text-amber-800

---

### Category Cards

One card per issue category. 2-column grid (desktop), 1-column (mobile), gap-6.

```
┌──────────────────────────────────────────────────────┐
│ 🕳️  Potholes                      ✓ Verified        │
├──────────────────────────────────────────────────────┤
│ Responsible Agency                                    │
│ Bruhat Bengaluru Mahanagara Palike (BBMP)            │
│                                                       │
│ Official Portal                                       │
│ 🔗 https://bbmpsmart.in/                             │
│                                                       │
│ How to Report                                         │
│ 1. Visit the BBMP Smart portal                       │
│ 2. Select "Complaint Registration"                   │
│ 3. Fill in the form with photo and location          │
│ 4. Note your complaint reference number              │
│                                                       │
│ Last verified: January 1, 2025                       │
└──────────────────────────────────────────────────────┘
```

- Card: white bg, border, rounded-xl, p-6, shadow-sm
- Header: flex between category name and verified badge
  - Verified badge: green-100 text-green-700, text-xs, Lucide `CheckCircle2` icon
  - Unverified: amber-100 text-amber-700, "⚠️ Unverified"
- Agency: label text-xs uppercase tracking-wide `--color-text-secondary`, value text-sm font-semibold `--color-navy`
- Link: text-sm, `--color-primary`, underline, with Lucide `ExternalLink` 12px icon
- Instructions: numbered list, text-sm, `--color-text-secondary`, space-y-1
- Verified date: text-xs, text-slate-400, mt-4, border-t pt-3

---

### Bottom Disclaimer

Same disclaimer text as top, full-width, bottom of page.

---

## Page 7 — About (`/about`)

### Layout
PublicLayout, max-w-3xl, mx-auto, px-6, py-12. Prose-heavy layout.

---

### Structure

Each section is a `<section>` with:
- Section heading: text-2xl, font-bold, `--color-navy`, mb-4
- Body: text-base, `--color-text-secondary`, space-y-3, leading-relaxed

Sections:
1. **Our Mission** — 2 short paragraphs
2. **The Problem We're Solving** — 3-4 sentences with Bengaluru context
3. **How AI is Used** — includes explicit statement: "The AI generates complaint text. It does not submit anything to any government system."
4. **Built for Bengaluru** — BBMP, BWSSB, BESCOM scope
5. **Technology** — small logo grid: React, FastAPI, Gemini, Supabase
6. **Privacy** — what is stored, user owns data, no third-party data sale
7. **Limitations** — 3-bullet list: AI accuracy, Kannada quality, guide staleness

---

## Page 8 — Login (`/login`)

### Layout
PublicLayout, centered card, max-w-sm, mx-auto, px-6, py-16.

---

### Card

```
┌────────────────────────────────────────┐
│          🏛 CivicLens AI               │
│         Sign in to your account        │
│                                        │
│  Email                                 │
│  [email@example.com              ]     │
│                                        │
│  Password                              │
│  [••••••••                       ]     │
│                                        │
│  [        Sign In         ]           │
│                                        │
│  Don't have an account? Sign up →      │
└────────────────────────────────────────┘
```

- Card: white bg, border, rounded-2xl, shadow-lg, p-8
- Logo + name: centered, mb-6
- Form fields: full width, space-y-4
- Error banner (if login fails): bg-red-50, border-red-200, text-red-700, text-sm, rounded-lg, p-3, flex gap-2 with Lucide `AlertCircle`
- Sign In button: full width, primary
- Link: text-sm, text-center, mt-4, `--color-primary`

---

## Page 9 — Signup (`/signup`)

### Layout
Same card pattern as Login.

---

### Card

```
┌────────────────────────────────────────┐
│          🏛 CivicLens AI               │
│          Create your account           │
│                                        │
│  Full Name                             │
│  [Your name                      ]     │
│                                        │
│  Email                                 │
│  [email@example.com              ]     │
│                                        │
│  Password                              │
│  [••••••••                       ]     │
│  Must be at least 8 characters         │
│                                        │
│  Confirm Password                      │
│  [••••••••                       ]     │
│                                        │
│  [     Create Account      ]          │
│                                        │
│  Already have an account? Sign in →    │
└────────────────────────────────────────┘
```

- Password strength: text-xs below field indicating length requirement
- Confirm password error: "Passwords do not match" in red-500 if mismatch
- After successful signup: redirect to /dashboard (or show "Check your email" if email confirmation enabled)

---

## Component Behavior Reference

### Toast Notifications

Position: fixed top-4 right-4, z-50  
Stack vertically with 8px gap  
Animation: slide in from right, fade out after 3s  
Max 3 visible at once; oldest dismissed first

Variants:
```
✅ Success  — bg-green-600 text-white
❌ Error    — bg-red-600 text-white
ℹ️ Info     — bg-blue-600 text-white
⚠️ Warning  — bg-amber-600 text-white
```
Each: rounded-lg, px-4 py-3, shadow-lg, flex items-center gap-3, min-width 280px

---

### Skeleton Loaders

Match the shape and size of the content they replace.

StatCard skeleton:
```
┌──────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  ← h-4 rounded animate-pulse
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓           │  ← h-8 w-16
│ ▓▓▓▓▓▓▓▓▓▓▓▓                 │  ← h-3 w-24
└──────────────────────────────┘
```

ReportCard skeleton: 2 lines of varying width, plus 2 small pill shapes.

---

### Empty States

All empty states use the same structure:
1. Lucide icon, 64px, text-slate-300
2. Heading: text-xl, font-semibold, `--color-navy`, mt-4
3. Body: text-base, `--color-text-secondary`, mt-2, max-w-xs, text-center
4. CTA button (optional): primary, mt-6

---

### Mobile Breakpoints

- Mobile: < 640px (sm)
- Tablet: 640px–1024px (md–lg)
- Desktop: > 1024px (lg+)

Sidebar: hidden below lg, replaced by hamburger drawer.  
Grid columns: 1 on mobile, 2 on tablet, configured per section above.  
Font sizes: reduce by one step (e.g., text-4xl → text-3xl) on mobile.

---

## Visual Consistency Checklist

Before implementing each page, verify:
- [ ] Uses design tokens from SPEC.md Section 9 (no hardcoded hex values)
- [ ] All cards use the same Card component (not div-with-class-copies)
- [ ] Spacing follows the 4px base unit (Tailwind scale)
- [ ] Buttons match the Button component variants exactly
- [ ] All form fields use the same Input/Select/Textarea components
- [ ] Loading states use Skeleton components (not bare spinners)
- [ ] Empty states use the EmptyState component
- [ ] AI-generated content is wrapped in the AIDisclaimer component
- [ ] Errors use the ErrorMessage component (not raw red text)
- [ ] All pages are tested at 375px width before marking done

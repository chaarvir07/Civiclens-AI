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
  preferred_language TEXT NOT NULL DEFAULT 'en'
    CHECK (preferred_language IN ('en', 'kn')),
  ai_analysis JSONB,
  complaint_subject TEXT,
  complaint_body TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reports_user_id    ON public.reports(user_id);
CREATE INDEX idx_reports_status     ON public.reports(status);
CREATE INDEX idx_reports_category   ON public.reports(category);
CREATE INDEX idx_reports_created_at ON public.reports(created_at DESC);

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

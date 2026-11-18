-- Seed data: Bengaluru civic reporting resources
-- Verified January 2025. Re-verify quarterly.

INSERT INTO public.reporting_resources
  (issue_category, agency_name, official_url, reporting_instructions, source_url, verified_at)
VALUES
(
  'potholes',
  'Bruhat Bengaluru Mahanagara Palike (BBMP)',
  'https://bbmpsmart.in/',
  E'1. Visit https://bbmpsmart.in/\n2. Click "Complaint Registration"\n3. Select category "Roads"\n4. Upload a photo and describe the pothole location\n5. Submit and note your complaint reference number\n\nAlternatively, call BBMP Helpline: 1533',
  'https://bbmp.gov.in/',
  '2025-01-01'
),
(
  'garbage_and_waste',
  'Bruhat Bengaluru Mahanagara Palike (BBMP) — Solid Waste Management',
  'https://bbmpsmart.in/',
  E'1. Visit https://bbmpsmart.in/\n2. Select "Solid Waste Management" complaint type\n3. Describe the issue (missed collection, illegal dumping, overflowing bin)\n4. Add photo evidence and your location\n5. Submit and save your complaint number\n\nHelpline: 1533',
  'https://bbmp.gov.in/solidwaste',
  '2025-01-01'
),
(
  'damaged_streetlights',
  'Bruhat Bengaluru Mahanagara Palike (BBMP) — Electrical Wing',
  'https://bbmpsmart.in/',
  E'1. Visit https://bbmpsmart.in/\n2. Select "Street Light Complaint"\n3. Provide the pole number if visible on the streetlight pole\n4. Add the nearest landmark and your location\n5. Submit the complaint\n\nHelpline: 1533',
  'https://bbmp.gov.in/',
  '2025-01-01'
),
(
  'drainage_problems',
  'Bruhat Bengaluru Mahanagara Palike (BBMP) — Storm Water Drain Division',
  'https://bbmpsmart.in/',
  E'1. Visit https://bbmpsmart.in/\n2. Select "Storm Water Drain" complaint category\n3. Describe the blockage or overflow with photo\n4. Provide GPS location or nearest landmark\n5. Submit and note the complaint ID\n\nFor flooding emergencies: call 1533 immediately',
  'https://bbmp.gov.in/',
  '2025-01-01'
),
(
  'water_leakage',
  'Bangalore Water Supply and Sewerage Board (BWSSB)',
  'https://bwssb.gov.in/',
  E'1. Call BWSSB Helpline: 1916 (available 24x7)\n2. Or visit https://bwssb.gov.in/ and click "Register Complaint"\n3. Select complaint type: Pipe Leakage / Water Wastage\n4. Provide your area, nearest landmark, and contact number\n5. Have your property/consumer account number ready if available\n\nFor sewerage overflow: also call 1916',
  'https://bwssb.gov.in/',
  '2025-01-01'
),
(
  'other',
  'Bruhat Bengaluru Mahanagara Palike (BBMP)',
  'https://bbmpsmart.in/',
  E'1. Visit https://bbmpsmart.in/\n2. Select the most relevant complaint category\n3. If unsure, use the "General Civic Complaint" option\n4. Describe the issue clearly with photo and location\n5. Submit and note your complaint reference number\n\nHelpline: 1533',
  'https://bbmp.gov.in/',
  '2025-01-01'
);

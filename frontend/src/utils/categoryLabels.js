export const CATEGORY_LABELS = {
  potholes: 'Potholes',
  garbage_and_waste: 'Garbage & Waste',
  damaged_streetlights: 'Damaged Streetlights',
  drainage_problems: 'Drainage Problems',
  water_leakage: 'Water Leakage',
  other: 'Other',
}

export const CATEGORY_COLORS = {
  potholes: '#2563EB',
  garbage_and_waste: '#059669',
  damaged_streetlights: '#D97706',
  drainage_problems: '#0D9488',
  water_leakage: '#7C3AED',
  other: '#64748B',
}

export const CATEGORY_OPTIONS = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
  value,
  label,
}))

export const STATUS_LABELS = {
  draft: 'Draft',
  ready_to_submit: 'Ready to Submit',
  marked_submitted: 'Marked Submitted',
  archived: 'Archived',
}

export const STATUS_OPTIONS = Object.entries(STATUS_LABELS).map(([value, label]) => ({
  value,
  label,
}))

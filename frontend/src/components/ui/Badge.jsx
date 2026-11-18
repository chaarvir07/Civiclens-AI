import { CATEGORY_LABELS } from '../../utils/categoryLabels'

const STATUS_STYLES = {
  draft: 'bg-slate-100 text-slate-700',
  ready_to_submit: 'bg-amber-100 text-amber-700',
  marked_submitted: 'bg-emerald-100 text-emerald-700',
  archived: 'bg-slate-200 text-slate-500',
}

const CATEGORY_STYLES = {
  potholes: 'bg-blue-100 text-blue-700',
  garbage_and_waste: 'bg-emerald-100 text-emerald-700',
  damaged_streetlights: 'bg-amber-100 text-amber-700',
  drainage_problems: 'bg-teal-100 text-teal-700',
  water_leakage: 'bg-violet-100 text-violet-700',
  other: 'bg-slate-100 text-slate-700',
}

const STATUS_LABELS = {
  draft: 'Draft',
  ready_to_submit: 'Ready to Submit',
  marked_submitted: 'Marked Submitted',
  archived: 'Archived',
}

export function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status] || 'bg-slate-100 text-slate-700'}`}>
      {STATUS_LABELS[status] || status}
    </span>
  )
}

export function CategoryBadge({ category }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${CATEGORY_STYLES[category] || 'bg-slate-100 text-slate-700'}`}>
      {CATEGORY_LABELS[category] || category}
    </span>
  )
}

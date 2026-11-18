import { Search } from 'lucide-react'
import Select from '../ui/Select'
import { CATEGORY_OPTIONS, STATUS_OPTIONS } from '../../utils/categoryLabels'

const SORT_OPTIONS = [
  { value: 'created_at:desc', label: 'Newest First' },
  { value: 'created_at:asc', label: 'Oldest First' },
]

export default function FilterBar({ filters, onChange }) {
  const update = (key, value) => onChange({ ...filters, [key]: value })

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <div className="relative flex-1 min-w-[180px]">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          className="w-full border border-slate-200 rounded-md pl-9 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          placeholder="Search reports..."
          value={filters.search || ''}
          onChange={(e) => update('search', e.target.value)}
        />
      </div>
      <Select
        options={[{ value: '', label: 'All Categories' }, ...CATEGORY_OPTIONS]}
        value={filters.category || ''}
        onChange={(e) => update('category', e.target.value)}
        className="min-w-[160px]"
      />
      <Select
        options={[{ value: '', label: 'All Statuses' }, ...STATUS_OPTIONS]}
        value={filters.status || ''}
        onChange={(e) => update('status', e.target.value)}
        className="min-w-[150px]"
      />
      <Select
        options={SORT_OPTIONS}
        value={filters.sort || 'created_at:desc'}
        onChange={(e) => update('sort', e.target.value)}
        className="min-w-[140px]"
      />
    </div>
  )
}

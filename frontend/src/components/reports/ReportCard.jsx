import { Link } from 'react-router-dom'
import { MapPin, Calendar, Trash2, Eye } from 'lucide-react'
import { StatusBadge, CategoryBadge } from '../ui/Badge'
import { formatDate } from '../../utils/formatDate'

export default function ReportCard({ report, onDelete }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-card-hover transition-shadow">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <CategoryBadge category={report.category} />
            <StatusBadge status={report.status} />
          </div>
          <h3 className="font-semibold text-slate-900 text-sm truncate">{report.title}</h3>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
            {report.locality && (
              <span className="flex items-center gap-1">
                <MapPin size={11} /> {report.locality}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar size={11} /> {formatDate(report.created_at)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={`/reports/${report.id}`}
            className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            <Eye size={13} /> View
          </Link>
          <button
            onClick={() => onDelete(report)}
            className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  )
}

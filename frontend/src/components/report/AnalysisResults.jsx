import { Bot, AlertTriangle } from 'lucide-react'
import Card from '../ui/Card'
import AIDisclaimer from '../ui/AIDisclaimer'
import { CATEGORY_LABELS } from '../../utils/categoryLabels'

const URGENCY_STYLES = {
  low: 'text-emerald-600',
  moderate: 'text-amber-600',
  high: 'text-red-600',
  unclear: 'text-slate-500',
}

const URGENCY_DOTS = {
  low: 'bg-emerald-500',
  moderate: 'bg-amber-500',
  high: 'bg-red-500',
  unclear: 'bg-slate-400',
}

export default function AnalysisResults({ analysis }) {
  if (!analysis) return null

  return (
    <div className="space-y-3">
      <Card padding="md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bot size={16} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-900 text-sm">AI Analysis</h3>
          </div>
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">Auto-generated</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Category</p>
            <p className="text-sm font-medium text-slate-800">{CATEGORY_LABELS[analysis.detected_category] || analysis.detected_category}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Urgency</p>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${URGENCY_DOTS[analysis.urgency_estimate]}`} />
              <p className={`text-sm font-medium capitalize ${URGENCY_STYLES[analysis.urgency_estimate]}`}>
                {analysis.urgency_estimate}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">Issue</p>
          <p className="text-sm font-medium text-slate-800">{analysis.issue_title}</p>
        </div>

        <div className="mb-3">
          <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">What the AI observed</p>
          <ul className="space-y-1">
            {(analysis.visual_observations || []).map((obs, i) => (
              <li key={i} className="text-sm text-slate-700 flex items-start gap-2">
                <span className="text-blue-400 mt-1 shrink-0">•</span>
                {obs}
              </li>
            ))}
          </ul>
        </div>

        {analysis.limitations && (
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-3">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Limitations</p>
            <p className="text-sm text-amber-800 italic">{analysis.limitations}</p>
          </div>
        )}
      </Card>
      <AIDisclaimer />
    </div>
  )
}

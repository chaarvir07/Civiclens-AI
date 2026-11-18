import { useEffect, useState } from 'react'
import { ExternalLink, CheckCircle, AlertTriangle } from 'lucide-react'
import PublicLayout from '../components/layout/PublicLayout'
import SkeletonCard from '../components/ui/SkeletonCard'
import api from '../services/api'

const CATEGORY_ICONS = {
  potholes: '🕳️', garbage_and_waste: '🗑️', damaged_streetlights: '💡',
  drainage_problems: '🌊', water_leakage: '💧', other: '🏙️',
}

export default function Guide() {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/reporting-resources')
      .then(r => setResources(r.data.resources || []))
      .finally(() => setLoading(false))
  }, [])

  return (
    <PublicLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Bengaluru Civic Reporting Guide</h1>
          <p className="text-slate-500 mt-2">Verified reporting channels for common civic issues</p>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10 flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p className="font-semibold mb-1">Important Notice</p>
            <p>This guide is maintained manually. All information was verified on the dates shown. Official contact details and portals may change — always confirm on the official government website before submitting a complaint.</p>
            <p className="mt-1 font-medium">CivicLens AI is not affiliated with BBMP, BESCOM, BWSSB, or any government body.</p>
          </div>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">{Array(6).fill(0).map((_,i)=><SkeletonCard key={i} lines={5}/>)}</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map(r => (
              <div key={r.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{CATEGORY_ICONS[r.issue_category] || '🏙️'}</span>
                    <h3 className="font-semibold text-slate-900 capitalize">{r.issue_category.replace(/_/g,' ')}</h3>
                  </div>
                  {r.verified_at ? (
                    <span className="flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                      <CheckCircle size={11}/> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                      <AlertTriangle size={11}/> Unverified
                    </span>
                  )}
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Responsible Agency</p>
                    <p className="font-medium text-slate-800">{r.agency_name}</p>
                  </div>
                  {r.official_url && (
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Official Portal</p>
                      <a href={r.official_url} target="_blank" rel="noopener noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center gap-1 text-sm">
                        {r.official_url} <ExternalLink size={11}/>
                      </a>
                    </div>
                  )}
                  {r.reporting_instructions && (
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">How to Report</p>
                      <pre className="text-slate-600 whitespace-pre-wrap text-xs leading-relaxed">{r.reporting_instructions}</pre>
                    </div>
                  )}
                  {r.verified_at && (
                    <p className="text-xs text-slate-400 border-t border-slate-100 pt-3 mt-2">Last verified: {r.verified_at}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom disclaimer */}
        <div className="mt-10 bg-slate-100 rounded-xl p-5 text-sm text-slate-500 text-center">
          CivicLens AI is not affiliated with BBMP, BESCOM, BWSSB, or any government body. Links are provided for convenience and may change without notice.
        </div>
      </div>
    </PublicLayout>
  )
}

import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FileText, Edit3, Send, CheckCircle, PlusCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AppLayout from '../components/layout/AppLayout'
import StatCard from '../components/dashboard/StatCard'
import CategoryChart from '../components/dashboard/CategoryChart'
import { StatusBadge, CategoryBadge } from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'
import SkeletonCard from '../components/ui/SkeletonCard'
import Button from '../components/ui/Button'
import { formatDate } from '../utils/formatDate'
import api from '../services/api'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'there'

  useEffect(() => {
    api.get('/api/reports?limit=50')
      .then(r => setReports(r.data.reports || []))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const counts = {
    total: reports.length,
    draft: reports.filter(r => r.status === 'draft').length,
    ready: reports.filter(r => r.status === 'ready_to_submit').length,
    submitted: reports.filter(r => r.status === 'marked_submitted').length,
  }

  const recent = [...reports].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5)

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome back, {displayName} 👋</h1>
            <p className="text-slate-500 text-sm mt-1">Here's your civic reporting activity</p>
          </div>
          <Button onClick={() => navigate('/report')}>
            <PlusCircle size={16} /> New Report
          </Button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {loading ? (
            Array(4).fill(0).map((_, i) => <SkeletonCard key={i} lines={3} />)
          ) : (
            <>
              <StatCard title="Total Reports" count={counts.total} icon={FileText} colorClass="bg-blue-100 text-blue-600" />
              <StatCard title="Drafts" count={counts.draft} icon={Edit3} colorClass="bg-slate-100 text-slate-600" />
              <StatCard title="Ready to Submit" count={counts.ready} icon={Send} colorClass="bg-amber-100 text-amber-600" />
              <StatCard title="Marked Submitted" count={counts.submitted} icon={CheckCircle} colorClass="bg-emerald-100 text-emerald-600" />
            </>
          )}
        </div>

        {/* Chart + Recent */}
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            {loading ? <SkeletonCard lines={6} /> : <CategoryChart reports={reports} />}
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Recent Reports</h3>
                <Link to="/reports" className="text-xs text-blue-600 hover:underline">View all →</Link>
              </div>
              {loading ? (
                <div className="space-y-3">{Array(3).fill(0).map((_, i) => <SkeletonCard key={i} lines={2} />)}</div>
              ) : recent.length === 0 ? (
                <EmptyState
                  icon={FileText}
                  title="No reports yet"
                  description="Create your first report to get started."
                  action={{ label: 'Create Report', onClick: () => navigate('/report') }}
                />
              ) : (
                <div className="space-y-3">
                  {recent.map(r => (
                    <Link key={r.id} to={`/reports/${r.id}`} className="block hover:bg-slate-50 rounded-lg p-2 -mx-2 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">{r.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <CategoryBadge category={r.category} />
                            <span className="text-xs text-slate-400">{formatDate(r.created_at)}</span>
                          </div>
                        </div>
                        <StatusBadge status={r.status} />
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
      </div>
    </AppLayout>
  )
}

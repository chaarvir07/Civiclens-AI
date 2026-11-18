import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlusCircle, FileText } from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'
import ReportCard from '../components/reports/ReportCard'
import FilterBar from '../components/reports/FilterBar'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import SkeletonCard from '../components/ui/SkeletonCard'
import EmptyState from '../components/ui/EmptyState'
import { useToast } from '../context/ToastContext'
import api from '../services/api'

export default function ReportList() {
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [reports, setReports] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({ search: '', category: '', status: '', sort: 'created_at:desc' })
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const fetchReports = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: 10, sort: filters.sort })
      if (filters.category) params.set('category', filters.category)
      if (filters.status) params.set('status', filters.status)
      const { data } = await api.get(`/api/reports?${params}`)
      let list = data.reports || []
      if (filters.search) {
        const q = filters.search.toLowerCase()
        list = list.filter(r => r.title?.toLowerCase().includes(q) || r.locality?.toLowerCase().includes(q))
      }
      setReports(list)
      setTotal(data.total || 0)
    } catch (e) {
      showToast(e.message, 'error')
    } finally {
      setLoading(false)
    }
  }, [page, filters])

  useEffect(() => { fetchReports() }, [fetchReports])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await api.delete(`/api/reports/${deleteTarget.id}`)
      showToast('Report deleted.', 'success')
      setDeleteTarget(null)
      fetchReports()
    } catch (e) {
      showToast(e.message, 'error')
    } finally {
      setDeleting(false)
    }
  }

  const totalPages = Math.ceil(total / 10)

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Reports</h1>
            {!loading && <p className="text-sm text-slate-500 mt-1">{total} report{total !== 1 ? 's' : ''}</p>}
          </div>
          <Button onClick={() => navigate('/report')}><PlusCircle size={15} /> New Report</Button>
        </div>

        <FilterBar filters={filters} onChange={f => { setFilters(f); setPage(1) }} />

        {loading ? (
          <div className="space-y-3">{Array(5).fill(0).map((_, i) => <SkeletonCard key={i} lines={3} />)}</div>
        ) : reports.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No reports found"
            description={filters.search || filters.category || filters.status ? 'Try adjusting your filters.' : 'Start by creating your first civic issue report.'}
            action={!filters.search && !filters.category && !filters.status ? { label: 'Create First Report', onClick: () => navigate('/report') } : undefined}
          />
        ) : (
          <>
            <div className="space-y-3">
              {reports.map(r => <ReportCard key={r.id} report={r} onDelete={setDeleteTarget} />)}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button variant="secondary" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Previous</Button>
                <span className="text-sm text-slate-600">Page {page} of {totalPages}</span>
                <Button variant="secondary" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next →</Button>
              </div>
            )}
          </>
        )}
      </div>

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Report"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete} loading={deleting}>Delete Report</Button>
          </>
        }
      >
        <p>Are you sure you want to delete <strong>"{deleteTarget?.title}"</strong>? This cannot be undone.</p>
      </Modal>
    </AppLayout>
  )
}

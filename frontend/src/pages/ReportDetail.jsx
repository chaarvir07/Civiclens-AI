import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ChevronRight, Copy, Download, Edit2, Save, Trash2, ChevronDown, ChevronUp, ExternalLink, CheckCircle } from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { StatusBadge, CategoryBadge } from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import AIDisclaimer from '../components/ui/AIDisclaimer'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import SkeletonCard from '../components/ui/SkeletonCard'
import ErrorMessage from '../components/ui/ErrorMessage'
import { useToast } from '../context/ToastContext'
import { formatDateTime } from '../utils/formatDate'
import { downloadTextFile } from '../utils/downloadText'
import { CATEGORY_LABELS, STATUS_OPTIONS } from '../utils/categoryLabels'
import api from '../services/api'

export default function ReportDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(false)
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [saving, setSaving] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [guidance, setGuidance] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.get(`/api/reports/${id}`)
      .then(r => {
        setReport(r.data)
        setSubject(r.data.complaint_subject || '')
        setBody(r.data.complaint_body || '')
        return api.get(`/api/reporting-resources?category=${r.data.category}`)
      })
      .then(r => setGuidance(r.data.resources?.[0] || null))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  const handleStatusChange = async (newStatus) => {
    try {
      const { data } = await api.patch(`/api/reports/${id}`, { status: newStatus })
      setReport(data)
      showToast('Status updated.', 'success')
    } catch (e) {
      showToast(e.message, 'error')
    }
  }

  const handleSaveEdit = async () => {
    setSaving(true)
    try {
      const { data } = await api.patch(`/api/reports/${id}`, { complaint_subject: subject, complaint_body: body })
      setReport(data)
      setEditing(false)
      showToast('Complaint updated.', 'success')
    } catch (e) {
      showToast(e.message, 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`)
      showToast('Copied to clipboard!', 'success')
    } catch { showToast('Could not copy — select and copy manually.', 'warning') }
  }

  const handleDownload = () => {
    downloadTextFile(`Subject: ${subject}\n\n${body}`, report.preferred_language === 'kn' ? 'complaint_kn.txt' : 'complaint.txt')
    showToast('Downloaded!', 'success')
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      await api.delete(`/api/reports/${id}`)
      showToast('Report deleted.', 'success')
      navigate('/reports')
    } catch (e) {
      showToast(e.message, 'error')
      setDeleting(false)
    }
  }

  if (loading) return <AppLayout><div className="max-w-3xl mx-auto px-6 py-8 space-y-4">{[1,2,3].map(i=><SkeletonCard key={i} lines={4}/>)}</div></AppLayout>
  if (error) return <AppLayout><div className="max-w-3xl mx-auto px-6 py-8"><ErrorMessage message={error}/></div></AppLayout>
  if (!report) return null

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-sm text-slate-500">
          <Link to="/reports" className="hover:text-blue-600">My Reports</Link>
          <ChevronRight size={14} />
          <span className="text-slate-800 font-medium truncate max-w-xs">{report.title}</span>
        </div>

        {/* Header */}
        <div>
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <h1 className="text-2xl font-bold text-slate-900 flex-1">{report.title}</h1>
            <select
              value={report.status}
              onChange={e => handleStatusChange(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {STATUS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <CategoryBadge category={report.category} />
            <StatusBadge status={report.status} />
            {report.locality && <span>📍 {report.locality}</span>}
            <span>Created {formatDateTime(report.created_at)}</span>
          </div>
        </div>

        {/* Description */}
        {report.description && (
          <Card>
            <p className="text-xs uppercase tracking-wide text-slate-400 font-medium mb-2">Your Description</p>
            <p className="text-sm text-slate-700 leading-relaxed">{report.description}</p>
          </Card>
        )}

        {/* AI Analysis collapsible */}
        {report.ai_analysis && (
          <Card padding="md">
            <button className="flex items-center justify-between w-full" onClick={() => setShowAnalysis(!showAnalysis)}>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 text-sm">AI Analysis</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Auto-generated</span>
              </div>
              {showAnalysis ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
            </button>
            {showAnalysis && (
              <div className="mt-4 space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div><p className="text-xs text-slate-400 uppercase mb-1">Category</p><p className="font-medium">{CATEGORY_LABELS[report.ai_analysis.detected_category]}</p></div>
                  <div><p className="text-xs text-slate-400 uppercase mb-1">Urgency</p><p className="font-medium capitalize">{report.ai_analysis.urgency_estimate}</p></div>
                </div>
                {report.ai_analysis.visual_observations?.length > 0 && (
                  <div>
                    <p className="text-xs text-slate-400 uppercase mb-1">Observations</p>
                    <ul className="space-y-1">{report.ai_analysis.visual_observations.map((o,i)=><li key={i} className="flex gap-2"><span className="text-blue-400">•</span>{o}</li>)}</ul>
                  </div>
                )}
                {report.ai_analysis.limitations && (
                  <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded text-amber-800 italic text-xs">{report.ai_analysis.limitations}</div>
                )}
                <AIDisclaimer/>
              </div>
            )}
          </Card>
        )}

        {/* Complaint */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900 text-sm">Complaint</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${report.preferred_language==='kn'?'bg-violet-100 text-violet-700':'bg-blue-100 text-blue-700'}`}>
                {report.preferred_language==='kn'?'ಕನ್ನಡ':'English'}
              </span>
            </div>
            {!editing && <Button variant="ghost" size="sm" onClick={()=>setEditing(true)}><Edit2 size={13}/> Edit</Button>}
          </div>

          {editing ? (
            <div className="space-y-3">
              <Input label="Subject" value={subject} onChange={e=>setSubject(e.target.value)}/>
              <Textarea label="Body" value={body} onChange={e=>setBody(e.target.value)} rows={10} className={report.preferred_language==='kn'?'font-kannada':''}/>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSaveEdit} loading={saving}><Save size={13}/> Save Changes</Button>
                <Button size="sm" variant="ghost" onClick={()=>{setEditing(false);setSubject(report.complaint_subject||'');setBody(report.complaint_body||'')}}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {subject && <div><p className="text-xs text-slate-400 uppercase mb-1">Subject</p><p className="text-sm font-medium text-slate-800">{subject}</p></div>}
              {body && <div><p className="text-xs text-slate-400 uppercase mb-1">Body</p><pre className={`text-sm text-slate-700 whitespace-pre-wrap leading-relaxed ${report.preferred_language==='kn'?'font-kannada':''}`}>{body}</pre></div>}
              <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
                <Button variant="secondary" size="sm" onClick={handleCopy}><Copy size={13}/> Copy</Button>
                <Button variant="secondary" size="sm" onClick={handleDownload}><Download size={13}/> Download</Button>
              </div>
            </div>
          )}
        </Card>

        {/* Reporting guidance */}
        {guidance && (
          <div className="border border-amber-200 bg-amber-50 rounded-xl p-5">
            <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2 text-sm"><CheckCircle size={15} className="text-amber-600"/> Where to Submit This Complaint</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-slate-500">Agency:</span> <span className="font-medium text-slate-800">{guidance.agency_name}</span></p>
              {guidance.official_url && (
                <p><span className="text-slate-500">Portal:</span>{' '}
                  <a href={guidance.official_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center gap-1">
                    {guidance.official_url}<ExternalLink size={11}/>
                  </a>
                </p>
              )}
              {guidance.reporting_instructions && (
                <div className="mt-3">
                  <p className="text-slate-500 mb-1">How to report:</p>
                  <pre className="text-slate-700 whitespace-pre-wrap text-xs leading-relaxed">{guidance.reporting_instructions}</pre>
                </div>
              )}
              {guidance.verified_at && (
                <p className="text-xs text-amber-700 mt-3 pt-2 border-t border-amber-200">⚠️ Verified on {guidance.verified_at}. Confirm current details at the official website before submitting.</p>
              )}
            </div>
          </div>
        )}

        {/* Danger zone */}
        <div className="border border-red-200 bg-red-50 rounded-xl p-5 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-sm text-slate-900">Delete this report</p>
            <p className="text-xs text-slate-500 mt-0.5">This is permanent and cannot be undone.</p>
          </div>
          <Button variant="danger-outline" size="sm" onClick={()=>setDeleteOpen(true)}><Trash2 size={13}/> Delete</Button>
        </div>
      </div>

      <Modal isOpen={deleteOpen} onClose={()=>setDeleteOpen(false)} title="Delete Report"
        footer={<><Button variant="ghost" onClick={()=>setDeleteOpen(false)}>Cancel</Button><Button variant="danger" onClick={handleDelete} loading={deleting}>Delete</Button></>}>
        <p>Are you sure you want to delete <strong>"{report.title}"</strong>? This cannot be undone.</p>
      </Modal>
    </AppLayout>
  )
}

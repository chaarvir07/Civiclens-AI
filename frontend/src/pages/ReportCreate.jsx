import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, RotateCcw, Save, BookOpen } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import AppLayout from '../components/layout/AppLayout'
import PublicLayout from '../components/layout/PublicLayout'
import ImageUpload from '../components/report/ImageUpload'
import LanguageToggle from '../components/report/LanguageToggle'
import AnalysisResults from '../components/report/AnalysisResults'
import ComplaintPreview from '../components/report/ComplaintPreview'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Textarea from '../components/ui/Textarea'
import Select from '../components/ui/Select'
import ErrorMessage from '../components/ui/ErrorMessage'
import { CATEGORY_OPTIONS } from '../utils/categoryLabels'
import api from '../services/api'

export default function ReportCreate() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [image, setImage] = useState(null)
  const [description, setDescription] = useState('')
  const [locality, setLocality] = useState('')
  const [category, setCategory] = useState('')
  const [language, setLanguage] = useState('en')
  const [analysis, setAnalysis] = useState(null)
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [analyzeError, setAnalyzeError] = useState('')
  const [saved, setSaved] = useState(false)

  const handleAnalyze = async () => {
    if (!image) return
    setAnalyzeError('')
    setAnalyzing(true)
    setAnalysis(null)
    setSaved(false)
    try {
      const form = new FormData()
      form.append('image', image)
      if (description) form.append('description', description)
      if (category) form.append('category', category)
      if (locality) form.append('locality', locality)
      form.append('language', language)
      const { data } = await api.post('/api/analyze', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setAnalysis(data)
      setSubject(data.complaint_subject || '')
      setBody(data.complaint_body || '')
    } catch (err) {
      setAnalyzeError(err.message || 'AI analysis failed. Please try again.')
    } finally {
      setAnalyzing(false)
    }
  }

  const handleSave = async () => {
    if (!user) { showToast('Sign in to save reports.', 'info'); navigate('/login?redirect=/report'); return }
    if (!analysis) return
    setSaving(true)
    try {
      const payload = {
        title: analysis.issue_title || subject || 'Civic Issue Report',
        category: analysis.detected_category || category || 'other',
        description,
        locality,
        preferred_language: language,
        ai_analysis: analysis,
        complaint_subject: subject,
        complaint_body: body,
        status: 'draft',
      }
      const { data } = await api.post('/api/reports', payload)
      showToast('Report saved!', 'success')
      setSaved(true)
      navigate(`/reports/${data.id}`)
    } catch (err) {
      showToast(err.message || 'Could not save report.', 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setImage(null); setDescription(''); setLocality(''); setCategory('')
    setLanguage('en'); setAnalysis(null); setSubject(''); setBody('')
    setAnalyzeError(''); setSaved(false)
  }

  const Layout = user ? AppLayout : PublicLayout

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Report an Issue</h1>
          <p className="text-slate-500 text-sm mt-1">Upload a photo of a civic problem in Bengaluru and get an AI-generated complaint.</p>
        </div>

        {!user && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-sm text-blue-800 flex items-center gap-2">
            <span>ℹ️</span>
            <span>You're browsing as a guest. <a href="/login" className="font-medium underline">Sign in</a> to save reports across devices.</span>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left — inputs */}
          <div className="space-y-5">
            <div className="bg-white border border-slate-200 rounded-xl p-5">
              <h2 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wide">Step 1 — Describe the Issue</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-2">Photo <span className="text-red-500">*</span></label>
                  <ImageUpload onImageSelect={setImage} onImageRemove={() => { setImage(null); setAnalysis(null) }} />
                </div>
                <Textarea
                  label="Description (optional)"
                  placeholder="e.g. Large pothole near the school entrance, approximately 1 foot deep..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  maxLength={500}
                  showCounter
                  rows={3}
                />
                <Input
                  label="Area / Locality in Bengaluru"
                  placeholder="e.g. Koramangala 5th Block"
                  value={locality}
                  onChange={e => setLocality(e.target.value)}
                />
                <Select
                  label="Issue Category"
                  placeholder="Select a category"
                  options={CATEGORY_OPTIONS}
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                />
                <LanguageToggle value={language} onChange={setLanguage} />
              </div>

              {analyzeError && <div className="mt-4"><ErrorMessage message={analyzeError} /></div>}

              <div className="mt-5 flex flex-wrap gap-3">
                <Button
                  onClick={handleAnalyze}
                  loading={analyzing}
                  disabled={!image || analyzing}
                  size="lg"
                  fullWidth
                >
                  <Search size={16} />
                  {analyzing ? 'Analyzing with AI…' : 'Analyze with AI'}
                </Button>
                {analysis && (
                  <Button variant="ghost" size="sm" onClick={handleReset}>
                    <RotateCcw size={14} /> Start Over
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Right — results */}
          <div className="space-y-5">
            {!analysis && !analyzing && (
              <div className="bg-white border-2 border-dashed border-slate-200 rounded-xl p-10 text-center text-slate-400">
                <Search size={36} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Upload a photo and click <strong>Analyze with AI</strong> to see results here.</p>
              </div>
            )}

            {analyzing && (
              <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-slate-600 font-medium">Analyzing your image…</p>
                <p className="text-xs text-slate-400 mt-1">This usually takes 5–15 seconds</p>
              </div>
            )}

            {analysis && (
              <>
                <AnalysisResults analysis={analysis} />
                <ComplaintPreview
                  subject={subject}
                  body={body}
                  language={language}
                  onSubjectChange={setSubject}
                  onBodyChange={setBody}
                />
                <Button onClick={handleSave} loading={saving} disabled={saving} size="lg" fullWidth>
                  <Save size={16} />
                  {user ? 'Save Report' : 'Sign In to Save'}
                </Button>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-start gap-2 text-sm text-emerald-800">
                  <BookOpen size={15} className="shrink-0 mt-0.5" />
                  <span>After saving, visit the <a href="/guide" className="font-medium underline">Civic Guide</a> to find the right authority for submission.</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

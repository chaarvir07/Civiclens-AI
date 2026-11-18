import { Copy, Download, FileText } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import { useToast } from '../../context/ToastContext'
import { downloadTextFile } from '../../utils/downloadText'

export default function ComplaintPreview({
  subject,
  body,
  language,
  onSubjectChange,
  onBodyChange,
}) {
  const { showToast } = useToast()

  const handleCopy = async () => {
    const text = `Subject: ${subject}\n\n${body}`
    try {
      await navigator.clipboard.writeText(text)
      showToast('Complaint copied to clipboard!', 'success')
    } catch {
      showToast('Could not copy — please select and copy manually.', 'warning')
    }
  }

  const handleDownload = () => {
    const text = `Subject: ${subject}\n\n${body}`
    const filename = language === 'kn' ? 'complaint_kn.txt' : 'complaint.txt'
    downloadTextFile(text, filename)
    showToast('Complaint downloaded!', 'success')
  }

  return (
    <Card padding="md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
            <FileText size={16} className="text-slate-600" />
          </div>
          <h3 className="font-semibold text-slate-900 text-sm">Generated Complaint</h3>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${language === 'kn' ? 'bg-violet-100 text-violet-700' : 'bg-blue-100 text-blue-700'}`}>
          {language === 'kn' ? 'ಕನ್ನಡ' : 'English'}
        </span>
      </div>

      <div className="space-y-4">
        <Input
          label="Subject"
          value={subject || ''}
          onChange={(e) => onSubjectChange(e.target.value)}
          placeholder="Complaint subject line"
        />
        <Textarea
          label="Complaint Body"
          value={body || ''}
          onChange={(e) => onBodyChange(e.target.value)}
          rows={10}
          className={language === 'kn' ? 'font-kannada' : ''}
          placeholder="Complaint text will appear here..."
        />
        <p className="text-xs text-slate-400">Click to edit the subject or body before saving or submitting.</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
        <Button variant="secondary" size="sm" onClick={handleCopy}>
          <Copy size={14} /> Copy
        </Button>
        <Button variant="secondary" size="sm" onClick={handleDownload}>
          <Download size={14} /> Download .txt
        </Button>
      </div>
    </Card>
  )
}

import { AlertTriangle } from 'lucide-react'

export default function AIDisclaimer() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
      <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
      <p className="text-xs text-amber-800">
        <strong>AI-Generated Content — Review Before Use.</strong> This content was produced automatically and may contain errors. Verify all details before submitting to any authority.
      </p>
    </div>
  )
}

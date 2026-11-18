import { FileText } from 'lucide-react'
import Button from './Button'

export default function EmptyState({ icon: Icon = FileText, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-4">
      <Icon size={56} className="text-slate-300 mb-4" />
      <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
      {description && <p className="text-slate-500 max-w-sm mb-6">{description}</p>}
      {action && (
        <Button onClick={action.onClick} variant="primary">
          {action.label}
        </Button>
      )}
    </div>
  )
}

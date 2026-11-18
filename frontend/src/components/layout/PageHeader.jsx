import Button from '../ui/Button'

export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-slate-500 mt-1 text-sm">{subtitle}</p>}
      </div>
      {action && (
        <Button onClick={action.onClick} variant={action.variant || 'primary'} size="md">
          {action.label}
        </Button>
      )}
    </div>
  )
}

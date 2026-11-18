import Card from '../ui/Card'

export default function StatCard({ title, count, icon: Icon, colorClass = 'bg-blue-100 text-blue-600', loading = false }) {
  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 animate-pulse">
        <div className="bg-slate-200 rounded h-8 w-16 mb-3" />
        <div className="bg-slate-200 rounded h-4 w-24" />
      </div>
    )
  }
  return (
    <Card padding="md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-3xl font-bold text-slate-900">{count ?? 0}</p>
          <p className="text-sm text-slate-500 mt-1">{title}</p>
        </div>
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colorClass}`}>
          <Icon size={20} />
        </div>
      </div>
    </Card>
  )
}

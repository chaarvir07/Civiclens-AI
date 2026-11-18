import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { CATEGORY_LABELS, CATEGORY_COLORS } from '../../utils/categoryLabels'
import Card from '../ui/Card'
import EmptyState from '../ui/EmptyState'
import { BarChart2 } from 'lucide-react'

export default function CategoryChart({ reports = [] }) {
  const data = Object.entries(CATEGORY_LABELS).map(([key, label]) => ({
    name: label.length > 12 ? label.substring(0, 12) + '…' : label,
    fullName: label,
    count: reports.filter((r) => r.category === key).length,
    color: CATEGORY_COLORS[key],
  })).filter((d) => d.count > 0)

  return (
    <Card padding="md">
      <h3 className="font-semibold text-slate-900 mb-4">My Reports by Category</h3>
      {data.length === 0 ? (
        <EmptyState
          icon={BarChart2}
          title="No data yet"
          description="Create your first report to see the chart."
        />
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 4 }}>
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
            <Tooltip
              formatter={(value, _, props) => [value, props.payload?.fullName]}
              contentStyle={{ fontSize: 12, borderRadius: 8 }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}

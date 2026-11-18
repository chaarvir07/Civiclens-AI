export default function SkeletonCard({ lines = 3, className = '' }) {
  return (
    <div className={`bg-white border border-slate-200 rounded-xl p-6 animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="bg-slate-200 rounded h-4 mb-3"
          style={{ width: i === 0 ? '60%' : i === lines - 1 ? '40%' : '80%' }}
        />
      ))}
    </div>
  )
}

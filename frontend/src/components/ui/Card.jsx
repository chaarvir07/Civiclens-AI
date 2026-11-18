const PADDING = { sm: 'p-4', md: 'p-6', lg: 'p-8' }

export default function Card({ children, className = '', padding = 'md', onClick }) {
  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl shadow-card ${PADDING[padding]} ${onClick ? 'cursor-pointer hover:shadow-card-hover transition-shadow' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

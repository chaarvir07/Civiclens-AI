export default function Textarea({ label, error, maxLength, showCounter = false, className = '', value = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-slate-700">{label}</label>
      )}
      <textarea
        className={`w-full border rounded-md px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors resize-y ${error ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}`}
        maxLength={maxLength}
        value={value}
        {...props}
      />
      <div className="flex justify-between">
        {error ? <p className="text-xs text-red-600">{error}</p> : <span />}
        {showCounter && maxLength && (
          <p className="text-xs text-slate-400">{String(value).length} / {maxLength}</p>
        )}
      </div>
    </div>
  )
}

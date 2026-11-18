export default function LanguageToggle({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-700">Complaint Language</label>
      <div className="flex rounded-lg border border-slate-200 overflow-hidden w-fit">
        {[
          { val: 'en', label: 'English' },
          { val: 'kn', label: 'ಕನ್ನಡ' },
        ].map(({ val, label }) => (
          <button
            key={val}
            type="button"
            onClick={() => onChange(val)}
            className={`px-5 py-2 text-sm font-medium transition-colors ${
              value === val
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

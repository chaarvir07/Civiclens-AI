import Navbar from './Navbar'

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row md:justify-between gap-6">
            <div>
              <p className="font-semibold text-lg mb-1">CivicLens AI</p>
              <p className="text-slate-400 text-sm max-w-xs">Understand your city. Report problems. Drive change.</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-slate-400">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <a href="/report" className="hover:text-white transition-colors">Report</a>
              <a href="/guide" className="hover:text-white transition-colors">Guide</a>
              <a href="/about" className="hover:text-white transition-colors">About</a>
              <a href="/login" className="hover:text-white transition-colors">Login</a>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-6">
            <p className="text-xs text-slate-500 text-center">
              ⚠️ CivicLens AI generates complaints for your personal use. It does not submit complaints to any government authority.
              Not affiliated with BBMP, BESCOM, or BWSSB.
            </p>
            <p className="text-xs text-slate-600 text-center mt-2">© 2025 CivicLens AI</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

import { useNavigate } from 'react-router-dom'
import { Camera, Bot, Send, Shield, Globe, BookOpen, FolderOpen, ArrowRight, ChevronDown } from 'lucide-react'
import PublicLayout from '../components/layout/PublicLayout'
import Button from '../components/ui/Button'

const FEATURES = [
  { icon: Bot, title: 'AI-Powered Analysis', desc: 'Google Gemini Vision analyzes your photo and identifies the civic issue automatically.' },
  { icon: Globe, title: 'English & Kannada', desc: 'Generate professional complaints in both English and Kannada, your choice.' },
  { icon: BookOpen, title: 'Verified Reporting Guide', desc: 'Know exactly which Bengaluru agency to contact for each type of issue.' },
  { icon: FolderOpen, title: 'Personal Report History', desc: 'Save, track, and manage all your complaint drafts in one place.' },
  { icon: Shield, title: 'Privacy-First Design', desc: 'Your reports are private to you. We never share or sell your data.' },
]

const STEPS = [
  { icon: Camera, num: '01', title: 'Upload a Photo', desc: 'Take a picture of the civic problem — pothole, garbage, broken streetlight, drainage issue, or water leakage.' },
  { icon: Bot, num: '02', title: 'AI Analyzes & Drafts', desc: 'Our AI identifies the issue, extracts relevant details, and generates a formal complaint in your preferred language.' },
  { icon: Send, num: '03', title: 'Copy & Submit Yourself', desc: 'Review, edit, and copy or download the complaint. Then send it directly to the right authority.' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <PublicLayout>
      {/* Hero */}
      <section className="bg-slate-900 text-white min-h-[85vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 text-sm text-blue-300 mb-6">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              Built for Bengaluru, powered by AI
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
              Understand your city.<br />
              Report problems.<br />
              <span className="text-blue-400">Drive change.</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              AI-powered civic complaint generation for Bengaluru residents. Upload a photo of any civic issue, and get a professional complaint in English or Kannada — ready to send to the right authority.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="xl" onClick={() => navigate('/report')}>
                Report an Issue <ArrowRight size={18} />
              </Button>
              <button
                className="border border-white/30 text-white px-8 py-4 rounded-lg text-base font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Features <ChevronDown size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
            <p className="text-slate-500 mt-3 text-lg">Three simple steps to report your civic issue</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map(({ icon: Icon, num, title, desc }) => (
              <div key={num} className="text-center px-4">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={26} className="text-blue-600" />
                </div>
                <div className="text-sm font-semibold text-blue-600 mb-2">Step {num}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{title}</h3>
                <p className="text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900">Everything you need</h2>
            <p className="text-slate-500 mt-3 text-lg">Built specifically for Bengaluru's civic landscape</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-card-hover transition-shadow">
                <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={20} className="text-teal-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bengaluru Banner */}
      <section className="py-14 bg-blue-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-3">Built for Bengaluru</h2>
          <p className="text-blue-100 text-base leading-relaxed">
            Covers the domains handled by BBMP, BWSSB, and BESCOM — roads, solid waste, streetlights, drainage, and water supply. With a verified reporting guide for each agency.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to report your first issue?</h2>
          <p className="text-slate-500 text-lg mb-8">Join Bengaluru residents who are making their voices heard — the smart way.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="xl" onClick={() => navigate('/signup')}>
              Create Free Account <ArrowRight size={18} />
            </Button>
            <Button size="xl" variant="secondary" onClick={() => navigate('/report')}>
              Try Without Signing Up
            </Button>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}

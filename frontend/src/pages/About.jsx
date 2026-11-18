import PublicLayout from '../components/layout/PublicLayout'

export default function About() {
  return (
    <PublicLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">About CivicLens AI</h1>
        <p className="text-slate-500 mb-10">An AI-powered civic complaint platform built for Bengaluru residents.</p>

        {[
          {
            title: 'Our Mission',
            body: `CivicLens AI exists to lower the barrier between a Bengaluru resident noticing a civic problem and that problem being formally reported to the right authority. We believe every resident deserves a simple, dignified way to make their voice heard.`
          },
          {
            title: 'The Problem We Are Solving',
            body: `Bengaluru residents encounter potholes, overflowing garbage, broken streetlights, blocked drains, and water leakages daily. Reporting these issues is fragmented — multiple agencies, poor UX, language barriers, and no single entry point. Most problems go unreported simply because the process is too hard.`
          },
          {
            title: 'How AI Is Used',
            body: `You upload a photo. Google Gemini Vision analyzes the image and identifies the issue type, describes what it observes, and drafts a formal complaint in English or Kannada.\n\nImportant: the AI generates complaint text for your personal use only. CivicLens AI does not submit anything to any government system. That step is always done manually by you.`
          },
          {
            title: 'Built for Bengaluru',
            body: `CivicLens AI covers the civic domains handled by BBMP (roads, waste, drainage, streetlights), BWSSB (water supply and sewerage), and provides a verified guide to each agency's reporting portal.`
          },
          {
            title: 'Technology Stack',
            body: `Frontend: React + Vite + Tailwind CSS\nBackend: Python FastAPI\nAI: Google Gemini 1.5 Flash\nDatabase: Supabase (PostgreSQL + Auth)\nDeployed on Vercel (frontend) and Render (backend)`
          },
          {
            title: 'Privacy',
            body: `Your reports are private to your account, protected by Row Level Security in Supabase. We do not sell, share, or publish your data. Anonymous users can use the report creator without an account — their data stays in the browser only.`
          },
          {
            title: 'Limitations',
            body: `• AI analysis may misidentify the issue category or miss details not visible in the photo.\n• Kannada complaint quality depends on the AI model and may require manual correction.\n• The Civic Guide is maintained manually and may become outdated — always verify on the official website before submitting.`
          },
        ].map(({ title, body }) => (
          <section key={title} className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 mb-3">{title}</h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">{body}</p>
          </section>
        ))}
      </div>
    </PublicLayout>
  )
}

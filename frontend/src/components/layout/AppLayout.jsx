import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      {/* Mobile top nav */}
      <div className="lg:hidden">
        <Navbar />
      </div>
      <main className="lg:ml-60 min-h-screen">
        {children}
      </main>
    </div>
  )
}

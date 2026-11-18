import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, PlusCircle, FileText, BookOpen, Info, LogOut, MapPin, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/report', icon: PlusCircle, label: 'New Report' },
  { to: '/reports', icon: FileText, label: 'My Reports' },
  { to: '/guide', icon: BookOpen, label: 'Civic Guide' },
  { to: '/about', icon: Info, label: 'About' },
]

export default function Sidebar() {
  const { pathname } = useLocation()
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'User'

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-60 bg-white border-r border-slate-200 z-40">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 px-5 h-16 border-b border-slate-200 shrink-0">
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <MapPin size={18} className="text-white" />
        </div>
        <span className="font-semibold text-slate-900">CivicLens AI</span>
      </Link>

      {/* Nav links */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto">
        {NAV.map(({ to, icon: Icon, label }) => {
          const active = pathname === to || (to !== '/dashboard' && pathname.startsWith(to))
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors ${
                active
                  ? 'bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-600'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-slate-200 p-4 shrink-0">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
            <User size={14} className="text-blue-600" />
          </div>
          <span className="text-sm font-medium text-slate-700 truncate">{displayName}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 transition-colors w-full"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  )
}

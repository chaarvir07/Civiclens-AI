import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, Menu, X, LogOut, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const displayName = user?.user_metadata?.display_name || user?.email?.split('@')[0] || 'User'

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <MapPin size={18} className="text-white" />
          </div>
          <span className="font-semibold text-lg text-slate-900">CivicLens AI</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/guide" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Guide</Link>
          <Link to="/about" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">About</Link>

          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Dashboard</Link>
              <Link to="/report" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">New Report</Link>
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 text-sm text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User size={14} className="text-blue-600" />
                  </div>
                  <span className="max-w-[120px] truncate">{displayName}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1">
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <LogOut size={14} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Login</Link>
              <Button as={Link} onClick={() => navigate('/signup')} size="sm">Sign Up</Button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden p-2 text-slate-600" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 flex flex-col gap-3">
          <Link to="/guide" className="text-sm text-slate-700 py-2" onClick={() => setMenuOpen(false)}>Guide</Link>
          <Link to="/about" className="text-sm text-slate-700 py-2" onClick={() => setMenuOpen(false)}>About</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-slate-700 py-2" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <Link to="/report" className="text-sm text-slate-700 py-2" onClick={() => setMenuOpen(false)}>New Report</Link>
              <Link to="/reports" className="text-sm text-slate-700 py-2" onClick={() => setMenuOpen(false)}>My Reports</Link>
              <button onClick={handleSignOut} className="text-sm text-red-600 py-2 text-left flex items-center gap-2">
                <LogOut size={14} /> Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-slate-700 py-2" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="text-sm font-medium text-blue-600 py-2" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

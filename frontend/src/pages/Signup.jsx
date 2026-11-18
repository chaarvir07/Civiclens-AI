import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import PublicLayout from '../components/layout/PublicLayout'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import ErrorMessage from '../components/ui/ErrorMessage'

export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ displayName: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.displayName.trim()) e.displayName = 'Name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters.'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match.'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrors(v); return }
    setErrors({})
    setApiError('')
    setLoading(true)
    try {
      await signUp(form.email, form.password, form.displayName)
      navigate('/dashboard')
    } catch (err) {
      setApiError(err.message || 'Could not create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const set = k => e => setForm({ ...form, [k]: e.target.value })

  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-220px)] flex items-center justify-center px-4 py-16">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin size={22} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Create your account</h1>
            <p className="text-sm text-slate-500 mt-1">Start reporting civic issues in Bengaluru</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Full Name" placeholder="Your name" value={form.displayName} onChange={set('displayName')} error={errors.displayName} required />
            <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} error={errors.email} required autoComplete="email" />
            <Input label="Password" type="password" placeholder="Min 8 characters" value={form.password} onChange={set('password')} error={errors.password} required autoComplete="new-password" />
            <Input label="Confirm Password" type="password" placeholder="Repeat password" value={form.confirm} onChange={set('confirm')} error={errors.confirm} required autoComplete="new-password" />
            {apiError && <ErrorMessage message={apiError} />}
            <Button type="submit" fullWidth loading={loading} size="lg">Create Account</Button>
          </form>
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  )
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Droplets, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    setIsLoading(true)

    try {
      const user = await login(email, password)
      if (user.role !== 'admin') {
        setError('Access denied. Admin credentials required.')
        setIsLoading(false)
        return
      }
      navigate('/admin/dashboard')
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Left Panel - Branding */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="hidden lg:flex lg:w-[480px] xl:w-[540px] flex-col justify-between p-10"
        style={{ backgroundColor: '#022C22' }}
      >
        {/* Logo & Brand */}
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#064e3b' }}
            >
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1
                className="text-white text-xl font-bold tracking-tight"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
              >
                Hydra Drop
              </h1>
              <p className="text-xs uppercase tracking-widest" style={{ color: '#80bea6' }}>
                Admin Portal
              </p>
            </div>
          </div>

          {/* Tagline */}
          <div className="mt-auto">
            <h2
              className="text-3xl font-bold text-white leading-tight mb-4"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              Manage your premium
              <br />
              water business.
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#95d3ba' }}>
              Access your dashboard to monitor sales, manage inventory, process orders, and review
              customization requests — all from one powerful interface.
            </p>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-3 gap-4 pt-8 border-t" style={{ borderColor: '#064e3b' }}>
          <div>
            <p
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              $124k
            </p>
            <p className="text-xs mt-1" style={{ color: '#80bea6' }}>
              Revenue
            </p>
          </div>
          <div>
            <p
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              1,240
            </p>
            <p className="text-xs mt-1" style={{ color: '#80bea6' }}>
              Orders
            </p>
          </div>
          <div>
            <p
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              12.4k
            </p>
            <p className="text-xs mt-1" style={{ color: '#80bea6' }}>
              Customers
            </p>
          </div>
        </div>
      </motion.div>

      {/* Right Panel - Login Form */}
      <div
        className="flex-1 flex items-center justify-center p-6 sm:p-10"
        style={{ backgroundColor: '#f8f9ff' }}
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#064e3b' }}
            >
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1
                className="text-lg font-bold"
                style={{ fontFamily: "'Hanken Grotesk', sans-serif", color: '#0b1c30' }}
              >
                Hydra Drop
              </h1>
              <p
                className="text-xs uppercase tracking-widest"
                style={{ color: '#064e3b' }}
              >
                Admin Portal
              </p>
            </div>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif", color: '#0b1c30' }}
            >
              Welcome back
            </h2>
            <p className="text-sm" style={{ color: '#707974' }}>
              Sign in to your admin account to continue.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 rounded-lg text-sm"
              style={{ backgroundColor: '#ffdad6', color: '#93000a' }}
            >
              {error}
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: '#404944', fontFamily: "'Inter', sans-serif" }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: '#707974' }}
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@hydradrop.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-sm transition-all duration-200 outline-none"
                  style={{
                    border: '1px solid #bfc9c3',
                    backgroundColor: '#ffffff',
                    color: '#0b1c30',
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#064e3b'
                    e.currentTarget.style.borderWidth = '2px'
                    e.currentTarget.style.padding = '11px 15px 11px 39px'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#bfc9c3'
                    e.currentTarget.style.borderWidth = '1px'
                    e.currentTarget.style.padding = '12px 16px 12px 40px'
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: '#404944', fontFamily: "'Inter', sans-serif" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: '#707974' }}
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 rounded-lg text-sm transition-all duration-200 outline-none"
                  style={{
                    border: '1px solid #bfc9c3',
                    backgroundColor: '#ffffff',
                    color: '#0b1c30',
                    fontFamily: "'Inter', sans-serif",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#064e3b'
                    e.currentTarget.style.borderWidth = '2px'
                    e.currentTarget.style.padding = '11px 47px 11px 39px'
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#bfc9c3'
                    e.currentTarget.style.borderWidth = '1px'
                    e.currentTarget.style.padding = '12px 48px 12px 40px'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-100 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" style={{ color: '#707974' }} />
                  ) : (
                    <Eye className="w-4 h-4" style={{ color: '#707974' }} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 accent-emerald-800"
                />
                <span className="text-sm" style={{ color: '#404944' }}>
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-sm font-medium hover:underline transition-colors"
                style={{ color: '#064e3b' }}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: '#064e3b' }}
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: '#E2E8F0' }}>
            <p className="text-xs text-center" style={{ color: '#707974' }}>
              Protected by Hydra Drop Security.{' '}
              <a href="/" className="hover:underline" style={{ color: '#064e3b' }}>
                Return to storefront →
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminLoginPage

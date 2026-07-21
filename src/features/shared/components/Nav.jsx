import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router'
import { setUser } from '../../auth/states/auth.slice'

const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navItems = !user
    ? [
        { label: 'Home', path: '/' },
        { label: 'Browse', path: '/browse' },
        { label: 'Find Photographers', path: '/findProfile' },
      ]
    : user.role === 'user'
    ? [
        { label: 'Home', path: '/' },
        { label: 'Instant Booking', path: '/instant-booking' },
        { label: 'Event Booking', path: '/event-booking' },
        { label: 'Find Photographers', path: '/findProfile' },
        { label: 'My Bookings', path: '/my-bookings' },
      ]
    : [
        { label: 'Home', path: '/serviceProviderHome' },
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'My Profile', path: '/dashboard/profile' },
        { label: 'Portfolio', path: '/portfolio' },
        { label: 'Bookings', path: '/provider-bookings' },
      ]

  const handleNav = (path) => {
    navigate(path)
    setMobileOpen(false)
  }

  const handleLogout = () => {
    dispatch(setUser(null))
    navigate('/login')
    setMobileOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-walnut/85 backdrop-blur-xl border-b border-gold/20 shadow-lg shadow-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/divine_capture_logo.svg" alt="DivineCapture"
               onClick={() => { navigate('/'); setMobileOpen(false) }}
               className="w-8 h-8 cursor-pointer" />
          <span
            onClick={() => { navigate('/'); setMobileOpen(false) }}
            className="text-lg font-semibold text-cream cursor-pointer tracking-wide"
          >
            DivineCapture
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive(item.path)
                  ? 'text-gold bg-gold/10'
                  : 'text-cream/70 hover:text-cream hover:bg-white/5'
              }`}
            >
              {item.label}
              {isActive(item.path) && (
                <span className="absolute -bottom-0.5 left-2 right-2 h-0.5 bg-gradient-to-r from-gold/80 to-amber-500/80 rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Desktop Right Side Actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-cream/70 font-medium">{user.fullname}</span>
              <button
                onClick={handleLogout}
                className="h-[34px] px-4 text-[12px] font-semibold rounded-lg border border-cream/20 text-cream/80 hover:bg-cream/10 hover:border-cream/40 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="text-sm font-medium text-cream/80 hover:text-cream transition-colors"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate('/register')}
                className="h-[34px] px-5 text-[12px] font-semibold rounded-lg bg-gradient-to-r from-gold to-amber-600 text-charcoal hover:shadow-lg hover:shadow-gold/30 transition-all active:scale-[0.98]"
              >
                Get Started
              </button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-cream/80 hover:bg-white/5 transition-all"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gold/15 bg-walnut/95 backdrop-blur-xl shadow-2xl animate-[slideDown_0.2s_ease-out]">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-gold/10 text-gold'
                    : 'text-cream/70 hover:bg-white/5 hover:text-cream'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-gold/15 pt-2 mt-2">
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm text-cream/60 font-medium">{user.fullname}</div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={() => handleNav('/login')}
                    className="w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gold hover:bg-gold/10 transition-colors"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => handleNav('/register')}
                    className="w-full px-3 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-gold to-amber-600 text-charcoal hover:shadow-md transition-all text-center"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  )
}

export default Nav
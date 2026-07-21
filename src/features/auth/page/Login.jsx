import React, { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import ContinueWithGoogle from '../components/ContinueWithGoogle'

const Login = () => {
  const { handleLogin } = useAuth()
  const navigate = useNavigate()
  const loading = useSelector((state) => state.auth.loading)

  const [formData, setFormData] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await handleLogin({ email: formData.email, password: formData.password })
      navigate(user?.role === "getter" && !user?.isVerified ? "/profile" : "/serviceProviderHome")
    } catch (error) {
      console.log(error)
    }
  }

  const features = [
    { icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z', label: 'Discover Talent', desc: 'Browse portfolios of top photographers' },
    { icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12', label: 'Easy Booking', desc: 'Seamless scheduling and payments' },
    { icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z', label: 'Creative Network', desc: 'Join a community of creators and clients' },
  ]

  return (
<div className="min-h-screen flex font-sans bg-cream">
      {/* Left Panel */}
<div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-walnut via-coffee to-walnut text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gold/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/5 blur-3xl"></div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(212,175,55,0.03) 2px, rgba(212,175,55,0.03) 4px)` }}></div>

        <div className="relative z-10 animate-[fadeIn_0.8s_ease-out]">
          <div className="flex items-center gap-3.5 mb-12">
            <img src="/divine_capture_logo.svg" alt="DivineCapture" className="w-10 h-10" />
            <div>
              <div className="text-lg font-semibold tracking-tight text-cream">DivineCapture</div>
              <div className="text-[11px] text-gold/60 tracking-[0.2em] uppercase">Capture every divine moment</div>
            </div>
          </div>

          <div className="mb-12 animate-[slideUp_0.8s_ease-out_0.2s_both]">
            <h1 className="text-4xl font-bold tracking-tight leading-[1.15] mb-5">
              Welcome Back to<br />
              <span className="text-gold">Your Creative Hub</span>
            </h1>
            <p className="text-white/70 text-[15px] leading-relaxed max-w-md">
              Connect with talented photographers, manage bookings, and bring your creative vision to life — all in one place.
            </p>
          </div>

          <div className="space-y-5">
            {features.map((item, i) => (
              <div key={i} className="flex items-start gap-4 group animate-[slideUp_0.6s_ease-out_both]" style={{ animationDelay: `${0.4 + i * 0.15}s` }}>
                <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 group-hover:border-gold/40 transition-all duration-300 group-hover:scale-110">
                  <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <div>
                  <p className="text-[14px] font-medium text-white/90">{item.label}</p>
                  <p className="text-[12px] text-white/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 animate-[fadeIn_1s_ease-out_0.8s_both]">
          <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent mb-6"></div>
          <p className="text-[12px] text-white/40 italic">&ldquo;Every frame tells a story — make yours unforgettable.&rdquo;</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-3/5 flex items-center justify-center p-4 sm:p-6 bg-cream animate-[fadeIn_0.6s_ease-out]">
        <div className="w-full max-w-[440px]">
          <div className="lg:hidden flex items-center gap-3 mb-6 sm:mb-10">
            <img src="/divine_capture_logo.svg" alt="DivineCapture" className="w-9 h-9" />
            <div>
              <div className="text-[15px] font-medium text-slate-800 leading-tight">DivineCapture</div>
              <div className="text-[11px] text-slate-500 leading-tight tracking-wider">CAPTURE EVERY DIVINE MOMENT</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-[slideUp_0.7s_ease-out_0.15s_both]">
            <div className="mb-5 sm:mb-7 animate-[fadeIn_0.6s_ease-out_0.3s_both]">
              <h1 className="text-xl sm:text-[22px] font-semibold text-slate-900 mb-1">Welcome back</h1>
              <p className="text-[12px] sm:text-[13px] text-slate-500">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3 sm:mb-4 animate-[slideUp_0.5s_ease-out_0.35s_both]">
                <label className="block text-[11px] sm:text-[12px] font-medium text-slate-600 mb-1 sm:mb-1.5 tracking-wide">Email address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com"
                  className="w-full h-[40px] sm:h-[42px] px-3 sm:px-[13px] text-[13px] rounded-[10px] border border-slate-300 outline-none bg-white text-slate-900 placeholder-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all duration-200 hover:border-gold/40" />
              </div>

              <div className="mb-4 sm:mb-6 animate-[slideUp_0.5s_ease-out_0.45s_both]">
                <label className="block text-[11px] sm:text-[12px] font-medium text-slate-600 mb-1 sm:mb-1.5 tracking-wide">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" required
                  className="w-full h-[40px] sm:h-[42px] px-3 sm:px-[13px] text-[13px] rounded-[10px] border border-slate-300 outline-none bg-white text-slate-900 placeholder-slate-400 focus:border-gold focus:ring-2 focus:ring-gold/15 transition-all duration-200 hover:border-gold/40" />
              </div>

              <div className="animate-[slideUp_0.5s_ease-out_0.55s_both]">
                <button type="submit" disabled={loading}
                  className="w-full h-[40px] sm:h-[42px] bg-gradient-to-r from-gold to-amber-600 hover:from-gold hover:to-amber-500 text-charcoal text-[13px] font-semibold rounded-[10px] flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-gold/20 hover:shadow-lg hover:shadow-gold/30 active:scale-[0.98]">
                  {loading ? (
                    <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>Signing in...</>
                  ) : (
                    <><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>Sign in</>
                  )}
                </button>
              </div>

              <p className="text-center text-[12px] text-slate-500 mt-4 sm:mt-5 animate-[fadeIn_0.5s_ease-out_0.65s_both]">
                Don't have an account?{' '}
                <a href="/register" className="text-gold hover:text-amber-600 font-medium transition-colors hover:underline">Create one</a>
              </p>
            </form>

            <ContinueWithGoogle />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}

export default Login
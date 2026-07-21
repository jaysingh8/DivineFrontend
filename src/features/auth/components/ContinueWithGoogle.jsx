import React from 'react'
import { useSelector } from 'react-redux'

const ContinueWithGoogle = () => {
  const loading = useSelector((state) => state.auth.loading)

  const handleGoogleLogin = () => {
    window.open('https://divinebackend-1-b1sy.onrender.com/api/auth/google', '_self')
  }

  return (
    <>
      <div className="flex items-center gap-3 my-5 animate-[fadeIn_0.5s_ease-out_0.65s_both]">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
        <span className="text-[11px] text-charcoal/50 font-medium tracking-wide uppercase">or continue with</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"></div>
      </div>
      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full h-[42px] bg-white border border-slate-300 hover:border-gold/40 hover:bg-gold/5 text-slate-700 text-[13px] font-medium rounded-[10px] flex items-center justify-center gap-2.5 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
      >
        <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Google
      </button>
    </>
  )
}

export default ContinueWithGoogle
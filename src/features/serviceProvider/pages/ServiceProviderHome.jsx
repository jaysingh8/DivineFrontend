import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useProfile } from '../hooks/useProfile'

const ServiceProviderHome = () => {
  const { user } = useSelector((state) => state.auth)
  const { profile } = useSelector((state) => state.profile)
  const { handleGetProfile } = useProfile()
  const navigate = useNavigate()
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 18) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
    handleGetProfile()
  }, [])

  const quickLinks = [
    {
      label: 'My Dashboard',
      desc: 'Full dashboard with stats & controls',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      action: () => navigate('/dashboard'),
      color: 'from-gold to-amber-600',
    },
    {
      label: 'My Profile',
      desc: 'View and edit your public profile',
      icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
      action: () => navigate('/dashboard/profile'),
      color: 'from-walnut to-coffee',
    },
    {
      label: 'Portfolio',
      desc: 'Upload and manage your portfolio images',
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      action: () => navigate('/portfolio'),
      color: 'from-coffee to-walnut',
    },
    {
      label: 'Edit Profile',
      desc: 'Update your services, rates & equipment',
      icon: 'M11.42 15.17l-2.5 2.5a.75.75 0 01-1.06 0l-.84-.84a.75.75 0 010-1.06l2.5-2.5M12 3v2.25m0 0l.75.75M12 5.25V3m0 0l-.75.75M12 3l.75.75m-1.5 3l.75.75M12 9.75V7.5m0 0l.75.75M12 7.5V5.25m0 0l-.75.75M12 5.25L11.25 6m0 0l-.75.75M12 9.75l.75-.75M12 9.75l-.75.75m3.75-1.5l.75.75M12 12.75V9m0 0l-.75.75M12 9l.75.75M12 12.75l-.75-.75M12 12.75l.75-.75',
      action: () => navigate('/profile'),
      color: 'from-gold to-amber-600',
    },
  ]

  return (
    <div className="min-h-screen">
      <div>
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-walnut via-coffee to-walnut">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cream">
                  {greeting}, {user?.fullname || 'Service Provider'}
                </h1>
                <p className="text-cream/60 text-[14px] mt-2">
                  Welcome to your service provider hub. Manage your photography business from one place.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 rounded-lg bg-cream/10 border border-cream/20">
                  <p className="text-[11px] text-cream/50 uppercase tracking-wide">Role</p>
                  <p className="text-sm font-semibold text-cream capitalize">{user?.role || 'Provider'}</p>
                </div>
                {profile && (
                  <div className="px-4 py-2 rounded-lg bg-cream/10 border border-cream/20">
                    <p className="text-[11px] text-cream/50 uppercase tracking-wide">Status</p>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${profile.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'} animate-pulse`}></span>
                      <p className="text-sm font-semibold text-cream capitalize">{profile.status || 'N/A'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="max-w-6xl mx-auto px-3 sm:px-6 -mt-6 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-cream border border-coffee/20 rounded-xl p-4 shadow-sm">
              <p className="text-[12px] font-medium text-charcoal/50 uppercase tracking-wide">Profile Views</p>
              <p className="text-2xl font-bold text-charcoal mt-1">0</p>
              <p className="text-[11px] text-charcoal/40 mt-1">This week</p>
            </div>
            <div className="bg-cream border border-coffee/20 rounded-xl p-4 shadow-sm">
              <p className="text-[12px] font-medium text-charcoal/50 uppercase tracking-wide">Portfolio</p>
              <p className="text-2xl font-bold text-charcoal mt-1">{profile?.portfolioImages?.length || 0}</p>
              <p className="text-[11px] text-charcoal/40 mt-1">Images uploaded</p>
            </div>
            <div className="bg-cream border border-coffee/20 rounded-xl p-4 shadow-sm">
              <p className="text-[12px] font-medium text-charcoal/50 uppercase tracking-wide">Equipment</p>
              <p className="text-2xl font-bold text-charcoal mt-1">{profile?.equipments?.length || 0}</p>
              <p className="text-[11px] text-charcoal/40 mt-1">Items listed</p>
            </div>
            <div className="bg-cream border border-coffee/20 rounded-xl p-4 shadow-sm">
              <p className="text-[12px] font-medium text-charcoal/50 uppercase tracking-wide">Experience</p>
              <p className="text-2xl font-bold text-charcoal mt-1">{profile?.experience || 0}</p>
              <p className="text-[11px] text-charcoal/40 mt-1">Years</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, i) => (
              <button
                key={i}
                onClick={link.action}
                className="group bg-cream border border-coffee/20 rounded-xl p-5 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10 transition-all text-left"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
                  </svg>
                </div>
                <h3 className="text-[14px] font-semibold text-charcoal group-hover:text-gold transition-colors">{link.label}</h3>
                <p className="text-[12px] text-charcoal/50 mt-1">{link.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Profile Overview */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
          <h2 className="text-lg font-semibold text-charcoal mb-4">Profile Overview</h2>
          <div className="bg-cream border border-coffee/20 rounded-xl p-6 shadow-sm">
            {profile ? (
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <img
                  src={profile.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullname || 'P')}&background=D4AF37&color=2C2C2C&size=100`}
                  alt=""
                  className="w-20 h-20 rounded-xl object-cover border border-coffee/20"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-charcoal">{user?.fullname}</h3>
                  <p className="text-gold text-sm font-medium mt-0.5">
                    {Array.isArray(profile.profession)
                      ? profile.profession.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' & ')
                      : profile.profession}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-3 text-[12px] text-charcoal/50">
                    {profile.city && <span>📍 {profile.city}{profile.state ? `, ${profile.state}` : ''}</span>}
                    {profile.experience !== undefined && <span>💼 {profile.experience} years</span>}
                    {profile.pricePerHour > 0 && <span>💰 ${profile.pricePerHour}/hr</span>}
                    {profile.status && (
                      <span className={`flex items-center gap-1 ${profile.status === 'active' ? 'text-emerald-600' : 'text-amber-600'}`}>
                        <span className={`w-2 h-2 rounded-full ${profile.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                        {profile.status === 'active' ? 'Available' : 'Busy'}
                      </span>
                    )}
                  </div>
                  {profile.bio && (
                    <p className="text-[13px] text-charcoal/60 mt-3 line-clamp-2">{profile.bio}</p>
                  )}
                </div>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="h-[36px] px-4 text-[12px] font-semibold rounded-lg bg-gradient-to-r from-gold to-amber-600 text-charcoal hover:shadow-md hover:shadow-gold/20 transition-all shrink-0"
                >
                  Go to Dashboard
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <h3 className="text-[15px] font-semibold text-charcoal mb-1">Profile Not Created Yet</h3>
                <p className="text-[12px] text-charcoal/50 mb-4">Create your profile to start receiving bookings.</p>
                <button
                  onClick={() => navigate('/profile')}
                  className="h-[38px] px-5 text-[13px] font-semibold rounded-lg bg-gradient-to-r from-gold to-amber-600 text-charcoal hover:shadow-md hover:shadow-gold/20 transition-all"
                >
                  Create Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceProviderHome
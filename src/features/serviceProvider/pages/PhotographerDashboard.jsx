import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useProfile } from '../hooks/useProfile'

const PhotographerDashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const { profile } = useSelector((state) => state.profile)
  const { handleGetProfile, handleIsActive } = useProfile()
  const navigate = useNavigate()
  const [greeting, setGreeting] = useState('')
  const [toggling, setToggling] = useState(false)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 18) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
    handleGetProfile()
  }, [])

  const quickActions = [
    {
      label: 'My Profile',
      desc: 'View and edit your public profile',
      icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
      action: () => navigate('/dashboard/profile'),
      color: 'from-gold to-amber-600',
    },
    {
      label: 'Portfolio',
      desc: 'Upload and manage your portfolio images',
      icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
      action: () => navigate('/portfolio'),
      color: 'from-walnut to-coffee',
    },
    {
      label: 'Edit Profile',
      desc: 'Update your services, rates & equipment',
      icon: 'M11.42 15.17l-2.5 2.5a.75.75 0 01-1.06 0l-.84-.84a.75.75 0 010-1.06l2.5-2.5M12 3v2.25m0 0l.75.75M12 5.25V3m0 0l-.75.75M12 3l.75.75m-1.5 3l.75.75M12 9.75V7.5m0 0l.75.75M12 7.5V5.25m0 0l-.75.75M12 5.25L11.25 6m0 0l-.75.75M12 9.75l.75-.75M12 9.75l-.75.75m3.75-1.5l.75.75M12 12.75V9m0 0l-.75.75M12 9l.75.75M12 12.75l-.75-.75M12 12.75l.75-.75',
      action: () => navigate('/profile'),
      color: 'from-coffee to-walnut',
    },
    {
      label: 'Browse',
      desc: 'See what other photographers offer',
      icon: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z',
      action: () => navigate('/browse'),
      color: 'from-gold to-amber-600',
    },
  ]

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-charcoal">
            {greeting}, {user?.fullname || 'Photographer'}
          </h1>
          <p className="text-charcoal/50 text-[14px] mt-1">
            Manage your photography business from one place.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-cream border border-coffee/20 rounded-xl p-4">
            <p className="text-[12px] font-medium text-charcoal/50 uppercase tracking-wide">Profile Views</p>
            <p className="text-2xl font-bold text-charcoal mt-1">0</p>
            <p className="text-[11px] text-charcoal/40 mt-1">This week</p>
          </div>
          <div className="bg-cream border border-coffee/20 rounded-xl p-4">
            <p className="text-[12px] font-medium text-charcoal/50 uppercase tracking-wide">Portfolio</p>
            <p className="text-2xl font-bold text-charcoal mt-1">{profile?.portfolioImages?.length || 0}</p>
            <p className="text-[11px] text-charcoal/40 mt-1">Images uploaded</p>
          </div>
          <div className="bg-cream border border-coffee/20 rounded-xl p-4">
            <p className="text-[12px] font-medium text-charcoal/50 uppercase tracking-wide">Equipment</p>
            <p className="text-2xl font-bold text-charcoal mt-1">{profile?.equipments?.length || 0}</p>
            <p className="text-[11px] text-charcoal/40 mt-1">Items listed</p>
          </div>
          <div className="bg-cream border border-coffee/20 rounded-xl p-4">
            <p className="text-[12px] font-medium text-charcoal/50 uppercase tracking-wide">Availability</p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2.5 h-2.5 rounded-full ${
                profile?.status === 'active' ? 'bg-emerald-500' : 
                profile?.status === 'busy' ? 'bg-red-500' : 'bg-amber-500'
              } animate-pulse`}></span>
              <p className={`text-2xl font-bold ${
                profile?.status === 'active' ? 'text-emerald-600' : 
                profile?.status === 'busy' ? 'text-red-600' : 'text-amber-600'
              }`}>
                {profile ? (
                  profile.status === 'active' ? 'Active' : 
                  profile.status === 'busy' ? 'Busy' : 'Offline'
                ) : 'Setup'}
              </p>
            </div>
            <p className="text-[11px] text-charcoal/40 mt-1">
              {profile ? (
                profile.status === 'active' ? 'Available for bookings' : 
                profile.status === 'busy' ? 'Currently busy' : 'Not accepting bookings'
              ) : 'Profile pending'}
            </p>
          </div>
        </div>

        {/* Availability Toggle */}
        {profile && (
          <div className="bg-cream border border-coffee/20 rounded-xl p-5 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[15px] font-semibold text-charcoal">Availability Status</h3>
                <p className="text-[12px] text-charcoal/50 mt-0.5">
                  {profile.status === 'active'
                    ? 'You are currently accepting new bookings'
                    : profile.status === 'busy'
                    ? 'You are marked as busy and not accepting new bookings'
                    : 'You are offline and not accepting new bookings'}
                </p>
              </div>
              <button
                onClick={async () => {
                  setToggling(true)
                  try {
                    await handleIsActive()
                  } catch (error) {
                    console.error('Failed to toggle status', error)
                  } finally {
                    setToggling(false)
                  }
                }}
                disabled={toggling}
                className={`relative inline-flex h-[36px] w-[72px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  profile.status === 'active' ? 'bg-emerald-500' : 'bg-coffee/30'
                } ${toggling ? 'opacity-50' : ''}`}
              >
                <span
                  className={`pointer-events-none inline-block h-[32px] w-[32px] transform rounded-full bg-cream shadow ring-0 transition duration-200 ease-in-out ${
                    profile.status === 'active' ? 'translate-x-[36px]' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <h2 className="text-lg font-semibold text-charcoal mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={action.action}
              className="group bg-cream border border-coffee/20 rounded-xl p-5 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/10 transition-all text-left"
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={action.icon} />
                </svg>
              </div>
              <h3 className="text-[14px] font-semibold text-charcoal group-hover:text-gold transition-colors">{action.label}</h3>
              <p className="text-[12px] text-charcoal/50 mt-1">{action.desc}</p>
            </button>
          ))}
        </div>

        {/* Profile Overview */}
        <h2 className="text-lg font-semibold text-charcoal mb-4">Profile Overview</h2>
        <div className="bg-cream border border-coffee/20 rounded-xl p-6">
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
                </div>
                {profile.bio && (
                  <p className="text-[13px] text-charcoal/60 mt-3 line-clamp-2">{profile.bio}</p>
                )}
              </div>
              <button
                onClick={() => navigate('/dashboard/profile')}
                className="h-[36px] px-4 text-[12px] font-semibold rounded-lg bg-gradient-to-r from-gold to-amber-600 text-charcoal hover:shadow-md hover:shadow-gold/20 transition-all shrink-0"
              >
                View Full Profile
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
  )
}

export default PhotographerDashboard
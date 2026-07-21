import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { getAllProfile } from '../services/profile.api'

const PROFESSION_LABELS = { photographer: "Photographer", videographer: "Videographer", editor: "Editor" }

const categories = [
  { id: 'wedding', label: 'Wedding', desc: 'Wedding Photography' },
  { id: 'event', label: 'Event', desc: 'Event Photography' },
  { id: 'fashion', label: 'Fashion', desc: 'Fashion Photography' },
  { id: 'product', label: 'Product', desc: 'Product Photography' },
  { id: 'portrait', label: 'Portrait', desc: 'Portrait Photography' },
  { id: 'travel', label: 'Travel', desc: 'Travel Photography' },
]

const testimonials = [
  { name: 'Sarah Johnson', role: 'Bride', avatar: 'SJ', text: 'DivineCapture helped us find the most incredible wedding photographer. Every moment was captured perfectly.' },
  { name: 'Michael Chen', role: 'Event Manager', avatar: 'MC', text: 'As an event planner, I need reliable photographers. This platform has been a game-changer for my business.' },
  { name: 'Emily Rodriguez', role: 'Fashion Designer', avatar: 'ER', text: 'The photographers on DivineCapture are world-class. My lookbook has never looked better!' },
]

const stats = [
  { value: 10, suffix: 'K+', label: 'Photographers' },
  { value: 50, suffix: 'K+', label: 'Bookings' },
  { value: 95, suffix: '%', label: 'Satisfaction' },
  { value: 150, suffix: '+', label: 'Cities' },
]

const Default = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [countUp, setCountUp] = useState(stats.map(() => 0))
  const statsRef = useRef(null)
  const heroRef = useRef(null)

  useEffect(() => {
    fetchProfiles()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          stats.forEach((stat, i) => {
            const max = stat.value
            const interval = setInterval(() => {
              setCountUp((prev) => {
                const newArr = [...prev]
                if (newArr[i] < max) {
                  newArr[i] = Math.min(newArr[i] + Math.ceil(max / 30), max)
                  return newArr
                }
                clearInterval(interval)
                return prev
              })
            }, 50)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const fetchProfiles = async () => {
    try {
      const response = await getAllProfile()
      setProfiles(response.profile || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const featuredProfiles = profiles.slice(0, 6)

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/browse?search=${encodeURIComponent(searchQuery)}${selectedCategory ? `&category=${selectedCategory}` : ''}`)
  }

  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-walnut via-coffee to-walnut">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.5'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-gold/10 blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/5 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[12px] font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                Premium Photography Marketplace
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-[1.1] mb-6">
                Capture Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold to-amber-500">Best Moments</span>
              </h1>

              <p className="text-lg text-cream/70 max-w-lg mx-auto lg:mx-0 mb-8">
                Connect with top photographers and videographers worldwide. Find the perfect visual storyteller for your special moments.
              </p>

              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto lg:mx-0">
                <div className="flex-1 relative">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by city, name, or category..."
                    className="w-full h-[52px] pl-11 pr-4 text-[14px] rounded-xl bg-cream/10 border border-cream/20 outline-none text-cream placeholder-cream/40 focus:border-gold focus:bg-cream/15 transition-all"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-[52px] px-4 text-[14px] rounded-xl bg-cream/10 border border-cream/20 outline-none text-cream focus:border-gold transition-all"
                >
                  <option value="" className="text-charcoal">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id} className="text-charcoal">{cat.label}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="h-[52px] px-8 text-[14px] font-semibold rounded-xl bg-gradient-to-r from-gold to-amber-600 text-charcoal hover:shadow-xl hover:shadow-gold/30 transition-all active:scale-[0.98]"
                >
                  Search
                </button>
              </form>

              <div className="flex items-center gap-6 mt-8 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  {['A', 'M', 'S', 'E'].map((letter, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-cream/20 bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center text-[10px] font-bold text-gold">
                      {letter}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-cream/20 bg-gold flex items-center justify-center text-[10px] font-bold text-charcoal">+</div>
                </div>
                <p className="text-cream/60 text-[13px]">
                  <span className="text-gold font-semibold">4.9★</span> from 2,500+ reviews
                </p>
              </div>
            </div>

            {/* Hero Card */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                <div className="bg-cream/5 backdrop-blur-xl border border-cream/10 rounded-2xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center text-xl font-bold text-charcoal">
                      DC
                    </div>
                    <div className="flex-1">
                      <p className="text-cream font-semibold text-[15px]">Divine Capture Studio</p>
                      <p className="text-gold text-[12px]">Wedding & Event Photography</p>
                    </div>
                    <div className="flex items-center gap-1 text-gold text-[12px]">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      4.9
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="aspect-square rounded-lg bg-cream/5 overflow-hidden flex items-center justify-center text-cream/20 text-lg">
                        🖼
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-cream/60 text-[12px]">
                      <span>📍 New York</span>
                      <span>•</span>
                      <span>8 yrs exp</span>
                    </div>
                    <div className="text-gold font-semibold text-[15px]">
                      From $200<span className="text-cream/40 text-[11px]">/hr</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-8 -right-8 bg-cream/10 backdrop-blur-xl border border-cream/10 rounded-xl p-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-cream text-[11px] font-medium">Available Now</p>
                      <p className="text-cream/50 text-[10px]">Response time 5 min</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <svg className="w-6 h-6 text-cream/30 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[11px] font-semibold text-gold uppercase tracking-[0.2em]">Categories</span>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mt-2">Explore by Profession</h2>
            <p className="text-[14px] text-charcoal/60 mt-2 max-w-lg mx-auto">Find the perfect professional for your specific photography needs</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate(`/browse?category=${cat.id}`)}
                className="group relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-beige to-cream border border-coffee/20 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/10 transition-all duration-300 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  </svg>
                </div>
                <h3 className="text-[14px] font-semibold text-charcoal group-hover:text-gold transition-colors">{cat.label}</h3>
                <p className="text-[11px] text-charcoal/50 mt-0.5">{cat.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PHOTOGRAPHERS ===== */}
      <section className="py-16 md:py-24 bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
            <div>
              <span className="text-[11px] font-semibold text-gold uppercase tracking-[0.2em]">Featured</span>
              <h2 className="text-2xl md:text-3xl font-bold text-charcoal mt-2">Top Photographers</h2>
            </div>
            <button
              onClick={() => navigate('/findProfile')}
              className="h-[42px] px-6 text-[13px] font-semibold rounded-xl bg-gradient-to-r from-gold to-amber-600 text-charcoal hover:shadow-lg hover:shadow-gold/30 transition-all flex items-center gap-2"
            >
              View All <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-cream rounded-2xl p-5 border border-coffee/20 animate-pulse">
                  <div className="w-14 h-14 rounded-full bg-coffee/20 mb-4" />
                  <div className="h-4 bg-coffee/20 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-coffee/20 rounded w-1/2 mb-4" />
                  <div className="h-3 bg-coffee/20 rounded w-full" />
                </div>
              ))}
            </div>
          ) : featuredProfiles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-charcoal/50 text-[15px]">No photographers listed yet. Be the first to join!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProfiles.map((profile) => (
                <div
                  key={profile._id}
                  onClick={() => navigate(`/profile/${profile._id}`)}
                  className="group bg-cream border border-coffee/20 rounded-2xl p-5 hover:border-gold/30 hover:shadow-xl hover:shadow-gold/10 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center text-gold text-xl font-bold overflow-hidden ring-2 ring-gold/20 group-hover:ring-gold transition-all">
                      {profile.profileImage ? (
                        <img src={profile.profileImage} className="w-full h-full object-cover" alt="" />
                      ) : (
                        profile.user?.fullname?.charAt(0).toUpperCase() || '?'
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-semibold text-charcoal truncate group-hover:text-gold transition-colors">
                        {profile.user?.fullname}
                      </h3>
                      <p className="text-[12px] text-charcoal/50 truncate">
                        {profile.profession?.map((p) => PROFESSION_LABELS[p] || p).join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[12px] text-charcoal/50 mb-3">
                    {profile.city && (
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {profile.city}
                      </span>
                    )}
                    {profile.experience !== undefined && (
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {profile.experience}yrs
                      </span>
                    )}
                  </div>
                  {profile.bio && (
                    <p className="text-[12px] text-charcoal/50 line-clamp-2 leading-relaxed">{profile.bio}</p>
                  )}
                  <div className="mt-4 pt-3 border-t border-coffee/10">
                    <span className="text-[12px] font-medium text-gold group-hover:underline flex items-center gap-1">
                      View Profile <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== STATISTICS ===== */}
      <section ref={statsRef} className="py-16 md:py-20 bg-gradient-to-r from-walnut to-coffee relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='0.5'%3E%3Cpath d='M0 0h1v1H0z'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gold mb-1">
                  {countUp[i]}{stat.suffix}
                </div>
                <p className="text-cream/60 text-[13px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[11px] font-semibold text-gold uppercase tracking-[0.2em]">Testimonials</span>
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal mt-2">What Our Users Say</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-beige border border-coffee/20 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gold/5" />
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center text-lg font-bold text-charcoal mx-auto mb-4">
                  {testimonials[activeTestimonial].avatar}
                </div>
                <p className="text-[15px] text-charcoal/70 leading-relaxed mb-6 italic">
                  &ldquo;{testimonials[activeTestimonial].text}&rdquo;
                </p>
                <p className="text-[14px] font-semibold text-charcoal">{testimonials[activeTestimonial].name}</p>
                <p className="text-[12px] text-charcoal/50">{testimonials[activeTestimonial].role}</p>
                <div className="flex items-center justify-center gap-2 mt-6">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? 'bg-gold w-6' : 'bg-coffee/30'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-walnut to-coffee">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gold/5 blur-[100px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-cream mb-4">Ready to Capture Your Story?</h2>
          <p className="text-cream/70 text-[15px] max-w-lg mx-auto mb-8">
            Join thousands of satisfied customers and find the perfect photographer for your next special moment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {!user && (
              <button
                onClick={() => navigate('/register')}
                className="h-[48px] px-8 text-[14px] font-semibold rounded-xl bg-gradient-to-r from-gold to-amber-600 text-charcoal hover:shadow-xl hover:shadow-gold/30 transition-all active:scale-[0.98]"
              >
                Get Started Free
              </button>
            )}
            <button
              onClick={() => navigate('/findProfile')}
              className="h-[48px] px-8 text-[14px] font-semibold rounded-xl border-2 border-cream/20 text-cream hover:bg-cream/10 hover:border-gold/50 transition-all"
            >
              Browse Photographers
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-walnut border-t border-gold/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center">
              <svg className="w-3 h-3 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              </svg>
            </div>
            <span className="text-cream font-medium text-sm">DivineCapture</span>
          </div>
          <p className="text-cream/40 text-[12px]">&copy; {new Date().getFullYear()} DivineCapture. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out both; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out both; }
      `}</style>
    </div>
  )
}

export default Default
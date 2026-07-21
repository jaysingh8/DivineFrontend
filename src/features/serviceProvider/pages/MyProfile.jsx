import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useProfile } from "../hooks/useProfile";
import DivineLoader from "../../shared/components/DivineLoader";

const MyProfile = () => {
  const { handleGetProfile } = useProfile();

  const { profile, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    handleGetProfile();
  }, []);


  if (loading) {
    return <DivineLoader message="Loading your profile..." />;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center bg-cream rounded-2xl shadow-sm border border-coffee/20 p-10 max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-charcoal mb-2">Profile Not Found</h2>
          <p className="text-charcoal/50 text-sm">You haven't created a profile yet. Create one to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* ─── Cover Photo ─── */}
      <div className="relative h-48 md:h-56 lg:h-64 bg-gradient-to-r from-walnut via-coffee to-walnut overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
      </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-20 relative z-10 pb-10">
        {/* ─── Profile Card ─── */}
        <div className="bg-cream rounded-2xl shadow-sm border border-coffee/20">
          {/* Avatar + Name Row */}
          <div className="px-5 sm:px-8 pt-10 sm:pt-12 pb-5">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src={profile.profileImage || "https://ui-avatars.com/api/?name=" + encodeURIComponent(profile.name || "U") + "&background=D4AF37&color=2C2C2C&size=200"}
                  alt={profile.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl object-cover border-[4px] border-cream shadow-lg bg-cream"
                />
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 w-5 h-5 rounded-full border-[3px] border-cream" />
              </div>

              <div className="flex-1 text-center sm:text-left pt-2 sm:pt-0 sm:pb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-charcoal">
                  {profile.name}
                </h1>
                <p className="text-gold font-medium text-sm sm:text-base mt-0.5">
                  {Array.isArray(profile.profession)
                    ? profile.profession.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" & ")
                    : profile.profession}
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 mt-2 text-sm text-charcoal/50">
                  {profile.city && profile.state && (
                    <span className="inline-flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {profile.city}, {profile.state}
                    </span>
                  )}
                  {profile.experience !== undefined && (
                    <span className="inline-flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                      {profile.experience} Years Experience
                    </span>
                  )}
                </div>
              </div>

              {/* Price Badge */}
              {profile.pricePerHour > 0 && (
                <div className="hidden sm:flex flex-col items-center bg-gradient-to-br from-gold/10 to-amber-50 border border-gold/20 rounded-xl px-5 py-3 shrink-0 self-center">
                  <span className="text-xs font-medium text-gold uppercase tracking-wide">Rate</span>
                  <span className="text-2xl font-bold text-charcoal">₹{profile.pricePerHour}</span>
                  <span className="text-[11px] text-charcoal/50">/ hour</span>
                </div>
              )}
            </div>
          </div>

          {/* ─── Bio Section ─── */}
          {profile.bio && (
            <div className="border-t border-coffee/10 px-5 sm:px-8 py-5">
              <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider mb-2">About</h3>
              <p className="text-charcoal/60 text-sm leading-relaxed">{profile.bio}</p>
            </div>
          )}

          {/* ─── Quick Stats (mobile price + details) ─── */}
          <div className="border-t border-coffee/10 px-5 sm:px-8 py-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {profile.pricePerHour > 0 && (
                <div className="sm:hidden flex flex-col items-center bg-gradient-to-br from-gold/10 to-amber-50 rounded-xl px-4 py-3 col-span-2 sm:col-span-1">
                  <span className="text-xs font-medium text-gold uppercase tracking-wide">Rate</span>
                  <span className="text-xl font-bold text-charcoal">${profile.pricePerHour}</span>
                  <span className="text-[11px] text-charcoal/50">/ hour</span>
                </div>
              )}
              <div className="flex flex-col items-center bg-beige rounded-xl px-4 py-3">
                <span className="text-xs font-medium text-charcoal/50 uppercase tracking-wide">Experience</span>
                <span className="text-xl font-bold text-charcoal">{profile.experience || 0}Y</span>
              </div>
              <div className="flex flex-col items-center bg-beige rounded-xl px-4 py-3">
                <span className="text-xs font-medium text-charcoal/50 uppercase tracking-wide">Equipment</span>
                <span className="text-xl font-bold text-charcoal">{profile.equipments?.length || 0}</span>
              </div>
              <div className="flex flex-col items-center bg-beige rounded-xl px-4 py-3">
                <span className="text-xs font-medium text-charcoal/50 uppercase tracking-wide">Portfolio</span>
                <span className="text-xl font-bold text-charcoal">{profile.portfolioImages?.length || 0}</span>
              </div>
            </div>
          </div>

          {/* ─── Address Line ─── */}
          {profile.address && (
            <div className="border-t border-coffee/10 px-5 sm:px-8 py-4 flex items-center gap-2 text-sm text-charcoal/50">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
              <span>{profile.address}{profile.city ? `, ${profile.city}` : ""}{profile.state ? `, ${profile.state}` : ""}</span>
            </div>
          )}
        </div>

        {/* ─── Equipments ─── */}
        {profile.equipments?.length > 0 && (
          <div className="bg-cream rounded-2xl shadow-sm border border-coffee/20 p-6 sm:p-8 mt-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h2 className="text-lg font-semibold text-charcoal">Equipment</h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {profile.equipments.map((item, index) => (
                <span
                  key={index}
                  className="px-3.5 py-2 bg-beige text-charcoal/60 text-sm font-medium rounded-lg border border-coffee/20 hover:border-gold/30 hover:bg-gold/5 hover:text-gold transition-all duration-200 cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ─── Portfolio ─── */}
        {profile.portfolioImages?.length > 0 && (
          <div className="bg-cream rounded-2xl shadow-sm border border-coffee/20 p-6 sm:p-8 mt-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h2 className="text-lg font-semibold text-charcoal">Portfolio</h2>
              <span className="text-xs text-charcoal/40 font-medium ml-auto">{profile.portfolioImages.length} photo{profile.portfolioImages.length > 1 ? "s" : ""}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {profile.portfolioImages.map((image) => (
                <div key={image._id} className="group relative aspect-square rounded-xl overflow-hidden bg-beige">
                  <img
                    src={image.url}
                    alt="portfolio"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <svg className="w-8 h-8 text-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default MyProfile;
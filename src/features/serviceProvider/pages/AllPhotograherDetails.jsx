import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useProfile } from "../hooks/useProfile";
import DivineLoader from "../../shared/components/DivineLoader";

const AllPhotographerDetails = () => {
  const navigate = useNavigate();
  const { handleGetAllProfile } = useProfile();
  const { allProfiles, loading } = useSelector((state) => state.profile);

  useEffect(() => {
    handleGetAllProfile();
  }, []);

  if (loading) {
    return <DivineLoader message="Finding photographers & videographers..." />;
  }

  if (!allProfiles || allProfiles.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center bg-cream rounded-2xl shadow-sm border border-coffee/20 p-10 max-w-md">
          <div className="w-16 h-16 mx-auto mb-4 bg-gold/10 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-charcoal mb-2">No Profiles Found</h2>
          <p className="text-charcoal/50 text-sm">There are no profiles registered yet. Check back later!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* ─── Hero Header ─── */}
      <div className="relative bg-gradient-to-r from-walnut via-coffee to-walnut overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16 relative z-10">
          <div className="text-center">
            <h1 className="text-2xl sm:text-4xl font-bold text-cream mb-2 sm:mb-3">All Profiles</h1>
            <p className="text-cream/70 text-sm sm:text-base max-w-xl mx-auto px-2">
              Browse through all our talented photographers, videographers, and editors
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-cream/15 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 text-cream/80 text-xs sm:text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>
                {allProfiles.length} profile{allProfiles.length > 1 ? "s" : ""} available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Profiles Grid ─── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 relative z-10 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {allProfiles.map((profile, index) => {
            const fullname = profile.user?.fullname

            return (
              <div
                key={profile._id || index}
                className="bg-cream rounded-2xl shadow-sm border border-coffee/20 overflow-hidden hover:shadow-md hover:border-gold/30 transition-all duration-300 group cursor-pointer"
                style={{ animation: `fadeSlideUp 0.4s ease-out ${index * 0.05}s both` }}
                onClick={() => navigate(`/browse/${profile._id}`)}
              >
                {/* ─── Card Cover ─── */}
                <div className="relative h-28 sm:h-32 bg-gradient-to-r from-walnut via-coffee to-walnut overflow-hidden">
                  <div className="absolute inset-0 bg-black/10" />
                  {profile.pricePerHour > 0 && (
                    <div className="absolute top-3 right-3 bg-cream/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-sm z-10">
                      <span className="text-xs font-bold text-charcoal">${profile.pricePerHour}</span>
                      <span className="text-[10px] text-charcoal/50">/hr</span>
                    </div>
                  )}
                  {profile.isAvailable && profile.status === "active" && (
                    <div className="absolute bottom-2 left-3 bg-emerald-500 w-2.5 h-2.5 rounded-full border-2 border-cream shadow-sm" />
                  )}
                </div>

                {/* ─── Avatar ─── */}
                <div className="relative px-4 pb-4">
                  <div className="flex justify-center -mt-10 mb-3">
                    <div className="relative">
                      <img
                        src={
                          profile.profileImage ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(fullname)}&background=D4AF37&color=2C2C2C&size=160`
                        }
                        alt={fullname}
                        className="w-20 h-20 rounded-xl object-cover border-[3px] border-cream shadow-md bg-cream"
                      />
                      {profile.isAvailable && profile.status === "active" && (
                        <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 w-3.5 h-3.5 rounded-full border-[2.5px] border-cream" />
                      )}
                    </div>
                  </div>

                  {/* ─── Name & Profession ─── */}
                  <div className="text-center mb-3">
                    <h3 className="text-base font-bold text-charcoal truncate">{fullname}</h3>
                    <p className="text-gold font-medium text-xs mt-0.5">
                      {Array.isArray(profile.profession)
                        ? profile.profession
                            .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
                            .join(" & ")
                        : profile.profession}
                    </p>
                  </div>

                  {/* ─── Location & Experience ─── */}
                  <div className="flex items-center justify-center gap-3 text-xs text-charcoal/50 mb-3 flex-wrap">
                    {profile.city && profile.state && (
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {profile.city}, {profile.state}
                      </span>
                    )}
                    {profile.experience !== undefined && (
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {profile.experience}Y Exp
                      </span>
                    )}
                  </div>

                  {/* ─── Bio Preview ─── */}
                  {profile.bio && (
                    <p className="text-charcoal/50 text-xs leading-relaxed text-center line-clamp-2 mb-3">
                      {profile.bio}
                    </p>
                  )}

                  {/* ─── Equipment Tags ─── */}
                  {profile.equipments?.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                      {profile.equipments.slice(0, 3).map((item, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-beige text-charcoal/60 text-[10px] font-medium rounded-md border border-coffee/20"
                        >
                          {item}
                        </span>
                      ))}
                      {profile.equipments.length > 3 && (
                        <span className="px-2 py-0.5 bg-gold/10 text-gold text-[10px] font-medium rounded-md border border-gold/20">
                          +{profile.equipments.length - 3}
                        </span>
                      )}
                    </div>
                  )}

                  {/* ─── Action Button ─── */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/browse/${profile._id}`);
                    }}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-gold to-amber-600 text-charcoal text-sm font-medium hover:from-gold hover:to-amber-500 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AllPhotographerDetails;
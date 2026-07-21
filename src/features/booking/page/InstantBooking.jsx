import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useBooking } from "../hook/useBooking";
import DivineLoader from "../../shared/components/DivineLoader";

const PROFESSION_LABELS = { photographer: "Photographer", videographer: "Videographer", editor: "Editor" };

const InstantBooking = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { handleGetNearbyProviders, handleCreateBooking } = useBooking();
  const { loading } = useSelector((state) => state.booking);

  const [providers, setProviders] = useState([]);
  const [gettingLocation, setGettingLocation] = useState(true);
  const [locationError, setLocationError] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [bookingType, setBookingType] = useState("photographer");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [bookingError, setBookingError] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successBooking, setSuccessBooking] = useState(null);
  const modalRef = useRef(null);

  // Close modal on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setSelectedProvider(null);
        setBookingError("");
      }
    };
    if (selectedProvider) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedProvider]);

  useEffect(() => {
    getProviders();
  }, []);

  const getProviders = async () => {
    setGettingLocation(true);
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setGettingLocation(false);
      return;
    }

    try {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          enableHighAccuracy: true,
        });
      });

      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;

      const data = await handleGetNearbyProviders({ latitude, longitude });
      setProviders(data || []);
    } catch (geoError) {
      if (geoError.code === 1) {
        setLocationError("Location access denied. Please enable location services to find nearby photographers.");
      } else if (geoError.code === 2) {
        setLocationError("Unable to determine your location. Please try again.");
      } else {
        setLocationError("Failed to find nearby providers. Please try again.");
      }
    } finally {
      setGettingLocation(false);
    }
  };

  const handleBookNow = async () => {
    if (!selectedProvider || !bookingType) return;

    setBookingLoading(true);
    setBookingError("");
    setBookingSuccess(null);

    try {
      const booking = await handleCreateBooking({
        providerId: selectedProvider._id,
        bookingType,
      });
      setSuccessBooking(booking);
      setShowSuccessPopup(true);
      setSelectedProvider(null);
      setBookingType("photographer");
    } catch (err) {
      setBookingError(err.response?.data?.message || "Failed to create booking. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const getProviderMainProfession = (professions) => {
    if (!professions || professions.length === 0) return "photographer";
    const p = professions[0];
    return PROFESSION_LABELS[p] || p;
  };

  if (gettingLocation) {
    return <DivineLoader message="Finding photographers near you..." />;
  }

  if (locationError) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center bg-cream rounded-2xl border border-coffee/20 p-10 max-w-md shadow-sm">
          <div className="w-16 h-16 mx-auto mb-4 bg-amber-50 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-charcoal mb-2">Location Required</h2>
          <p className="text-charcoal/50 text-sm mb-6">{locationError}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={getProviders}
              className="h-[42px] px-6 text-[13px] font-semibold rounded-xl bg-gradient-to-r from-gold to-amber-600 text-charcoal hover:shadow-md transition-all"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/findProfile")}
              className="h-[42px] px-6 text-[13px] font-medium rounded-xl border border-coffee/20 text-charcoal/60 hover:bg-gold/5 transition-all"
            >
              Browse All Profiles
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-charcoal">Instant Booking</h1>
              <p className="text-charcoal/50 text-sm mt-1">
                Find photographers near you and book instantly
              </p>
            </div>
            <button
              onClick={getProviders}
              className="h-[38px] px-4 text-[12px] font-semibold rounded-lg border border-coffee/20 text-charcoal/60 hover:bg-gold/5 hover:border-gold/30 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
          <div className="flex items-center gap-2 mt-3 text-[12px] text-charcoal/40">
            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Showing providers within <strong>10km</strong> radius who are currently available</span>
          </div>
        </div>

        {/* Providers Grid */}
        {providers.length === 0 ? (
          <div className="text-center bg-white rounded-2xl border border-gray-100 p-12 shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Providers Nearby</h2>
            <p className="text-gray-500 text-sm mb-6">
              There are no available photographers within 10km of your location right now.
            </p>
            <button
              onClick={() => navigate("/findProfile")}
              className="h-[42px] px-6 text-[13px] font-semibold rounded-xl bg-gradient-to-r from-gold to-amber-600 text-charcoal hover:shadow-md transition-all"
            >
              Browse All Profiles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {providers.map((provider, index) => (
              <div
                key={provider._id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gold/30 transition-all duration-300 group"
                style={{ animation: `fadeSlideUp 0.4s ease-out ${index * 0.05}s both` }}
              >
                {/* Card Cover */}
                <div className="relative h-24 sm:h-28 bg-gradient-to-r from-walnut via-coffee to-walnut overflow-hidden">
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-sm rounded-lg px-2.5 py-1 shadow-sm z-10 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    <span className="text-[10px] font-semibold text-white">Available</span>
                  </div>
                </div>

                {/* Avatar */}
                <div className="relative px-4 pb-4">
                  <div className="flex justify-center -mt-10 mb-3">
                    <div className="relative">
                      <img
                        src={provider.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.user?.fullname || "P")}&background=D4AF37&color=2C2C2C&size=160`}
                        alt={provider.user?.fullname}
                        className="w-20 h-20 rounded-xl object-cover border-[3px] border-white shadow-md bg-white"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 w-3.5 h-3.5 rounded-full border-[2.5px] border-white" />
                    </div>
                  </div>

                  {/* Name & Profession */}
                  <div className="text-center mb-3">
                    <h3 className="text-base font-bold text-gray-900 truncate">
                      {provider.user?.fullname || "Unknown"}
                    </h3>
                    <p className="text-gold font-medium text-xs mt-0.5">
                      {Array.isArray(provider.profession)
                        ? provider.profession.map((p) => PROFESSION_LABELS[p] || p).join(" & ")
                        : provider.profession}
                    </p>
                  </div>

                  {/* Location & Experience */}
                  <div className="flex items-center justify-center gap-3 text-xs text-gray-500 mb-3 flex-wrap">
                    {provider.city && provider.state && (
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {provider.city}, {provider.state}
                      </span>
                    )}
                    {provider.experience !== undefined && (
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {provider.experience}Y Exp
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  {provider.pricePerHour > 0 && (
                    <div className="text-center mb-3">
                      <span className="text-lg font-bold text-gray-900">₹{provider.pricePerHour}</span>
                      <span className="text-xs text-gray-500">/hr</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => navigate(`/browse/${provider._id}`)}
                      className="w-full py-2 rounded-xl border-2 border-gold/30 text-charcoal text-sm font-medium hover:bg-gold/5 transition-all duration-200 active:scale-[0.98]"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => setSelectedProvider(provider)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-gold to-amber-600 text-charcoal text-sm font-medium hover:from-gold hover:to-amber-500 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
          <div
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-[slideUp_0.3s_ease-out]"
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-walnut to-coffee p-5 text-white">
              <div className="flex items-center gap-3">
                <img
                  src={selectedProvider.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedProvider.user?.fullname || "P")}&background=ffffff33&color=fff&size=80`}
                  alt=""
                  className="w-14 h-14 rounded-xl object-cover border-2 border-white/30"
                />
                <div>
                  <h3 className="text-lg font-bold">{selectedProvider.user?.fullname}</h3>
                  <p className="text-gold text-sm">
                    {getProviderMainProfession(selectedProvider.profession)}
                  </p>
                  {selectedProvider.city && (
                    <p className="text-cream/60 text-xs mt-0.5">
                      📍 {selectedProvider.city}{selectedProvider.state ? `, ${selectedProvider.state}` : ""}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5">
              <h4 className="text-[15px] font-semibold text-gray-900 mb-4">Confirm Instant Booking</h4>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                  <p className="text-[12px] text-amber-800">
                    This booking request will expire in <strong>15 minutes</strong>. The provider will be notified immediately.
                  </p>
                </div>
              </div>

              {/* Booking Type */}
              <div className="mb-4">
                <label className="block text-[12px] font-medium text-gray-600 mb-2 tracking-wide">Booking Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {["photographer", "videographer"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setBookingType(type)}
                      className={`h-[42px] rounded-xl text-[13px] font-medium border-2 transition-all ${
                        bookingType === type
                          ? "bg-gold border-gold text-charcoal shadow-sm"
                          : "bg-white border-gray-200 text-gray-600 hover:border-gold/40"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {bookingError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-[12px] text-red-600 flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {bookingError}
                </div>
              )}

              {/* Price Info */}
              {selectedProvider.pricePerHour > 0 && (
                <div className="flex items-center justify-between py-3 border-t border-gray-100 text-sm">
                  <span className="text-gray-500">Price per hour</span>
                  <span className="font-semibold text-gray-900">₹{selectedProvider.pricePerHour}</span>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-gray-100">
                <button
                  onClick={() => {
                    setSelectedProvider(null);
                    setBookingError("");
                  }}
                  disabled={bookingLoading}
                  className="flex-1 h-[42px] text-[13px] font-medium rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBookNow}
                  disabled={bookingLoading || !bookingType}
                  className="flex-1 h-[42px] text-[13px] font-semibold rounded-xl bg-gradient-to-r from-gold to-amber-600 text-charcoal hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  {bookingLoading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Booking Request"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && successBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center animate-[slideUp_0.3s_ease-out]">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Booking Request Sent!</h2>
            <p className="text-sm text-gray-500 mb-2">
              Your booking request for <strong className="text-gray-700">{successBooking.provider?.user?.fullname || "the photographer"}</strong> has been sent.
            </p>
            <p className="text-xs text-gray-400 mb-6">
              The provider has <strong>15 minutes</strong> to respond. You'll be notified when they accept or decline.
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowSuccessPopup(false);
                  setSuccessBooking(null);
                }}
                className="w-full h-[42px] text-[13px] font-semibold rounded-xl bg-gradient-to-r from-gold to-amber-600 text-charcoal hover:shadow-md transition-all"
              >
                Done
              </button>
              <button
                onClick={() => {
                  setShowSuccessPopup(false);
                  setSuccessBooking(null);
                  navigate("/my-bookings");
                }}
                className="w-full h-[42px] text-[13px] font-medium rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition-all"
              >
                View My Bookings
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default InstantBooking;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEventBooking } from "../hook/useEventBooking.js";
import DivineLoader from "../../shared/components/DivineLoader";

const PROFESSION_LABELS = { photographer: "Photographer", videographer: "Videographer", editor: "Editor" };
const EVENT_TYPES = ["Wedding", "Birthday", "Corporate", "Pre-Wedding", "Engagement", "Baby Shower", "Other"];

const EventBooking = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { eventProviders, loading, error: reduxError } = useSelector((state) => state.eventBooking);
  const { handleGetEventProviders, handleCreateEventBooking } = useEventBooking();

  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [bookingType, setBookingType] = useState("photographer");
  const [eventType, setEventType] = useState("Wedding");
  const [eventDate, setEventDate] = useState("");
  const [venue, setVenue] = useState("");
  const [city, setCity] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const getProviderMainProfession = (professions) => {
    if (!professions || professions.length === 0) return "photographer";
    const p = professions[0];
    return PROFESSION_LABELS[p] || p;
  };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const data = await handleGetEventProviders();
        setProviders(data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load providers");
      }
    };

    fetchProviders();
  }, []);

  const handleOpenModal = (provider) => {
    setSelectedProvider(provider);
    setBookingType("photographer");
    setEventType("Wedding");
    setEventDate("");
    setVenue("");
    setCity(provider.city || "");
    setError("");
    setSuccess(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProvider) return;

    setSubmitting(true);
    setError("");
    setSuccess(null);

    try {
      const payload = {
        provider: selectedProvider.userId || selectedProvider.profileId,
        bookingType,
        eventType,
        eventDate,
        venue,
        city,
      };

      const data = await handleCreateEventBooking(payload);
      setSuccess(data.booking || data);
      setSelectedProvider(null);
      setBookingType("photographer");
      setEventType("Wedding");
      setEventDate("");
      setVenue("");
      setCity("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send booking request");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading && providers.length === 0) {
    return <DivineLoader message="Finding event providers..." />;
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-charcoal">Event Booking</h1>
              <p className="text-charcoal/50 text-sm mt-1">
                Book a photographer or videographer for your next event, wedding, or celebration.
              </p>
            </div>
            <button
              onClick={() => navigate("/my-bookings")}
              className="h-[38px] px-4 text-[12px] font-semibold rounded-lg border border-coffee/20 text-charcoal/60 hover:bg-gold/5 hover:border-gold/30 transition-all"
            >
              View My Bookings
            </button>
          </div>
        </div>

        {(error || reduxError) && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error || reduxError}
          </div>
        )}

        {providers.length === 0 ? (
          <div className="text-center bg-white rounded-2xl border border-gray-100 p-12 shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No event providers found</h2>
            <p className="text-gray-500 text-sm">Please check back later for available photographers and videographers.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {providers.map((provider, index) => (
              <div
                key={provider.profileId}
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
                        src={provider.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(provider.name || "P")}&background=D4AF37&color=2C2C2C&size=160`}
                        alt={provider.name}
                        className="w-20 h-20 rounded-xl object-cover border-[3px] border-white shadow-md bg-white"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 w-3.5 h-3.5 rounded-full border-[2.5px] border-white" />
                    </div>
                  </div>

                  {/* Name & Profession */}
                  <div className="text-center mb-3">
                    <h3 className="text-base font-bold text-gray-900 truncate">
                      {provider.name || "Unknown"}
                    </h3>
                    <p className="text-gold font-medium text-xs mt-0.5">
                      {Array.isArray(provider.profession)
                        ? provider.profession.map((p) => PROFESSION_LABELS[p] || p).join(" & ")
                        : provider.profession}
                    </p>
                  </div>

                  {/* Location & Experience */}
                  <div className="flex items-center justify-center gap-3 text-xs text-gray-500 mb-3 flex-wrap">
                    {provider.city && (
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {provider.city}
                      </span>
                    )}
                    {provider.experience && (
                      <span className="inline-flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {provider.experience}Y Exp
                      </span>
                    )}
                  </div>

                  {/* Bio Preview */}
                  {provider.bio && (
                    <p className="text-gray-500 text-xs leading-relaxed text-center line-clamp-2 mb-3">
                      {provider.bio}
                    </p>
                  )}

                  {/* Price */}
                  {provider.price > 0 && (
                    <div className="text-center mb-3">
                      <span className="text-lg font-bold text-gray-900">₹{provider.price}</span>
                      <span className="text-xs text-gray-500">/hr</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => navigate(`/browse/${provider.profileId}`)}
                      className="w-full py-2 rounded-xl border-2 border-gold/30 text-charcoal text-sm font-medium hover:bg-gold/5 transition-all duration-200 active:scale-[0.98]"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => handleOpenModal(provider)}
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

      {selectedProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-3 py-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-5 sm:p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Book {selectedProvider.name || "this provider"}</h2>
                <p className="text-sm text-gray-500 mt-1">Share your event details and we'll send the request instantly.</p>
              </div>
              <button
                onClick={() => setSelectedProvider(null)}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-sm text-gray-700">
                  <span className="mb-1.5 block font-medium">Booking type</span>
                  <select
                    value={bookingType}
                    onChange={(e) => setBookingType(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/15"
                  >
                    <option value="photographer">Photographer</option>
                    <option value="videographer">Videographer</option>
                  </select>
                </label>

                <label className="text-sm text-gray-700">
                  <span className="mb-1.5 block font-medium">Event type</span>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/15"
                  >
                    {EVENT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-sm text-gray-700">
                  <span className="mb-1.5 block font-medium">Event date</span>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/15"
                    required
                  />
                </label>

                <label className="text-sm text-gray-700">
                  <span className="mb-1.5 block font-medium">City</span>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter your city"
                    className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/15"
                    required
                  />
                </label>
              </div>

              <label className="block text-sm text-gray-700">
                <span className="mb-1.5 block font-medium">Venue</span>
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="Enter venue or address"
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/15"
                  required
                />
              </label>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  Booking request sent successfully. You can view it in your bookings list.
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProvider(null)}
                  className="h-[38px] px-4 text-[12px] font-semibold rounded-lg border border-coffee/20 text-charcoal/60 hover:bg-gold/5 hover:border-gold/30 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="h-[38px] px-4 text-[12px] font-semibold rounded-lg bg-gradient-to-r from-gold to-amber-600 text-charcoal hover:shadow-md transition-all disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Send Booking Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
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

export default EventBooking;
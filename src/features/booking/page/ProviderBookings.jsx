import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useBooking } from "../hook/useBooking";
import { useEventBooking } from "../../eventbooking/hook/useEventBooking";
import CountdownTimer from "../components/CountdownTimer";
import DivineLoader from "../../shared/components/DivineLoader";

const STATUS_COLORS = {
    pending: "bg-amber-100 text-amber-700 border-amber-200",
    accepted: "bg-emerald-100 text-emerald-700 border-emerald-200",
    declined: "bg-red-100 text-red-700 border-red-200",
    expired: "bg-gray-100 text-gray-500 border-gray-200",
    completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const getBookingStatus = (booking) => booking?.bookingStatus || booking?.status || "pending";
const formatDateTime = (value) =>
    new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

const ProviderBookings = () => {
    const { handleGetProviderBookings, handleAcceptBooking, handleDeclineBooking, handleGoAvailable, handleCompleteBooking } = useBooking();
    const { handleGetProviderEventBookings, handleAcceptEventBooking, handleDeclineEventBooking } = useEventBooking();
    const { providerBookings, loading } = useSelector((state) => state.booking);
    const { providerEventBookings, loading: eventLoading } = useSelector((state) => state.eventBooking);

    useEffect(() => {
        handleGetProviderBookings();
        handleGetProviderEventBookings();
    }, []);

    const pendingInstantBookings = providerBookings.filter((b) => getBookingStatus(b) === "pending");
    const otherInstantBookings = providerBookings.filter((b) => getBookingStatus(b) !== "pending");
    const pendingEventBookings = providerEventBookings.filter((b) => getBookingStatus(b) === "pending");
    const otherEventBookings = providerEventBookings.filter((b) => getBookingStatus(b) !== "pending");
    const [availableLoading, setAvailableLoading] = useState(false);
    const [isNowAvailable, setIsNowAvailable] = useState(false);

    if ((loading || eventLoading) && providerBookings.length === 0 && providerEventBookings.length === 0) {
        return <DivineLoader message="Loading booking requests..." />;
    }

    const handleMarkAvailable = async () => {
        setAvailableLoading(true);
        try {
            await handleGoAvailable();
            setIsNowAvailable(true);
            setTimeout(() => setIsNowAvailable(false), 3000);
        } finally {
            setAvailableLoading(false);
        }
    };

    const hasAnyBookings = providerBookings.length > 0 || providerEventBookings.length > 0;

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Booking Requests</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage incoming instant and event booking requests from clients</p>
                    </div>
                    <button
                        onClick={handleMarkAvailable}
                        disabled={availableLoading || isNowAvailable}
                        className={`h-[38px] px-4 text-[12px] font-semibold rounded-lg transition-all flex items-center gap-2 ${isNowAvailable
                                ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                : "bg-white border border-gray-200 text-gray-600 hover:border-emerald-400 hover:text-emerald-600"
                            } disabled:opacity-50`}
                    >
                        <span className={`w-2 h-2 rounded-full ${isNowAvailable ? "bg-emerald-500" : "bg-gray-400"}`} />
                        {isNowAvailable ? "You're available!" : availableLoading ? "Updating..." : "Go Available"}
                    </button>
                </div>
                {!hasAnyBookings ? (
                    <div className="text-center bg-white rounded-2xl border border-gray-100 p-12 shadow-sm">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">No Booking Requests</h2>
                        <p className="text-gray-500 text-sm">When clients book your services, requests will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {pendingInstantBookings.length > 0 && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                                    Instant Pending Requests ({pendingInstantBookings.length})
                                </h2>
                                <div className="space-y-4">
                                    {pendingInstantBookings.map((booking) => (
                                        <div key={booking._id} className="bg-white rounded-2xl border border-amber-200 p-5 sm:p-6 shadow-sm">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-center gap-4 min-w-0">
                                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                                        {booking.user?.fullname?.charAt(0)?.toUpperCase() || "?"}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h3 className="text-[15px] font-semibold text-gray-900 truncate">
                                                            {booking.user?.fullname || "Client"}
                                                        </h3>
                                                        <p className="text-[13px] text-gray-500 capitalize">
                                                            {booking.bookingType} booking
                                                        </p>
                                                        <p className="text-[12px] text-gray-400 mt-0.5">
                                                            {formatDateTime(booking.createdAt)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-1.5 shrink-0">
                                                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${STATUS_COLORS.pending}`}>
                                                        Pending
                                                    </span>
                                                    {booking.expiresAt && <CountdownTimer expiresAt={booking.expiresAt} />}
                                                </div>
                                            </div>
                                            {booking.user?.email && (
                                                <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-2 text-[12px] text-gray-500">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    {booking.user.email}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-50">
                                                <button onClick={() => handleAcceptBooking(booking._id)} disabled={loading} className="h-[38px] px-5 text-[12px] font-semibold rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-md hover:shadow-emerald-500/20 transition-all disabled:opacity-50 flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Accept
                                                </button>
                                                <button onClick={() => handleDeclineBooking(booking._id)} disabled={loading} className="h-[38px] px-5 text-[12px] font-semibold rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-all disabled:opacity-50 flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    Decline
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {pendingEventBookings.length > 0 && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse"></span>
                                    Event Pending Requests ({pendingEventBookings.length})
                                </h2>
                                <div className="space-y-4">
                                    {pendingEventBookings.map((booking) => (
                                        <div key={booking._id} className="bg-violet-50 rounded-2xl border border-violet-200 p-5 sm:p-6 shadow-sm">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h3 className="text-[15px] font-semibold text-gray-900">
                                                            {booking.user?.fullname || "Client"}
                                                        </h3>
                                                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-violet-100 text-violet-700">
                                                            Event Booking
                                                        </span>
                                                    </div>
                                                    <p className="text-[13px] text-gray-500 capitalize mt-1">{booking.bookingType}</p>
                                                    <p className="text-[12px] text-gray-400 mt-0.5">Requested {formatDateTime(booking.createdAt)}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${STATUS_COLORS.pending}`}>
                                                    Pending
                                                </span>
                                            </div>
                                            <div className="mt-4 grid gap-2 sm:grid-cols-2 text-[12px] text-gray-600">
                                                <div className="rounded-xl bg-white/80 px-3 py-2">
                                                    <span className="block text-[10px] uppercase tracking-wide text-gray-400">Event Type</span>
                                                    <span className="font-medium text-gray-700">{booking.eventType}</span>
                                                </div>
                                                <div className="rounded-xl bg-white/80 px-3 py-2">
                                                    <span className="block text-[10px] uppercase tracking-wide text-gray-400">Date</span>
                                                    <span className="font-medium text-gray-700">{booking.eventDate ? formatDateTime(booking.eventDate) : "Not provided"}</span>
                                                </div>
                                                <div className="rounded-xl bg-white/80 px-3 py-2">
                                                    <span className="block text-[10px] uppercase tracking-wide text-gray-400">Venue</span>
                                                    <span className="font-medium text-gray-700">{booking.venue || "Not provided"}</span>
                                                </div>
                                                <div className="rounded-xl bg-white/80 px-3 py-2">
                                                    <span className="block text-[10px] uppercase tracking-wide text-gray-400">City</span>
                                                    <span className="font-medium text-gray-700">{booking.city || "Not provided"}</span>
                                                </div>
                                            </div>
                                            {booking.user?.email && (
                                                <div className="mt-3 pt-3 border-t border-violet-100 flex items-center gap-2 text-[12px] text-gray-500">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                    {booking.user.email}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-violet-100">
                                                <button onClick={() => handleAcceptEventBooking(booking._id)} disabled={eventLoading} className="h-[38px] px-5 text-[12px] font-semibold rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-md hover:shadow-emerald-500/20 transition-all disabled:opacity-50 flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                    Accept
                                                </button>
                                                <button onClick={() => handleDeclineEventBooking(booking._id)} disabled={eventLoading} className="h-[38px] px-5 text-[12px] font-semibold rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-all disabled:opacity-50 flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                    Decline
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {otherInstantBookings.length > 0 && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Instant History</h2>
                                <div className="space-y-3">
                                    {otherInstantBookings.map((booking) => {
                                        const status = getBookingStatus(booking);
                                        return (
                                            <div key={booking._id} className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 shadow-sm">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white font-bold shrink-0">
                                                            {booking.user?.fullname?.charAt(0)?.toUpperCase() || "?"}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h3 className="text-[14px] font-semibold text-gray-900 truncate">
                                                                {booking.user?.fullname || "Client"}
                                                            </h3>
                                                            <p className="text-[12px] text-gray-500 capitalize">{booking.bookingType}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${STATUS_COLORS[status] || "bg-gray-100 text-gray-500"}`}>
                                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                                        </span>
                                                        {status === "accepted" && (
                                                            <button onClick={() => handleCompleteBooking(booking._id)} disabled={loading} className="h-[30px] px-3 text-[11px] font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-all disabled:opacity-50">
                                                                Mark Completed
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {otherEventBookings.length > 0 && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Event History</h2>
                                <div className="space-y-3">
                                    {otherEventBookings.map((booking) => {
                                        const status = getBookingStatus(booking);
                                        return (
                                            <div key={booking._id} className="bg-violet-50 rounded-xl border border-violet-200 p-4 sm:p-5 shadow-sm">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <h3 className="text-[14px] font-semibold text-gray-900">{booking.user?.fullname || "Client"}</h3>
                                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-violet-100 text-violet-700">Event Booking</span>
                                                        </div>
                                                        <p className="text-[12px] text-gray-500 capitalize mt-1">{booking.bookingType}</p>
                                                        <p className="text-[12px] text-gray-500 mt-1">{booking.eventType} • {booking.venue}</p>
                                                    </div>
                                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${STATUS_COLORS[status] || "bg-gray-100 text-gray-500"}`}>
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProviderBookings;  
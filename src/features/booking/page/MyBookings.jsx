import React, { useEffect } from "react";
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

const MyBookings = () => {
    const { handleGetMyBookings, handleCompleteBooking } = useBooking();
    const { handleGetMyEventBookings } = useEventBooking();
    const { myBookings, loading } = useSelector((state) => state.booking);
    const { myEventBookings, loading: eventLoading } = useSelector((state) => state.eventBooking);

    useEffect(() => {
        handleGetMyBookings();
        handleGetMyEventBookings();
    }, []);

    const showSpinner = (loading || eventLoading) && myBookings.length === 0 && myEventBookings.length === 0;

    if (showSpinner) {
        return <DivineLoader message="Loading your bookings..." />;
    }

    const hasAnyBookings = myBookings.length > 0 || myEventBookings.length > 0;

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Bookings</h1>
                    <p className="text-gray-500 text-sm mt-1">Track all your instant and event photography bookings</p>
                </div>

                {!hasAnyBookings ? (
                    <div className="text-center bg-white rounded-2xl border border-gray-100 p-12 shadow-sm">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">No Bookings Yet</h2>
                        <p className="text-gray-500 text-sm">When you book a photographer for an instant session or an event, your bookings will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {myBookings.length > 0 && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Instant Bookings</h2>
                                <div className="space-y-4">
                                    {myBookings.map((booking) => {
                                        const status = getBookingStatus(booking);
                                        return (
                                            <div key={booking._id} className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex items-center gap-4 min-w-0">
                                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-amber-600 flex items-center justify-center text-charcoal font-bold text-lg shrink-0">
                                                            {booking.provider?.user?.fullname?.charAt(0)?.toUpperCase() || "?"}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h3 className="text-[15px] font-semibold text-gray-900 truncate">
                                                                {booking.provider?.user?.fullname || "Photographer"}
                                                            </h3>
                                                            <p className="text-[13px] text-gray-500 capitalize">
                                                                {booking.bookingType}
                                                            </p>
                                                            <p className="text-[12px] text-gray-400 mt-0.5">
                                                                Booked {formatDateTime(booking.createdAt)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2 shrink-0">
                                                        <span className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${STATUS_COLORS[status] || "bg-gray-100 text-gray-600"}`}>
                                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                                        </span>
                                                        {status === "pending" && booking.expiresAt && <CountdownTimer expiresAt={booking.expiresAt} />}
                                                    </div>
                                                </div>
                                                {booking.provider?.city && (
                                                    <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-2 text-[12px] text-gray-500">
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        {booking.provider.city}
                                                    </div>
                                                )}
                                                {status === "accepted" && (
                                                    <div className="mt-3 pt-3 border-t border-emerald-50 flex items-center justify-between gap-2 text-[12px] text-emerald-700 font-medium">
                                                        <div className="flex items-center gap-2">
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                            Your booking was accepted! The provider will be in touch soon.
                                                        </div>
                                                            <button onClick={() => handleCompleteBooking(booking._id)} className="h-[30px] px-3 text-[11px] font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-all">
                                                            Mark Completed
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {myEventBookings.length > 0 && (
                            <div>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Event Bookings</h2>
                                <div className="space-y-4">
                                    {myEventBookings.map((booking) => {
                                        const status = getBookingStatus(booking);
                                        return (
                                            <div key={booking._id} className="bg-violet-50 rounded-2xl border border-violet-200 p-5 sm:p-6 shadow-sm">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <h3 className="text-[15px] font-semibold text-gray-900">
                                                                {booking.provider?.fullname || "Event Provider"}
                                                            </h3>
                                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-violet-100 text-violet-700">
                                                                Event Booking
                                                            </span>
                                                        </div>
                                                        <p className="text-[13px] text-gray-500 capitalize mt-1">{booking.bookingType}</p>
                                                        <p className="text-[12px] text-gray-400 mt-0.5">Requested {formatDateTime(booking.createdAt)}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${STATUS_COLORS[status] || "bg-gray-100 text-gray-600"}`}>
                                                        {status.charAt(0).toUpperCase() + status.slice(1)}
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

export default MyBookings;
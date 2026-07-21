import { useDispatch } from "react-redux";
import {
    setMyBookings,
    setProviderBookings,
    updateProviderBookingStatus,
    updateMyBookingStatus,
    setLoading,
    setError,
    clearError,
} from "../state/booking.slice.js";
import {
    getNearbyProviders as getNearbyProvidersApi,
    createBooking as createBookingApi,
    getMyBookings,
    getProviderBookings,
    acceptBooking as acceptBookingApi,
    declineBooking as declineBookingApi,
    markAvailable as markAvailableApi,
    completeBooking as completeBookingApi
} from "../service/booking.api.js";

export const useBooking = () => {
    const dispatch = useDispatch();

    async function handleGetNearbyProviders({ latitude, longitude }) {
        try {
            dispatch(setLoading(true));
            dispatch(clearError());
            const data = await getNearbyProvidersApi({ latitude, longitude });
            // API returns { success, providers }
            return data.providers;
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to find nearby providers";
            dispatch(setError(msg));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleCreateBooking({ providerId, bookingType }) {
        try {
            dispatch(setLoading(true));
            dispatch(clearError());
            const data = await createBookingApi({ providerId, bookingType });
            // API returns { success, booking }
            return data.booking;
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to create booking";
            dispatch(setError(msg));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetMyBookings() {
        try {
            dispatch(setLoading(true));
            dispatch(clearError());
            const data = await getMyBookings();
            // API returns { success, bookings }
            dispatch(setMyBookings(data.bookings));
            return data.bookings;
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to fetch bookings";
            dispatch(setError(msg));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGetProviderBookings() {
        try {
            dispatch(setLoading(true));
            dispatch(clearError());
            const data = await getProviderBookings();
            // API returns { success, bookings }
            dispatch(setProviderBookings(data.bookings));
            return data.bookings;
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to fetch bookings";
            dispatch(setError(msg));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleAcceptBooking(bookingId) {
        try {
            dispatch(setLoading(true));
            dispatch(clearError());
            const data = await acceptBookingApi(bookingId);
            // API returns { success, message, booking }
            // Optimistically update the list item instead of re-fetching everything
            dispatch(updateProviderBookingStatus({ bookingId, booking: data.booking }));
            return data;
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to accept booking";
            dispatch(setError(msg));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleDeclineBooking(bookingId) {
        try {
            dispatch(setLoading(true));
            dispatch(clearError());
            const data = await declineBookingApi(bookingId);
            // API returns { success, message, booking }
            // Optimistically update the list item instead of re-fetching everything
            dispatch(updateProviderBookingStatus({ bookingId, booking: data.booking }));
            return data;
        } catch (error) {
            const msg = error.response?.data?.message || "Failed to decline booking";
            dispatch(setError(msg));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleGoAvailable() {
        try {
            dispatch(setLoading(true));
            const data = await markAvailableApi();
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to update availability"));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleCompleteBooking(bookingId) {
        try {
            dispatch(setLoading(true));
            dispatch(clearError());
            const data = await completeBookingApi(bookingId);
            dispatch(updateProviderBookingStatus({ bookingId, booking: data.booking }));
            dispatch(updateMyBookingStatus({ bookingId, booking: data.booking }));
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to complete booking"));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleGetNearbyProviders,
        handleCreateBooking,
        handleGetMyBookings,
        handleGetProviderBookings,
        handleAcceptBooking,
        handleDeclineBooking,
        handleGoAvailable,
        handleCompleteBooking
    };
};
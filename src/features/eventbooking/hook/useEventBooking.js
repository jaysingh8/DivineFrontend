import { useDispatch } from "react-redux";
import {
  setEventProviders,
  setMyEventBookings,
  setProviderEventBookings,
  addMyEventBooking,
  updateProviderEventBookingStatus,
  updateMyEventBookingStatus,
  setEventBookingLoading,
  setEventBookingError,
  clearEventBookingError,
} from "../state/eventBooking.slice.js";
import {
  getEventProviders as getEventProvidersApi,
  createEventBooking as createEventBookingApi,
  getMyEventBookings as getMyEventBookingsApi,
  getProviderEventBookings as getProviderEventBookingsApi,
  acceptEventBooking as acceptEventBookingApi,
  declineEventBooking as declineEventBookingApi,
} from "../service/eventBooking.api.js";

export const useEventBooking = () => {
  const dispatch = useDispatch();

  const handleGetEventProviders = async () => {
    try {
      dispatch(setEventBookingLoading(true));
      dispatch(clearEventBookingError());
      const data = await getEventProvidersApi();
      dispatch(setEventProviders(data.serviceProvider || []));
      return data.serviceProvider || [];
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to load providers";
      dispatch(setEventBookingError(msg));
      throw error;
    } finally {
      dispatch(setEventBookingLoading(false));
    }
  };

  const handleCreateEventBooking = async (payload) => {
    try {
      dispatch(setEventBookingLoading(true));
      dispatch(clearEventBookingError());
      const data = await createEventBookingApi(payload);
      dispatch(addMyEventBooking(data.booking));
      return data;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to send booking request";
      dispatch(setEventBookingError(msg));
      throw error;
    } finally {
      dispatch(setEventBookingLoading(false));
    }
  };

  const handleGetMyEventBookings = async () => {
    try {
      dispatch(setEventBookingLoading(true));
      dispatch(clearEventBookingError());
      const data = await getMyEventBookingsApi();
      dispatch(setMyEventBookings(data.bookings || data.booking || []));
      return data.bookings || data.booking || [];
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch event bookings";
      dispatch(setEventBookingError(msg));
      throw error;
    } finally {
      dispatch(setEventBookingLoading(false));
    }
  };

  const handleGetProviderEventBookings = async () => {
    try {
      dispatch(setEventBookingLoading(true));
      dispatch(clearEventBookingError());
      const data = await getProviderEventBookingsApi();
      dispatch(setProviderEventBookings(data.bookings || []));
      return data.bookings || [];
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to fetch provider event bookings";
      dispatch(setEventBookingError(msg));
      throw error;
    } finally {
      dispatch(setEventBookingLoading(false));
    }
  };

  const handleAcceptEventBooking = async (bookingId) => {
    try {
      dispatch(setEventBookingLoading(true));
      dispatch(clearEventBookingError());
      const data = await acceptEventBookingApi(bookingId);
      dispatch(updateProviderEventBookingStatus({ bookingId, booking: data.booking }));
      dispatch(updateMyEventBookingStatus({ bookingId, booking: data.booking }));
      return data;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to accept event booking";
      dispatch(setEventBookingError(msg));
      throw error;
    } finally {
      dispatch(setEventBookingLoading(false));
    }
  };

  const handleDeclineEventBooking = async (bookingId) => {
    try {
      dispatch(setEventBookingLoading(true));
      dispatch(clearEventBookingError());
      const data = await declineEventBookingApi(bookingId);
      dispatch(updateProviderEventBookingStatus({ bookingId, booking: data.booking }));
      dispatch(updateMyEventBookingStatus({ bookingId, booking: data.booking }));
      return data;
    } catch (error) {
      const msg = error.response?.data?.message || "Failed to decline event booking";
      dispatch(setEventBookingError(msg));
      throw error;
    } finally {
      dispatch(setEventBookingLoading(false));
    }
  };

  return {
    handleGetEventProviders,
    handleCreateEventBooking,
    handleGetMyEventBookings,
    handleGetProviderEventBookings,
    handleAcceptEventBooking,
    handleDeclineEventBooking,
  };
};

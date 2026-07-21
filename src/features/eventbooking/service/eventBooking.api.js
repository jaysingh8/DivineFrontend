import axios from "axios";

const eventBookingApiInstance = axios.create({
  baseURL:  import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export async function getEventProviders() {
  const response = await eventBookingApiInstance.get("/api/events/eventBooking");
  return response.data;
}

export async function createEventBooking(payload) {
  const response = await eventBookingApiInstance.post("/api/events/create-booking", payload);
  return response.data;
}

export async function getMyEventBookings() {
  const response = await eventBookingApiInstance.get("/api/events/my-booking");
  return response.data;
}

export async function getProviderEventBookings() {
  const response = await eventBookingApiInstance.get("/api/events/provider-bookings");
  return response.data;
}

export async function acceptEventBooking(bookingId) {
  const response = await eventBookingApiInstance.patch(`/api/events/accept/${bookingId}`);
  return response.data;
}

export async function declineEventBooking(bookingId) {
  const response = await eventBookingApiInstance.patch(`/api/events/decline/${bookingId}`);
  return response.data;
}

export default eventBookingApiInstance;

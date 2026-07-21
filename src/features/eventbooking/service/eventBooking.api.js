import axios from "axios";

const eventBookingApiInstance = axios.create({
  baseURL: "http://localhost:3000/api/events",
  withCredentials: true,
});

export async function getEventProviders() {
  const response = await eventBookingApiInstance.get("/eventBooking");
  return response.data;
}

export async function createEventBooking(payload) {
  const response = await eventBookingApiInstance.post("/create-booking", payload);
  return response.data;
}

export async function getMyEventBookings() {
  const response = await eventBookingApiInstance.get("/my-booking");
  return response.data;
}

export async function getProviderEventBookings() {
  const response = await eventBookingApiInstance.get("/provider-bookings");
  return response.data;
}

export async function acceptEventBooking(bookingId) {
  const response = await eventBookingApiInstance.patch(`/accept/${bookingId}`);
  return response.data;
}

export async function declineEventBooking(bookingId) {
  const response = await eventBookingApiInstance.patch(`/decline/${bookingId}`);
  return response.data;
}

export default eventBookingApiInstance;

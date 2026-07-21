import axios from "axios";

const bookingApiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export async function getNearbyProviders({ latitude, longitude }) {
  const response = await bookingApiInstance.post("/api/booking/nearby", { latitude, longitude });
  return response.data;
}

export async function createBooking({ providerId, bookingType }) {
  const response = await bookingApiInstance.post("/api/booking/create", { providerId, bookingType });
  return response.data;
}

export async function getMyBookings() {
  const response = await bookingApiInstance.get("/api/booking/my-bookings");
  return response.data;
}

export async function getProviderBookings() {
  const response = await bookingApiInstance.get("/api/booking/provider-bookings");
  return response.data;
}

export async function acceptBooking(bookingId) {
  const response = await bookingApiInstance.put(`/api/booking/accept/${bookingId}`);
  return response.data;
}

export async function declineBooking(bookingId) {
  const response = await bookingApiInstance.put(`/api/booking/decline/${bookingId}`);
  return response.data;
}

export async function markAvailable() {
    const response = await bookingApiInstance.patch("/api/booking/go-available");
    return response.data;
}

export async function completeBooking(bookingId) {
    const response = await bookingApiInstance.patch(`/api/booking/complete/${bookingId}`);
    return response.data;
}

export default bookingApiInstance;
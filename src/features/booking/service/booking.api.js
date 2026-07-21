import axios from "axios";

const bookingApiInstance = axios.create({
  baseURL: `http://localhost:3000/api/booking`,
  withCredentials: true,
});

export async function getNearbyProviders({ latitude, longitude }) {
  const response = await bookingApiInstance.post("/nearby", { latitude, longitude });
  return response.data;
}

export async function createBooking({ providerId, bookingType }) {
  const response = await bookingApiInstance.post("/create", { providerId, bookingType });
  return response.data;
}

export async function getMyBookings() {
  const response = await bookingApiInstance.get("/my-bookings");
  return response.data;
}

export async function getProviderBookings() {
  const response = await bookingApiInstance.get("/provider-bookings");
  return response.data;
}

export async function acceptBooking(bookingId) {
  const response = await bookingApiInstance.put(`/accept/${bookingId}`);
  return response.data;
}

export async function declineBooking(bookingId) {
  const response = await bookingApiInstance.put(`/decline/${bookingId}`);
  return response.data;
}

export async function markAvailable() {
    const response = await bookingApiInstance.patch("/go-available");
    return response.data;
}

export async function completeBooking(bookingId) {
    const response = await bookingApiInstance.patch(`/complete/${bookingId}`);
    return response.data;
}

export default bookingApiInstance;
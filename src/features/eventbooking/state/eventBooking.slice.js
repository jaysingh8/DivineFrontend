import { createSlice } from "@reduxjs/toolkit";

const eventBookingSlice = createSlice({
  name: "eventBooking",
  initialState: {
    eventProviders: [],
    myEventBookings: [],
    providerEventBookings: [],
    loading: false,
    error: null,
  },
  reducers: {
    setEventProviders: (state, action) => {
      state.eventProviders = action.payload;
    },
    setMyEventBookings: (state, action) => {
      state.myEventBookings = action.payload;
    },
    setProviderEventBookings: (state, action) => {
      state.providerEventBookings = action.payload;
    },
    addMyEventBooking: (state, action) => {
      state.myEventBookings.unshift(action.payload);
    },
    updateProviderEventBookingStatus: (state, action) => {
      const { bookingId, booking, status } = action.payload;
      const index = state.providerEventBookings.findIndex((item) => item._id === bookingId);
      if (index !== -1) {
        state.providerEventBookings[index] = booking ?? {
          ...state.providerEventBookings[index],
          bookingStatus: status,
        };
      }
    },
    updateMyEventBookingStatus: (state, action) => {
      const { bookingId, booking, status } = action.payload;
      const index = state.myEventBookings.findIndex((item) => item._id === bookingId);
      if (index !== -1) {
        state.myEventBookings[index] = booking ?? {
          ...state.myEventBookings[index],
          bookingStatus: status,
        };
      }
    },
    setEventBookingLoading: (state, action) => {
      state.loading = action.payload;
    },
    setEventBookingError: (state, action) => {
      state.error = action.payload;
    },
    clearEventBookingError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setEventProviders,
  setMyEventBookings,
  setProviderEventBookings,
  addMyEventBooking,
  updateProviderEventBookingStatus,
  updateMyEventBookingStatus,
  setEventBookingLoading,
  setEventBookingError,
  clearEventBookingError,
} = eventBookingSlice.actions;

export default eventBookingSlice.reducer;

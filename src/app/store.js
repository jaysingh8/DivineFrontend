import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/states/auth.slice'
import profileReducer from '../features/serviceProvider/state/profile.slice'
import bookingReducer from '../features/booking/state/booking.slice'
import eventBookingReducer from '../features/eventbooking/state/eventBooking.slice'
export const store = configureStore({
    reducer:{
        auth:authReducer,
        profile:profileReducer,
        booking:bookingReducer,
        eventBooking:eventBookingReducer
    }
})

import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, Outlet } from 'react-router'
import ProtectedRoute from '../features/auth/components/ProtectedRoute'
import AppLayout from './AppLayout'
import DivineLoader from '../features/shared/components/DivineLoader'

// Lazy-loaded page components — they only load when the user visits that route
const Register = lazy(() => import('../features/auth/page/Register'))
const Login = lazy(() => import('../features/auth/page/Login'))
const Profile = lazy(() => import('../features/serviceProvider/pages/Profile'))
const Portfolio = lazy(() => import('../features/serviceProvider/pages/Portfolio'))
const Default = lazy(() => import('../features/serviceProvider/pages/Default'))
const BrowseProfiles = lazy(() => import('../features/serviceProvider/pages/BrowseProfiles'))
const MyProfile = lazy(() => import('../features/serviceProvider/pages/MyProfile'))
const PhotographerDashboard = lazy(() => import('../features/serviceProvider/pages/PhotographerDashboard'))
const AllPhotograherDetails = lazy(() => import('../features/serviceProvider/pages/AllPhotograherDetails'))
const ServiceProviderHome = lazy(() => import('../features/serviceProvider/pages/ServiceProviderHome'))
const MyBookings = lazy(() => import('../features/booking/page/MyBookings'))
const ProviderBookings = lazy(() => import('../features/booking/page/ProviderBookings'))
const InstantBooking = lazy(() => import('../features/booking/page/InstantBooking'))
const EventBooking = lazy(() => import('../features/eventbooking/page/EventBooking'))

// Loading fallback shown while a page chunk is loading
const PageLoader = () => <DivineLoader message="Loading..." />

// Wraps a route element with Suspense for lazy loading
const LazyRoute = ({ children }) => (
  <Suspense fallback={<PageLoader />}>
    {children}
  </Suspense>
)

export const routes = createBrowserRouter([
    { path: "/register", element: <LazyRoute><Register /></LazyRoute> },
    { path: "/login", element: <LazyRoute><Login /></LazyRoute> },
    {
        element: <AppLayout />,
        children: [
            { path: "/", element: <LazyRoute><Default /></LazyRoute> },
            {
                path: "/profile",
                element: (
                    <ProtectedRoute role="getter">
                        <LazyRoute><Profile /></LazyRoute>
                    </ProtectedRoute>
                )
            },
            {
                path: "/browse/:id",
                element: (
                    <ProtectedRoute role="user">
                        <LazyRoute><BrowseProfiles /></LazyRoute>
                    </ProtectedRoute>
                )
            },
            {
                path: "/portfolio",
                element: (
                    <ProtectedRoute role="getter">
                        <LazyRoute><Portfolio /></LazyRoute>
                    </ProtectedRoute>
                )
            },
            { path: "/dashboard/profile", element: <LazyRoute><MyProfile /></LazyRoute> },
            {
                path: "/dashboard",
                element: (
                    <ProtectedRoute role="getter">
                        <LazyRoute><PhotographerDashboard /></LazyRoute>
                    </ProtectedRoute>
                )
            },
            {
                path: "/findProfile",
                element: (
                    <ProtectedRoute role="user">
                        <LazyRoute><AllPhotograherDetails /></LazyRoute>
                    </ProtectedRoute>
                )
            },
            {
                path: "/serviceProviderHome",
                element: (
                    <ProtectedRoute role="getter">
                        <LazyRoute><ServiceProviderHome /></LazyRoute>
                    </ProtectedRoute>
                )
            },
            {
                path: "/instant-booking",
                element: (
                    <ProtectedRoute role="user">
                        <LazyRoute><InstantBooking /></LazyRoute>
                    </ProtectedRoute>
                )
            },
            {
                path: "/my-bookings",
                element: (
                    <ProtectedRoute role="user">
                        <LazyRoute><MyBookings /></LazyRoute>
                    </ProtectedRoute>
                )
            },
            {
                path: "/event-booking",
                element: (
                    <ProtectedRoute role="user">
                        <LazyRoute><EventBooking /></LazyRoute>
                    </ProtectedRoute>
                )
            },
            {
                path: "/provider-bookings",
                element: (
                    <ProtectedRoute role="getter">
                        <LazyRoute><ProviderBookings /></LazyRoute>
                    </ProtectedRoute>
                )
            }
        ]
    }
])

export default routes
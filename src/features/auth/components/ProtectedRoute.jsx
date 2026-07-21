import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

const ProtectedRoute = ({ children, role }) => {
    const user = useSelector(state => state.auth.user)

    if (!user) {
        return <Navigate to="/login" />
    }

    // If a specific role is required, check it
    if (role && user.role !== role) {
        // Redirect based on user's actual role
        if (user.role === "getter") {
            return <Navigate to="/dashboard" />
        }
        return <Navigate to="/" />
    }

    return children
}

export default ProtectedRoute
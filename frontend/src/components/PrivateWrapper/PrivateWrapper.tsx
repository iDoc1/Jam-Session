import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

interface PrivateWrapperProps {
    isAuthenticated: null | boolean,
    loading: boolean
}

/**
 * This function returns a wrapper component that redirects user to the login page if the
 * isAuthenticated state is false. If the loading state is true, then returns null. This
 * function was adapted from the following resource:
 * https://stackoverflow.com/questions/66289122/how-to-create-a-protected-route
 */
export default function PrivateWrapper({isAuthenticated, loading}: PrivateWrapperProps) {
    // Do not redirect to login if authentication state is still loading
    if (isAuthenticated === null || loading) {
        return null;
    }

    // Redirect to login if isAuthenticated is false
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
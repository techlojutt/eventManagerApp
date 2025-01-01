import React from 'react'
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';




function PrivateRoute({children}) {
    const isAuthenticated = useSelector((store) => store.authSlice.isAuthenticated);
  return ( isAuthenticated ? children : <Navigate to="/login"/>)
}

export default PrivateRoute
import {React} from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

function PublicRoute({children}) {
    const isAuthenticated = useSelector((store) => store.authSlice.isAuthenticated);
   return !isAuthenticated ? children : <Navigate to="/"/>
}

export default PublicRoute
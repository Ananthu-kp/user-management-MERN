import React from 'react'
import Header from './Header'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = () => {
    const userData = useSelector(state => state.user.userData);
    if (!userData) {
        
        return <Navigate to="/userLogin" replace />
    } 
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default ProtectedRoute;

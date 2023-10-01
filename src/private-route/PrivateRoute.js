import React from 'react'
import { Navigate } from 'react-router-dom'

import { toast } from 'react-toastify';
import { getCookie, deleteCookie, isExpiredToken } from '../utils/functions';

const PrivateRoute = ({ children }) => {
    const token = getCookie("token");
    if (token !== null) {
        const expire = isExpiredToken(token)
        if (expire) {
            toast.error('Your session has expired try relogin!')
            deleteCookie("token")
            return <Navigate to='/login' />
        } else {
            return children;
        }
    } else {
        deleteCookie("token")
        toast.error('Your session has expired try relogin!')
        return <Navigate to='/login' />
    }
}
export default PrivateRoute
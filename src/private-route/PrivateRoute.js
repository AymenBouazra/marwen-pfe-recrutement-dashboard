import React from 'react'
import { Navigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { toast } from 'react-toastify';
const isExpiredToken = (token) => {
    const decoded = jwt_decode(token);
    return Math.floor(new Date().getTime() / 1000) >= decoded.exp
}
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName.trim() === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null;
}
function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}
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
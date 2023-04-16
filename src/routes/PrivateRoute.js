import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from "../service/AuthService";

const PrivateRoute = () => {
    let token = getToken();
    return (
        token ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoute;


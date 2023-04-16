import React from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from "../service/AuthService";

const PublicRoute = () => {
    let token = getToken();
    return (
        !token ? <Outlet /> : <Navigate to='/premium-content' />
    )
}

export default PublicRoute;


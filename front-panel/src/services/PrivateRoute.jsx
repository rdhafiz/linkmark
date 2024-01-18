// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getCookie } from './cookies.jsx';

export const LoginCheck = ({ component: Component, ...rest }) => {
    const authToken = getCookie('authToken');

    if (!authToken) {
        return <Navigate to="/auth/login" />;
    }

    return <Component {...rest} />;
};

export const AuthCheck = ({ component: Component, ...rest }) => {
    const authToken = getCookie('authToken');

    if (authToken) {
        return <Navigate to="/" />;
    }

    return <Component {...rest} />;
};

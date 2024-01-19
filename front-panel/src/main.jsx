import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider, useNavigate} from 'react-router-dom';
import {LoginCheck, AuthCheck} from "./services/PrivateRoute.jsx";

import {getCookie} from './services/cookies.jsx'; // Assuming 'cookies.jsx' is in the same directory
const hasCookie = getCookie('authToken');

/* Layouts */
import AuthLayout from './layouts/AuthLayout.jsx';
import MainLayout from './layouts/MainLayout.jsx';

/* Pages */

/*Authentication pages*/
import Login from './auth/login.jsx';
import Forgot from './auth/forgot.jsx';
import Register from './auth/register.jsx';

/*Main pages*/
import Home from './pages/home.jsx';
import Profile from './pages/profile.jsx';

/* Bootstrap css */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


/* Custom scss */
import './stylesheets/styles.scss';


// Define the route configuration based on the existence of the cookie


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <LoginCheck component={Home} /> },
            { path: '/Profile', element: <LoginCheck component={Profile} /> },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            { path: 'login', element: <AuthCheck component={Login} /> },
            { path: 'register', element: <AuthCheck component={Register} /> },
            { path: 'forgot', element: <AuthCheck component={Forgot} /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

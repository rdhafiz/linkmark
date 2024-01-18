import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";

/*Layouts*/
import AuthLayout from './layouts/AuthLayout.jsx'
import MainLayout from "./layouts/MainLayout.jsx";


/*Pages*/
import Login from "./auth/login.jsx";
import Forgot from "./auth/forgot.jsx";
import Reset from "./auth/reset.jsx";
import Register from "./auth/register.jsx";
import Home from "./pages/home.jsx";
import Profile from "./pages/profile.jsx";

/*Bootstrap css*/
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

/*Custom scss*/
import './stylesheets/styles.scss'

const router = createBrowserRouter(
    [
        {
            path:'/',
            element:<AuthLayout/>,
            children:[
                {path:'/', element:<Login/>},
                {path:'/register', element:<Register/>},
                {path:'/forgot', element:<Forgot/>},
                {path:'/reset', element:<Reset/>},
            ]
        },
        {
            path:'/',
            element:<MainLayout/>,
            children:[
                {path:'/home', element:<Home/>},
                {path:'/Profile', element:<Profile/>},
            ]
        },
    ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

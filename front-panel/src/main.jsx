import React from 'react'
import ReactDOM from 'react-dom/client'
import AuthLayout from './layouts/AuthLayout.jsx'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./auth/login.jsx";
import Forgot from "./auth/forgot.jsx";
import Reset from "./auth/reset.jsx";
import 'bootstrap/dist/css/bootstrap.min.css'
import './stylesheets/styles.scss'

const router = createBrowserRouter(
    [
        {
            path:'/',
            element:<AuthLayout/>,
            children:[
                {path:'/', element:<Login/>},
                {path:'/forgot', element:<Forgot/>},
                {path:'/reset', element:<Reset/>},
            ]
        }
    ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

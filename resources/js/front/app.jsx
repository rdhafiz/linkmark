import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./auth/login.jsx";
import Dashboard from "./pages/dashboard.jsx";

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
);

const container = document.getElementById('app');
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    container
);

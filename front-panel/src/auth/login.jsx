import React, { useState } from "react";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { IoLockClosedOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.jsx";
import { renderError } from '../services/RenderError.jsx';
import { handleInputChange } from '../services/InputUtils.jsx';

const Login = () => {
    const navigate = useNavigate();

    // State for form data, loading status, and errors
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Handle input changes dynamically
    const onInputChanges = (e) => {
        handleInputChange(e, formData, setFormData);
    };

    // Handle sign-in logic
    const signIn = async () => {
        setErrors({});
        try {
            setIsLoading(true);
            // Make API request to sign in
            const result = await api.post('/auth/login', formData);
            if (result.access_token) {
                // If successful, update state and navigate to home
                setIsLoading(false);
                setCookie('authToken', result.access_token, { expires: 7 });
                setCookie('userInfo', JSON.stringify(result.data), { expires: 7 });
                navigate("/");
            } else {
                // If unsuccessful, set errors
                setErrors(result);
                setIsLoading(false);
            }
        } catch (error) {
            // Handle API request error
            setIsLoading(false);
            console.error("Error during login:", error);
        }
    };

    return (
        <div className="sign-in-form">
            {/* Form title */}
            <h2 className="form-title">Sign in</h2>
            {/* Sign-in form */}
            <form onSubmit={(e) => { e.preventDefault(); signIn(); }} className="register-form" id="login-form">
                {/* Email input */}
                <div className="form-group form-theme has-icon-left mb-3">
                    <label htmlFor="email" className="input-icon"><i><RiAccountPinCircleLine /></i></label>
                    <input
                        type="text"
                        value={formData.email}
                        onChange={onInputChanges}
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Email Address"
                        aria-label="Email Address"
                    />
                    {renderError("email", errors)}
                </div>
                {/* Password input */}
                <div className="form-group form-theme has-icon-left mb-2">
                    <label htmlFor="password" className="input-icon"><i><IoLockClosedOutline /></i></label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={onInputChanges}
                        name="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        aria-label="Password"
                    />
                    {renderError("password", errors)}
                </div>
                {/* Forgot password link */}
                <div className="form-group text-end mb-3">
                    <Link to="/auth/forgot">Forgot Password</Link>
                </div>
                {/* Sign-in button */}
                <div className="form-group text-start mb-3">
                    <button
                        type="submit"
                        name="signin"
                        id="signin"
                        disabled={isLoading}
                        className="btn btn-theme btn-auth w-100"
                        aria-label={isLoading ? 'Signing in...' : 'Sign In'}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </div>
                {/* Registration link */}
                <div className="form-group text-center mb-3">
                    Do not have an account? <Link to="/auth/register">Register Now</Link>
                </div>
                {/* General errors */}
                {renderError("general", errors)}
            </form>
        </div>
    );
};

export default Login;

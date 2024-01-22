import React, { useState } from "react";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { IoLockClosedOutline, IoMailOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.jsx";
import { setCookie } from "../services/cookies.jsx";
import { renderError } from "../services/RenderError.jsx";
import { handleInputChange } from "../services/InputUtils.jsx";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const onInputChange = (event) => {
        handleInputChange(event, formData, setFormData);
    };

    const signUp = async () => {
        setErrors({});
        try {
            setIsLoading(true);
            const result = await api.post('/auth/register', formData);
            if (result.access_token) {
                setIsLoading(false);
                setCookie('authToken', result.access_token, { expires: 7 });
                setCookie('userInfo', JSON.stringify(result.data), { expires: 7 });
                navigate("/");
            } else {
                setErrors(result);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error during register:", error);
        }
    };

    return (
        <div className="sign-in-form">
            <h2 className="form-title">Sign up</h2>
            <form onSubmit={(e) => { e.preventDefault(); signUp(); }} className="register-form" id="login-form">
                {/* Name input */}
                <div className="form-group form-theme has-icon-left mb-3">
                    <label htmlFor="name" className="input-icon"><i><RiAccountPinCircleLine /></i></label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        placeholder="Name"
                        value={formData.name}
                        onChange={onInputChange}
                        aria-label="Name"
                    />
                    {renderError("name", errors)}
                </div>
                {/* Email input */}
                <div className="form-group form-theme has-icon-left mb-3">
                    <label htmlFor="email" className="input-icon"><i><IoMailOutline /></i></label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="form-control"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={onInputChange}
                        aria-label="Email Address"
                    />
                    {renderError("email", errors)}
                </div>
                {/* Password input */}
                <div className="form-group form-theme has-icon-left mb-2">
                    <label htmlFor="password" className="input-icon"><i><IoLockClosedOutline /></i></label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={onInputChange}
                        aria-label="Password"
                    />
                    {renderError("password", errors)}
                </div>
                {/* Password confirmation input */}
                <div className="form-group form-theme has-icon-left mb-2">
                    <label htmlFor="password_confirmation" className="input-icon"><i><IoLockClosedOutline /></i></label>
                    <input
                        type="password"
                        name="password_confirmation"
                        className="form-control"
                        id="password_confirmation"
                        placeholder="Repeat Password"
                        value={formData.password_confirmation}
                        onChange={onInputChange}
                        aria-label="Repeat Password"
                    />
                    {renderError("password_confirmation", errors)}
                </div>
                <br />
                {/* Sign-up button */}
                <div className="form-group text-start">
                    <button
                        type="submit"
                        name="signin"
                        id="signin"
                        disabled={isLoading}
                        className="btn btn-theme btn-auth w-100"
                        aria-label={isLoading ? 'Signing Up...' : 'Sign Up'}
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </div>
                <br />
                {/* Sign-in link */}
                <div className="form-group text-center mb-3">
                    Already have an account? <Link to={'/'}> Sign in</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;

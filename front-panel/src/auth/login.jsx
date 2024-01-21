import React, {useState} from "react";

// Icons
import { RiAccountPinCircleLine } from "react-icons/ri";
import { IoLockClosedOutline } from "react-icons/io5";
import { setCookie } from '../services/cookies.jsx';


// Link to replace anchor tag <a></a>
import {Link, Navigate, redirect, useNavigate} from "react-router-dom";
import api from "../services/api.jsx";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSignIn = async () => {
        setErrors({});
        try {
            setIsLoading(true);
            const result = await api.post('/auth/login', formData);
            if (result.access_token) {
                setIsLoading(false);
                setCookie('authToken', result.access_token, { expires: 7 });
                setCookie('userInfo', JSON.stringify(result.data), { expires: 7 });
                navigate("/")
            } else {
                setErrors(result);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error during login:", error);
        }
    };

    const renderError = (fieldName) => {
        if (errors[fieldName]) {
            return <div className="text-danger">{errors[fieldName]}</div>;
        }
        return null;
    };


    return (
        <>
            <div className="sign-in-form">
                <h2 className="form-title">Sign in</h2>
                <form method="POST"  onSubmit={(e) => {e.preventDefault();handleSignIn();}} className="register-form" id="login-form">
                    <div className="form-group form-theme has-icon-left mb-3">
                        <label htmlFor={'email'} className="input-icon"><i ><RiAccountPinCircleLine /></i></label>
                        <input type="text" value={formData.email} onChange={handleInputChange} name="email" id="email" className={'form-control'} placeholder="Email Address"/>
                        {renderError("email")}
                    </div>
                    <div className="form-group form-theme has-icon-left mb-2">
                        <label htmlFor={'password'} className="input-icon"><i ><IoLockClosedOutline /></i></label>
                        <input type="password" value={formData.password} onChange={handleInputChange}  name="password" className={'form-control'} id="password" placeholder="Password"/>
                        {renderError("password")}
                    </div>
                    <div className="form-group text-end mb-3">
                        <Link  to={'/auth/forgot'}>Forgot Password</Link>
                    </div>
                    <div className="form-group text-start mb-3">
                        <button type="submit" name="signin" id="signin" disabled={isLoading} className="btn btn-theme btn-auth w-100" >{isLoading ? 'Signing in...' : 'Sign In'}</button>
                    </div>
                    <div className="form-group text-center mb-3">
                        Do not have an account? <Link  to={'/auth/register'}> Register Now</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;

import React, {useState} from "react";

// Icons
import { RiAccountPinCircleLine } from "react-icons/ri";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMarkEmailRead } from "react-icons/md";

// Link to replace anchor tag <a></a>
import {Link, Navigate, redirect, useNavigate} from "react-router-dom";
import api from "../services/api.jsx";
import {setCookie} from "../services/cookies.jsx";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
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
    const handleSignUp = async () => {
        setErrors({});
        try {
            setIsLoading(true);
            const result = await api.post('/auth/register', formData);
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
            console.error("Error during register:", error);
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
                <h2 className="form-title">Sign up</h2>
                <form method="POST" className="register-form" id="login-form" onSubmit={(e) => {e.preventDefault();handleSignUp();}}>
                    <div className="form-group form-theme has-icon-left mb-3">
                        <label htmlFor={'name'} className="input-icon"><i ><RiAccountPinCircleLine /></i></label>
                        <input type="text" name="name" id="name" className={'form-control'} placeholder="Name" value={formData.name} onChange={handleInputChange}/>
                        {renderError("name")}
                    </div>
                    <div className="form-group form-theme has-icon-left mb-3">
                        <label htmlFor={'email'} className="input-icon"><i ><MdOutlineMarkEmailRead /></i></label>
                        <input type="text" name="email" id="email" className={'form-control'} placeholder="Email Address" value={formData.email} onChange={handleInputChange} />
                        {renderError("email")}
                    </div>
                    <div className="form-group form-theme has-icon-left mb-2">
                        <label htmlFor={'password'} className="input-icon"><i ><IoLockClosedOutline /></i></label>
                        <input type="password" name="password" className={'form-control'} id="password" placeholder="Password" value={formData.password} onChange={handleInputChange}/>
                        {renderError("password")}
                    </div>
                    <div className="form-group form-theme has-icon-left mb-2">
                        <label htmlFor={'password_confirmation'} className="input-icon"><i ><IoLockClosedOutline /></i></label>
                        <input type="password" name="password_confirmation" className={'form-control'} id="password_confirmation" placeholder="Repeat Password" value={formData.password_confirmation} onChange={handleInputChange}/>
                        {renderError("password_confirmation")}
                    </div>
                    <br/>
                    <div className="form-group text-start">
                        <button type="submit" name="signin" id="signin" disabled={isLoading} className="btn btn-theme btn-auth w-100" >{isLoading ? 'Signing Up...' : 'Sign up'}</button>
                    </div>
                    <br/>
                    <div className="form-group text-center mb-3">
                        Already have an account? <Link  to={'/'}> Sign in</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;

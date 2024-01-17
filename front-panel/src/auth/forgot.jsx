import React, {useState} from "react";

// Link to replace anchor tag <a></a>
import {Link} from "react-router-dom";

// Icons
import { MdAlternateEmail } from "react-icons/md";
import api from "../services/api.jsx";
import {setCookie} from "../services/cookies.jsx";

const Forgot = () => {
    const [formData, setFormData] = useState({
        email: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleForgotPassword = async () => {
        try {
            setIsLoading(true);
            const result = await api.post('/auth/forgot/password', formData);
            if (result.msg) {
                setIsLoading(false);
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
                <h2 className="form-title">Send Request</h2>
                <form method="POST" className="register-form" id="login-form" onSubmit={(e) => {e.preventDefault();handleForgotPassword();}}>
                    <div className="form-group form-theme has-icon-left mb-3">
                        <label htmlFor={'email'} className="input-icon"><i ><MdAlternateEmail /></i></label>
                        <input type="text" name="email" id="email" className={'form-control'} placeholder="Email"  value={formData.email} onChange={handleInputChange}/>
                        {renderError("email")}
                    </div>
                    <div className="form-group text-start mb-3">
                        <button type="submit" name="signin" id="signin" disabled={isLoading} className="btn btn-theme btn-auth w-100" >{isLoading ? 'Sending...' : 'Send'}</button>
                    </div>
                    <div className="form-group text-center">
                        <p>Remembered your password?</p>
                        <Link to={'/'}>Back to Login</Link>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Forgot;

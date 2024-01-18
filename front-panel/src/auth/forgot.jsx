import React, {useState} from "react";

// Link to replace anchor tag <a></a>
import {Link} from "react-router-dom";

// Icons
import { MdAlternateEmail } from "react-icons/md";
import api from "../services/api.jsx";
import {GoCode} from "react-icons/go";
import {IoLockClosedOutline} from "react-icons/io5";


const Forgot = () => {
    const [formData, setFormData] = useState({
        email: "",
    });

    const [formDataReset, setFormDataReset] = useState({
        email: "",
        reset_code: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [isResetCompleted, setIsResetCompleted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleResetInputChange = (e) => {
        const { name, value } = e.target;
        setFormDataReset({
            ...formDataReset,
            [name]: value,
        });
    };

    const handleFormSubmission = async (e) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        try {
            const endpoint = isReset ? '/auth/reset/password' : '/auth/forgot/password';
            const result = await api.post(endpoint, isReset ? formDataReset : formData);

            if (result.msg) {
                setIsLoading(false);
                setFormDataReset(() => ({
                    ...formDataReset,
                    email: formData.email,
                }));
                if(isReset){
                    setIsResetCompleted(true);
                }
                setIsReset(true);
            } else {
                setIsLoading(false);
                setErrors(result);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error during form submission:", error);
            setErrors({ generic: "An error occurred. Please try again." });
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
                {!isResetCompleted && (
                    <>
                        <h2 className="form-title">{isReset ? 'Reset' : 'Send Request'}</h2>
                        <form method="POST" className="register-form" id="login-form" onSubmit={handleFormSubmission}>
                            {!isReset && (
                                <div className="form-group form-theme has-icon-left mb-3">
                                    <label htmlFor={'email'} className="input-icon"><i><MdAlternateEmail /></i></label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        className={'form-control'}
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                    {renderError("email")}
                                </div>
                            )}

                            {isReset && (
                                <>
                                    <input type="hidden" name="email" id="email" className={'form-control'} placeholder="email" value={formDataReset.email} />

                                    <div className="form-group form-theme has-icon-left mb-3">
                                        <label htmlFor={'reset_code'} className="input-icon"><i ><GoCode /></i></label>
                                        <input type="text" name="reset_code" id="reset_code" className={'form-control'} placeholder="Reset Code" value={formDataReset.reset_code} onChange={handleResetInputChange}/>
                                        {renderError("reset_code")}
                                    </div>
                                    <div className="form-group form-theme has-icon-left mb-3">
                                        <label htmlFor={'password'} className="input-icon"><i ><IoLockClosedOutline /></i></label>
                                        <input type="password" name="password" id="password" className={'form-control'} placeholder="New Password"  value={formDataReset.password} onChange={handleResetInputChange}/>
                                        {renderError("password")}
                                    </div>
                                    <div className="form-group form-theme has-icon-left mb-3">
                                        <label htmlFor={'password_confirmation'} className="input-icon"><i ><IoLockClosedOutline /></i></label>
                                        <input type="password" name="password_confirmation" id="password_confirmation" className={'form-control'} placeholder="Repeat Password"  value={formDataReset.password_confirmation} onChange={handleResetInputChange}/>
                                        {renderError("password_confirmation")}
                                    </div>
                                </>
                            )}

                            <div className="form-group text-start mb-3">
                                <button
                                    type="submit"
                                    name="signin"
                                    id="signin"
                                    disabled={isLoading}
                                    className="btn btn-theme btn-auth w-100"
                                >
                                    {isReset? (<>{isLoading ? 'Changing...' : 'Change Password'}</>) : (<>{isLoading ? 'Sending...' : 'Send'}</>)}
                                </button>
                            </div>

                            <div className="form-group text-center">
                                <p>Remembered your password?</p>
                                <Link to={'/'}>Back to Login</Link>
                            </div>
                        </form>
                    </>
                )}
                {isResetCompleted && (
                    <>
                        <div className={'text-center'}>
                            <h6 className="form-title">Password has been updated successfully.</h6>
                            <div className="form-group text-center">
                                <Link to={'/'}>Back to Login</Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Forgot;

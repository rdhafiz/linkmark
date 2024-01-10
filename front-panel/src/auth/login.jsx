// Login.jsx

import React, { useState } from "react";
import signInImage from '../assets/images/auth/signin-image.jpg'
import { RiAccountPinCircleLine } from "react-icons/ri";
import { IoLockClosedOutline } from "react-icons/io5";
import {Link} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        // Perform authentication logic here (e.g., API call, validation)

        // For demonstration purposes, a basic check is done
        if (username === "user" && password === "password") {
        } else {
            alert("Invalid credentials. Please try again.");
        }
    };

    return (
        <section className="sign-in">
            <div className="wrapper">
                <div className="sign-in-content">
                    <div className="sign-in-image">
                        <figure><img src={signInImage} alt="sing up image" /></figure>
                    </div>

                    <div className="sign-in-form">
                        <h2 className="form-title">Sign up</h2>
                        <form method="POST" className="register-form" id="login-form">
                            <div className="form-group form-theme has-icon-left mb-3">
                                <label htmlFor={'your_name'} className="input-icon"><i ><RiAccountPinCircleLine /></i></label>
                                <input type="text" name="your_name" id="your_name" className={'form-control'} placeholder="Your Name"/>
                            </div>
                            <div className="form-group form-theme has-icon-left mb-2">
                                <label htmlFor={'your_name'} className="input-icon"><i ><IoLockClosedOutline /></i></label>
                                <input type="password" name="your_pass" className={'form-control'} id="your_pass" placeholder="Password"/>
                            </div>
                            <div className="form-group text-end mb-3">
                                <Link  to={'/forgot'}>Forgot Password</Link>
                            </div>
                            <div className="form-group text-start">
                                <button type="button" name="signin" id="signin" className="btn btn-theme btn-auth w-50" >Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;

// Login.jsx

import React, { useState } from "react";
import signInImage from '../assets/images/auth/signin-image.jpg'
import {Link} from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";

const Forgot = () => {

    return (
        <section className="sign-in">
            <div className="wrapper">
                <div className="sign-in-content">
                    <div className="sign-in-image">
                        <figure><img src={signInImage} alt="sing up image" /></figure>
                    </div>

                    <div className="sign-in-form">
                        <h2 className="form-title">Send Request</h2>
                        <form method="POST" className="register-form" id="login-form">
                            <div className="form-group form-theme has-icon-left mb-3">
                                <label htmlFor={'email'} className="input-icon"><i ><MdAlternateEmail /></i></label>
                                <input type="text" name="email" id="email" className={'form-control'} placeholder="Email"/>
                            </div>
                            <div className="form-group text-start mb-3">
                                <Link to={'/reset'} id="signin" className="btn btn-theme btn-auth w-50" >Send</Link>
                            </div>
                            <div className="form-group text-center">
                                <p>Remembered your password?</p>
                                <Link to={'/'}>Back to Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Forgot;

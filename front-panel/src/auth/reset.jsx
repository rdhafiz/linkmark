// Login.jsx

import React, { useState } from "react";
import signInImage from '../assets/images/auth/signin-image.jpg'
import {Link} from "react-router-dom";
import { IoLockClosedOutline } from "react-icons/io5";
import { GoCode } from "react-icons/go";

const Reset = () => {

    return (
        <section className="sign-in">
            <div className="wrapper">
                <div className="sign-in-content">
                    <div className="sign-in-image">
                        <figure><img src={signInImage} alt="sing up image" /></figure>
                    </div>

                    <div className="sign-in-form">
                        <h2 className="form-title w-100">Reset</h2>
                        <form method="POST" className="register-form" id="login-form">
                            <div className="form-group form-theme has-icon-left mb-3">
                                <label htmlFor={'code'} className="input-icon"><i ><GoCode /></i></label>
                                <input type="text" name="code" id="code" className={'form-control'} placeholder="Code"/>
                            </div>
                            <div className="form-group form-theme has-icon-left mb-3">
                                <label htmlFor={'password'} className="input-icon"><i ><IoLockClosedOutline /></i></label>
                                <input type="password" name="password" id="password" className={'form-control'} placeholder="New Password"/>
                            </div>
                            <div className="form-group form-theme has-icon-left mb-3">
                                <label htmlFor={'confirm_password'} className="input-icon"><i ><IoLockClosedOutline /></i></label>
                                <input type="password" name="confirm_password" id="confirm_password" className={'form-control'} placeholder="Repeat Password"/>
                            </div>
                            <div className="form-group text-start mb-3">
                                <button type="button" name="signin" id="signin" className="btn btn-theme btn-auth w-50" >Submit</button>
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

export default Reset;

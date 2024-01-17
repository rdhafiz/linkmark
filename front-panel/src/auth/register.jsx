import React from "react";

// Icons
import { RiAccountPinCircleLine } from "react-icons/ri";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMarkEmailRead } from "react-icons/md";

// Link to replace anchor tag <a></a>
import {Link} from "react-router-dom";

const Register = () => {
    return (
        <>
            <div className="sign-in-form">
                <h2 className="form-title">Sign up</h2>
                <form method="POST" className="register-form" id="login-form">
                    <div className="form-group form-theme has-icon-left mb-3">
                        <label htmlFor={'your_name'} className="input-icon"><i ><RiAccountPinCircleLine /></i></label>
                        <input type="text" name="your_name" id="your_name" className={'form-control'} placeholder="Your Name"/>
                    </div>
                    <div className="form-group form-theme has-icon-left mb-3">
                        <label htmlFor={'email'} className="input-icon"><i ><MdOutlineMarkEmailRead /></i></label>
                        <input type="text" name="email" id="email" className={'form-control'} placeholder="Email Address"/>
                    </div>
                    <div className="form-group form-theme has-icon-left mb-2">
                        <label htmlFor={'your_pass'} className="input-icon"><i ><IoLockClosedOutline /></i></label>
                        <input type="password" name="your_pass" className={'form-control'} id="your_pass" placeholder="Password"/>
                    </div>
                    <div className="form-group form-theme has-icon-left mb-2">
                        <label htmlFor={'pass_confirmation'} className="input-icon"><i ><IoLockClosedOutline /></i></label>
                        <input type="password" name="pass_confirmation" className={'form-control'} id="pass_confirmation" placeholder="Repeat Password"/>
                    </div>
                    <br/>
                    <div className="form-group text-start">
                        <button type="button" name="signin" id="signin" className="btn btn-theme btn-auth w-100" >Sign Up</button>
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

import React from "react";

// Icons
import { RiAccountPinCircleLine } from "react-icons/ri";
import { IoLockClosedOutline } from "react-icons/io5";

// Link to replace anchor tag <a></a>
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <>
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
        </>
    );
};

export default Login;

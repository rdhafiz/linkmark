import React from "react";
import {Outlet} from "react-router-dom";
// Images

import signInImage from "../assets/images/auth/signin-image.jpg";


function AuthLayout() {
    return (
        <>
            <main className={'main'}>
                <section className="sign-in">
                    <div className="wrapper">
                        <div className="sign-in-content">
                            {/* Side Image */}
                            <div className="sign-in-image">
                                <figure><img src={signInImage} alt="sing up image" /></figure>
                            </div>

                            {/* Form */}
                            <Outlet />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default AuthLayout

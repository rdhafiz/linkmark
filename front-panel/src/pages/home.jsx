import React from "react";


import '../stylesheets/pages/home.scss'

// icons
import {IoLink} from "react-icons/io5";
import { FcFolder } from "react-icons/fc";

function Home() {
    return (
        <>
            <div className="home container">
                <div className="home-content p-3">
                    <div className="link-box rounded-3 shadow-sm">
                        <div
                            className="link-box-cover rounded-top-3 d-flex justify-content-center align-items-center">
                            <i><IoLink/></i>
                        </div>
                        <div className="link-box-content p-3 bg-dark rounded-bottom-3">
                            <h5 className="title fw-bold">Title</h5>
                            <p className="small desc mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            <p className="link">https://github.com</p>
                        </div>
                    </div>

                    <div className="link-box rounded-3 shadow-sm">
                        <div
                            className="link-box-cover rounded-top-3 d-flex justify-content-center align-items-center">
                            <i><IoLink/></i>
                        </div>
                        <div className="link-box-content p-3 bg-dark rounded-bottom-3">
                            <h5 className="title fw-bold">Title</h5>
                            <p className="small desc mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            <p className="link">https://github.com</p>
                        </div>
                    </div>

                    <div className="link-box rounded-3 shadow-sm">
                        <div
                            className="link-box-cover rounded-top-3 d-flex justify-content-center align-items-center">
                            <i><IoLink/></i>
                        </div>
                        <div className="link-box-content p-3 bg-dark rounded-bottom-3">
                            <h5 className="title fw-bold">Title</h5>
                            <p className="small desc mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            <p className="link">https://github.com</p>
                        </div>
                    </div>

                    <div className="link-box rounded-3 shadow-sm">
                        <div
                            className="link-box-cover rounded-top-3 d-flex justify-content-center align-items-center">
                            <i><IoLink/></i>
                        </div>
                        <div className="link-box-content p-3 bg-dark rounded-bottom-3">
                            <h5 className="title fw-bold">Title</h5>
                            <p className="small desc mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            <p className="link">https://github.com</p>
                        </div>
                    </div>

                    <div className="link-box rounded-3 shadow-sm">
                        <div
                            className="link-box-cover folder rounded-top-3 d-flex justify-content-center align-items-center">
                            <FcFolder />
                        </div>
                        <div className="link-box-content p-3 bg-dark rounded-bottom-3">
                            <h5 className="title fw-bold">Title</h5>
                            <p className="small desc mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            <p className="link">https://github.com</p>
                        </div>
                    </div>

                    <div className="link-box rounded-3 shadow-sm">
                        <div
                            className="link-box-cover rounded-top-3 d-flex justify-content-center align-items-center">
                            <i><IoLink/></i>
                        </div>
                        <div className="link-box-content p-3 bg-dark rounded-bottom-3">
                            <h5 className="title fw-bold">Title</h5>
                            <p className="small desc mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                            <p className="link">https://github.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home

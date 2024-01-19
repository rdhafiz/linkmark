import React from "react";


import '../stylesheets/pages/home.scss'

// icons
import {IoLink} from "react-icons/io5";
import {FcFolder} from "react-icons/fc";
import { FaPlus } from "react-icons/fa6";

function Home() {
    return (
        <>
            <div className="home container">

                <div className="mx-3 my-4 text-end">
                    <button type="button" className="btn btn-theme width-120" data-bs-toggle="modal"
                            data-bs-target="#resourceModal">Add   <i><FaPlus /></i>
                    </button>
                </div>
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
                            <FcFolder/>
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


                <div className="modal fade" id="resourceModal" tabIndex="-1" aria-labelledby="resourceModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <h1 className="modal-title fs-5" id="resourceModalLabel">Add New Resource</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <form action="">
                                <div className="modal-body px-4">
                                    <div className="form-group form-theme mb-4">
                                        <label htmlFor="" className="form-label">Title</label>
                                        <input type="text" className="form-control ps-0" placeholder="Enter a title."/>
                                    </div>

                                    <div className="form-group form-theme mb-4">
                                        <label htmlFor="" className="form-label">URL</label>
                                        <input type="text" className="form-control ps-0" placeholder="Enter URL"/>
                                    </div>

                                    <div className="form-group form-theme mb-4">
                                        <label htmlFor="" className="form-label">Select Folder</label>
                                        <select name="" className="form-select form-control ps-0" id="">
                                            <option value="">Select a folder</option>
                                            <option value="">Option 1</option>
                                            <option value="">Option 2</option>
                                            <option value="">Option 3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer border-0">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel
                                    </button>
                                    <button type="button" className="btn btn-theme">Confirm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Home

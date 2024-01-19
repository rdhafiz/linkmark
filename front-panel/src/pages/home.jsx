import React, {useRef, useState} from "react";


import '../stylesheets/pages/home.scss'

// icons
import {IoLink} from "react-icons/io5";
import {FcFolder} from "react-icons/fc";
import { FaPlus } from "react-icons/fa6";
import {Button, Modal} from "react-bootstrap";

function Home() {
    const modalRef = useRef(null);

    const [isResourceModalVisible, setResourceModalVisibility] = useState(false);
    const toggleResourceModal = () => {
        setResourceModalVisibility(!isResourceModalVisible);
    };

    return (
        <>
            <div className="home container">

                <div className="mx-3 my-4 text-end">
                    <button type="button" className="btn btn-theme width-120" onClick={() => toggleResourceModal()}>Add   <i><FaPlus /></i>
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



                {/*Resource modal start*/}
                <Modal show={isResourceModalVisible} onHide={toggleResourceModal} ref={modalRef} centered>
                    <Modal.Header closeButton className="border-0">
                        <Modal.Title>Add New Resource</Modal.Title>
                    </Modal.Header>
                    <form autoComplete="off">
                        <Modal.Body className="px-4">
                            <div className="form-group form-theme mb-4">
                                <label htmlFor="" className="form-label">Title</label>
                                <input type="text" className="form-control ps-0" autoComplete="new title" placeholder="Enter a title."/>
                            </div>

                            <div className="form-group form-theme mb-4">
                                <label htmlFor="" className="form-label">URL</label>
                                <input type="text" className="form-control ps-0" autoComplete="new URL" placeholder="Enter URL"/>
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
                        </Modal.Body>
                        <Modal.Footer className="border-0">
                            <Button className="w-25" variant="secondary" onClick={toggleResourceModal}>
                                Close
                            </Button>
                            <Button variant="theme" type="submit"
                                    className="btn btn-theme w-25">Confirm</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                {/*Resource modal end  */}


            </div>
        </>
    )
}

export default Home

import React, {useRef, useState} from "react";


import '../stylesheets/pages/home.scss'

// icons
import {IoLink} from "react-icons/io5";
import {FcFolder} from "react-icons/fc";
import { FaPlus } from "react-icons/fa6";
import {Button, Modal} from "react-bootstrap";
import api from "../services/api.jsx";
import {setCookie} from "../services/cookies.jsx";

function Home() {
    const [formData, setFormData] = useState({
        title: "",
        parent_id: '0',
        url: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const modalRef = useRef(null);

    const [isResourceModalVisible, setResourceModalVisibility] = useState(false);
    const toggleResourceModal = () => {
        resetForm()
        setResourceModalVisibility(!isResourceModalVisible);
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleBookmarkManage = async () => {
        setErrors({});
        try {
            setIsLoading(true);
            const result = await api.post('/resource/create', formData);
            if (result.data) {
                setIsLoading(false);
                toggleResourceModal();
                resetForm()
            } else {
                setErrors(result);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error during bookmark create:", error);
        }
    };

    const renderError = (fieldName) => {
        if (errors[fieldName]) {
            return <div className="text-danger">{errors[fieldName]}</div>;
        }
        return null;
    };

    const resetForm = () => {
        setFormData({
            title: "",
            parent_id: '0',
            url: "",
        })
    }

    return (
        <>
            <div className="home container">

                <div className="mx-3 my-4 text-end">
                    <button type="button" className="btn btn-theme width-120" onClick={() => toggleResourceModal()}>Add   <i><FaPlus /></i>
                    </button>
                </div>
                <div className="home-content p-3">
                    {/*Link*/}
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
                    {/*Folder*/}
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
                </div>



                {/*Resource modal start*/}
                <Modal show={isResourceModalVisible} onHide={toggleResourceModal} ref={modalRef} centered>
                    <Modal.Header closeButton className="border-0">
                        <Modal.Title>New Bookmark</Modal.Title>
                    </Modal.Header>
                    <form autoComplete="off" onSubmit={(e) => {
                        e.preventDefault();
                        handleBookmarkManage();
                    }}>
                        <Modal.Body className="px-4">
                            <div className="form-group form-theme mb-4">
                                <input type="text" className="form-control ps-0"
                                       autoComplete='new-title'
                                       value={formData.title}
                                       name={'title'}
                                       onChange={handleInputChange}
                                       placeholder="Enter a title."/>
                                {renderError("title")}
                            </div>

                            <div className="form-group form-theme mb-4">
                                <input type="text" className="form-control ps-0"
                                       autoComplete='new-url'
                                       name={'url'}
                                       value={formData.url}
                                       onChange={handleInputChange}
                                       placeholder="Enter URL"/>
                                {renderError("url")}
                            </div>

                            <div className="form-group form-theme mb-4">
                                <select  className="form-select form-control ps-0"
                                        name={'parent_id'}
                                        value={formData.parent_id}
                                        onChange={handleInputChange} >
                                    <option value="">Select a folder</option>
                                </select>
                                {renderError("parent_id")}
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

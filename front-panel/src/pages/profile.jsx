import '../stylesheets/pages/profile.scss'

// icons
import React, {useEffect, useRef, useState} from "react";
import {getCookie, setCookie} from "../services/cookies.jsx";
import api from "../services/api.jsx";
import { Button, Modal } from 'react-bootstrap';

function Profile() {
    const [formData, setFormData] = useState({
        name: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [isModalVisible, setModalVisibility] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        const user = getCookie('userInfo');
        if (user) {
            const parsedUser = JSON.parse(user);
            setUserInfo(parsedUser);
            setFormData({
                name: parsedUser.name,
            });

        }
    }, [getCookie]);


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const UpdateProfile = async () => {
        setErrors({});
        try {
            setIsLoading(true);
            const result = await api.put('/profile/update', formData);
            if (result) {
                setIsLoading(false);
            } else {
                setErrors(result);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error during login:", error);
        }
    };
    const toggleModal = () => {
        setModalVisibility(!isModalVisible);
    };

    return (
        <>
            <div className="profile container">
                <div className="card border-0 shadow p-3 my-3 profile-card mx-auto">
                    <div className="card-header bg-white border-0">
                        <h3 className="card-title fs-3 fw-medium">Profile</h3>
                    </div>
                    <div className="card-body">

                        <div className="d-flex justify-content-center align-items-center">
                            <div className="profile-img-wrap mb-5">
                                <img
                                    src={'https://ui-avatars.com/api/?background=6dabe4&color=fff&rounded=true&bold=true&name=' + userInfo.name}
                                    alt="avatar"/>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="d-flex mb-4">
                                <div className="fw-bold me-3">Name :</div>
                                <div className="flex-grow-1">{userInfo.name}</div>
                            </div>

                            <div className="d-flex mb-4">
                                <div className="fw-bold me-3">Email :</div>
                                <div className="flex-grow-1">{userInfo.email}</div>
                            </div>
                        </div>

                        <div className="d-flex">
                            <button type="button" className="btn btn-theme w-50 me-3" onClick={(e) => toggleModal()}>Edit Profile
                            </button>

                            <button type="button" className="btn btn-theme w-50" data-bs-toggle="modal"
                                    data-bs-target="#changePassword">Change Password
                            </button>
                        </div>

                    </div>
                </div>

                {/*Edit profile modal start*/}
           {/*     <div ref={modalRef} className={`modal fade`} id="editProfile" tabIndex="-1" aria-labelledby="editProfileLabel"
                     aria-hidden={!isModalVisible} onClick={() => toggleModal()}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <h1 className="modal-title fs-5" id="editProfileLabel">Edit Profile</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <form onSubmit={(e) => {e.preventDefault();UpdateProfile();}}>
                                <div className="modal-body px-4">

                                    <div className="form-group d-flex justify-content-center align-items-center mb-4">
                                        <img className="modal-profile-img"
                                             src={'https://ui-avatars.com/api/?background=6dabe4&color=fff&rounded=true&bold=true&name=' + userInfo.name}
                                             alt="avatar"/>
                                    </div>

                                    <div className="form-group form-theme mb-3">
                                        <label htmlFor="" className="form-label">Name</label>
                                        <input type="text" className="form-control ps-0" name="name"
                                               value={formData.name} onChange={handleInputChange}
                                               placeholder="Enter your Name"/>
                                    </div>


                                    <div className="form-group form-theme mb-3">
                                        <label htmlFor="" className="form-label">E-mail</label>
                                        <input type="text" className="form-control bg-white ps-0" name="email"
                                               placeholder="Enter your email address" readOnly disabled
                                               value={userInfo.email}/>
                                    </div>
                                </div>
                                <div className="modal-footer border-0 d-flex">
                                    <button type="button" className="btn btn-secondary w-25" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" name="signin" id="signin" disabled={isLoading} className="btn btn-theme w-25 " >{isLoading ? 'Saving...' : 'Save'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>*/}
                {/*Edit profile modal end  */}
                <Modal show={isModalVisible} onHide={toggleModal} ref={modalRef}>
                    <Modal.Header closeButton>
                        <Modal.Title>My Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {/* Add modal content here */}
                        <p>This is the modal content.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={toggleModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={toggleModal}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/*Change Password modal start*/}
                <div className="modal fade" id="changePassword" tabIndex="-1" aria-labelledby="changePasswordLabel"
                     aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <h1 className="modal-title fs-5" id="changePasswordLabel">Change password</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <form action="" autoComplete="off">
                                <div className="modal-body px-4">

                                    <div className="form-group form-theme mb-3">
                                        <label htmlFor="" className="form-label">Current password</label>
                                        <input type="password" className="form-control ps-0" name="password"
                                               placeholder="Enter your current password"/>
                                    </div>

                                    <div className="form-group form-theme mb-3">
                                        <label htmlFor="" className="form-label">New password</label>
                                        <input type="password" className="form-control ps-0" name="new_password"
                                               placeholder="Enter new password"/>
                                    </div>

                                    <div className="form-group form-theme mb-3">
                                        <label htmlFor="" className="form-label">Confirm password</label>
                                        <input type="password" className="form-control ps-0"
                                               name="password_confirmation"
                                               placeholder="Confirm new password"/>
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
                {/*Change Password modal end  */}
            </div>
        </>
    )
}

export default Profile

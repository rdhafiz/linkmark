import '../stylesheets/pages/profile.scss'

// icons
import React, {useEffect, useRef, useState} from "react";
import {getCookie, setCookie} from "../services/cookies.jsx";
import api from "../services/api.jsx";
import {Button, Modal} from 'react-bootstrap';

function Profile() {
    const [formData, setFormData] = useState({
        name: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [isProfileModalVisible, setProfileModalVisibility] = useState(false);
    const [isPasswordModalVisible, setPasswordModalVisibility] = useState(false);
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
    const toggleProfileModal = () => {
        setProfileModalVisibility(!isProfileModalVisible);
    };
    const togglePasswordModal = () => {
        setPasswordModalVisibility(!isPasswordModalVisible);
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
                            <button type="button" className="btn btn-theme w-50 me-3"
                                    onClick={(e) => toggleProfileModal()}>Edit Profile
                            </button>

                            <button type="button" className="btn btn-theme w-50"
                                    onClick={() => togglePasswordModal()}>Change Password
                            </button>
                        </div>

                    </div>
                </div>

                {/*Edit profile modal start*/}
                <Modal show={isProfileModalVisible} onHide={toggleProfileModal} ref={modalRef} centered>
                    <Modal.Header closeButton className="border-0">
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <form autoComplete="off" onSubmit={(e) => {
                        e.preventDefault();
                        UpdateProfile();
                    }}>
                        <Modal.Body className="px-4">
                            <div className="form-group d-flex justify-content-center align-items-center mb-4">
                                <img className="modal-profile-img"
                                     src={'https://ui-avatars.com/api/?background=6dabe4&color=fff&rounded=true&bold=true&name=' + userInfo.name}
                                     alt="avatar"/>
                            </div>

                            <div className="form-group form-theme mb-3">
                                <label htmlFor="" className="form-label">Name</label>
                                <input type="text" className="form-control ps-0" name="name" autoComplete="new name"
                                       value={formData.name} onChange={handleInputChange}
                                       placeholder="Enter your Name"/>
                            </div>


                            <div className="form-group form-theme mb-3">
                                <label htmlFor="" className="form-label">E-mail</label>
                                <input type="text" className="form-control bg-white ps-0" name="email"
                                       autoComplete="email"
                                       placeholder="Enter your email address" readOnly disabled
                                       value={userInfo.email}/>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="border-0">
                            <Button className="w-25" variant="secondary" onClick={toggleProfileModal}>
                                Close
                            </Button>
                            <Button variant="theme" type="submit" name="signin" id="signin" disabled={isLoading}
                                    className="btn btn-theme w-25">{isLoading ? 'Saving...' : 'Save'}</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                {/*Edit profile modal end  */}

                {/*Change password modal start*/}
                <Modal show={isPasswordModalVisible} onHide={togglePasswordModal} ref={modalRef} centered>
                    <Modal.Header closeButton className="border-0">
                        <Modal.Title>Change password</Modal.Title>
                    </Modal.Header>
                    <form autoComplete="off" onSubmit={(e) => {
                        e.preventDefault();
                        UpdateProfile();
                    }}>
                        <Modal.Body className="px-4">
                            <div className="form-group form-theme mb-3">
                                <label htmlFor="" className="form-label">Current password</label>
                                <input type="password" className="form-control ps-0" name="password"
                                       autoComplete="new current password"
                                       placeholder="Enter your current password"/>
                            </div>

                            <div className="form-group form-theme mb-3">
                                <label htmlFor="" className="form-label">New password</label>
                                <input type="password" className="form-control ps-0" name="new_password"
                                       autoComplete="new password"
                                       placeholder="Enter new password"/>
                            </div>

                            <div className="form-group form-theme mb-3">
                                <label htmlFor="" className="form-label">Confirm password</label>
                                <input type="password" className="form-control ps-0" autoComplete="new confirm password"
                                       name="password_confirmation"
                                       placeholder="Confirm new password"/>
                            </div>

                        </Modal.Body>
                        <Modal.Footer className="border-0">
                            <Button className="w-25" variant="secondary" onClick={togglePasswordModal}>
                                Close
                            </Button>
                            <Button variant="theme" type="submit"
                                    className="btn btn-theme w-25">Confirm</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                {/*Change password modal end  */}


            </div>
        </>
    )
}

export default Profile

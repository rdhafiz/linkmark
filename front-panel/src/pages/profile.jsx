// Importing required modules and styles
import React, { useEffect, useRef, useState } from "react";
import {getCookie, setCookie} from "../services/cookies.jsx";
import api from "../services/api.jsx";
import { Button, Modal } from 'react-bootstrap';

// Profile component
function Profile() {
    // State variables
    const [formData, setFormData] = useState({
        name: "",
    });
    const [passwordFormData, setPasswordFormData] = useState({
        current_password: "",
        password: "",
        password_confirmation: "",
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [isProfileModalVisible, setProfileModalVisibility] = useState(false);
    const [isPasswordModalVisible, setPasswordModalVisibility] = useState(false);
    const modalRef = useRef(null);

    // Fetch user information on component mount
    useEffect(() => {
        const user = getCookie('userInfo');
        if (user) {
            const parsedUser = JSON.parse(user);
            setUserInfo(parsedUser);
        }
    }, []);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleInputChangePassoword = (e) => {
        const { name, value } = e.target;
        setPasswordFormData({
            ...passwordFormData,
            [name]: value,
        });
    };

    // Handle profile update
    const handleProfileUpdate = async () => {
        setErrors({});
        try {
            setIsLoading(true);
            const result = await api.put('/profile/update', formData);
            if (result.msg) {
                setIsLoading(false);
                // Update the user information in cookies after a successful update
                setCookie('userInfo', JSON.stringify({ ...userInfo, name: formData.name }));
                // Close the profile modal
                setProfileModalVisibility(false);
                setUserInfo({ ...userInfo, name: formData.name })
            } else {
                setErrors(result);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error during profile update:", error);
        }
    };

    // Handle password
    const handlePasswordUpdate = async () => {
        setErrors({});
        try {
            setIsLoading(true);
            const result = await api.put('/profile/update/password', passwordFormData);
            if (result.msg) {
                setIsLoading(false);
                // Update the user information in cookies after a successful update
                setPasswordModalVisibility(false);
            } else {
                setErrors(result);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error during password update:", error);
        }
    };


    // Toggle profile modal visibility
    const toggleProfileModal = () => {
        setErrors({});
        setFormData({
            name: userInfo.name,
        });
        setProfileModalVisibility(!isProfileModalVisible);
    };

    // Toggle password modal visibility
    const togglePasswordModal = () => {
        setErrors({});
        setPasswordFormData( {
            current_password: '',
            password: '',
            password_confirmation: '',
        })
        setPasswordModalVisibility(!isPasswordModalVisible);
    };


    const renderError = (fieldName) => {
        if (errors[fieldName]) {
            return <div className="text-danger">{errors[fieldName]}</div>;
        }
        return null;
    };


    return (
        <>
            <div className="profile container">
                {/* Profile card */}
                <div className="card border-0 shadow p-3 my-3 profile-card mx-auto w-50">
                    {/* Card header */}
                    <div className="card-header bg-white border-0">
                        <h3 className="card-title fs-3 fw-medium">Profile</h3>
                    </div>
                    {/* Card body */}
                    <div className="card-body">
                        {/* Profile image */}
                        <div className="d-flex justify-content-center align-items-center">
                            <div className="profile-img-wrap mb-5">
                                <img
                                    src={`https://ui-avatars.com/api/?background=6dabe4&color=fff&rounded=true&bold=true&name=${userInfo.name}`}
                                    alt="avatar"
                                />
                            </div>
                        </div>

                        {/* Profile details */}
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

                        {/* Edit and Change Password buttons */}
                        <div className="d-flex">
                            <button
                                type="button"
                                className="btn btn-theme w-50 me-3"
                                onClick={toggleProfileModal}
                            >
                                Edit Profile
                            </button>

                            <button
                                type="button"
                                className="btn btn-theme w-50"
                                onClick={togglePasswordModal}
                            >
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>

                {/* Edit profile modal */}
                <Modal show={isProfileModalVisible} onHide={toggleProfileModal} ref={modalRef} centered>
                    {/* Modal header */}
                    <Modal.Header closeButton className="border-0">
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    {/* Modal form for profile edit */}
                    <form autoComplete="off" onSubmit={(e) => {
                        e.preventDefault();
                        handleProfileUpdate();
                    }}>
                        {/* Modal body */}
                        <Modal.Body className="px-4">
                            <div className="form-group d-flex justify-content-center align-items-center mb-4">
                                <img
                                    className="modal-profile-img"
                                    src={`https://ui-avatars.com/api/?background=6dabe4&color=fff&rounded=true&bold=true&name=${userInfo.name}`}
                                    alt="avatar"
                                />
                            </div>

                            {/* Name input */}
                            <div className="form-group form-theme mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    type="text"
                                    className="form-control ps-0"
                                    name="name"
                                    aria-autocomplete='new-name'
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your Name"
                                />
                                {renderError("name")}
                            </div>

                            {/* Email input */}
                            <div className="form-group form-theme mb-3">
                                <label htmlFor="email" className="form-label">E-mail</label>
                                <input
                                    type="text"
                                    className="form-control bg-white ps-0"
                                    name="email"
                                    autoComplete="email"
                                    placeholder="Enter your email address"
                                    readOnly
                                    disabled
                                    value={userInfo.email}
                                />
                            </div>
                        </Modal.Body>
                        {/* Modal footer */}
                        <Modal.Footer className="border-0">
                            <Button className="w-25" variant="secondary" onClick={toggleProfileModal}>
                                Close
                            </Button>
                            <Button
                                variant="theme"
                                type="submit"
                                name="signin"
                                id="signin"
                                disabled={isLoading}
                                className="btn btn-theme w-25"
                            >
                                {isLoading ? 'Saving...' : 'Save'}
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>

                {/* Change password modal */}
                <Modal show={isPasswordModalVisible} onHide={togglePasswordModal} ref={modalRef} centered>
                    {/* Modal header */}
                    <Modal.Header closeButton className="border-0">
                        <Modal.Title>Change password</Modal.Title>
                    </Modal.Header>
                    {/* Modal form for password change */}
                    <form autoComplete="off" onSubmit={(e) => {
                        e.preventDefault();handlePasswordUpdate();
                        // Add logic for password change
                    }}>
                        {/* Modal body */}
                        <Modal.Body className="px-4">
                            {/* Current password input */}
                            <div className="form-group form-theme mb-3">
                                <label htmlFor="current_password" className="form-label">Current password</label>
                                <input
                                    type="password"
                                    className="form-control ps-0"
                                    name="current_password"
                                    autoComplete={'new-current_password'}
                                    value={passwordFormData.current_password}
                                    onChange={handleInputChangePassoword}
                                    placeholder="Enter your current password"
                                />
                                {renderError("current_password")}
                            </div>

                            {/* New password input */}
                            <div className="form-group form-theme mb-3">
                                <label htmlFor="password" className="form-label">New password</label>
                                <input
                                    type="password"
                                    className="form-control ps-0"
                                    name="password"
                                    autoComplete={'new-password'}
                                    value={passwordFormData.password}
                                    onChange={handleInputChangePassoword}
                                    placeholder="Enter new password"
                                />
                                {renderError("password")}
                                {renderError("new_password")}
                            </div>

                            {/* Confirm password input */}
                            <div className="form-group form-theme mb-3">
                                <label htmlFor="password_confirmation" className="form-label">Confirm password</label>
                                <input
                                    type="password"
                                    className="form-control ps-0"
                                    autoComplete={'new-password_confirmation'}
                                    value={passwordFormData.password_confirmation}
                                    onChange={handleInputChangePassoword}
                                    name="password_confirmation"
                                    placeholder="Confirm new password"
                                />
                                {renderError("password_confirmation")}
                            </div>
                        </Modal.Body>
                        {/* Modal footer */}
                        <Modal.Footer className="border-0">
                            <Button className="w-25" variant="secondary" onClick={togglePasswordModal}>
                                Close
                            </Button>
                            <Button
                                variant="theme"
                                type="submit"
                                className="btn btn-theme w-25"
                            >
                                Confirm
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        </>
    );
}

export default Profile;

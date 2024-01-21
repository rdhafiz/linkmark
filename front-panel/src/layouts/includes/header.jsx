import '../../stylesheets/layout/includes/header.scss'
import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {removeCookie, getCookie, setCookie} from "../../services/cookies.jsx";
import {Button, Modal} from "react-bootstrap";

// icons
import {IoWarningOutline} from "react-icons/io5";
import api from "../../services/api.jsx";

function Header() {
    const [isDropdown, setIsDropdown] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [activationForm, setActivationForm] = useState({});
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const modalRef = useRef(null);


    const [isActivationModalVisible, setActivationModalVisibility] = useState(false);
    const [isActivationWarningModalVisible, setActivationWarningModalVisibility] = useState(false);
    const toggleActivationWarning = (val = false) => {
        setActivationWarningModalVisibility(!isActivationWarningModalVisible);
        if (val === true) {
            toggleActivation()
            handleResendCode();
        }
    };
    const toggleActivation = () => {
        setActivationModalVisibility(!isActivationModalVisible);
    };

    const logout = () => {
        removeCookie('authToken')
        navigate("/auth/login")
    }

    useEffect(() => {
        const user = getCookie('userInfo');
        if (user !== undefined) {
            const parsedUser = JSON.parse(user);
            setUserInfo(parsedUser);
            if (parsedUser.activation == 0) {
                toggleActivationWarning();
            }
        }
    }, []);


    // Resend activation code handler
    const handleResendCode = async (show) => {
        setErrors({});
        try {
            setIsLoading(true);
            const result = await api.get('/profile/activation/resend');
            if (result.msg) {
                setIsLoading(false);
                if(show == true){
                    await toggleActivation()
                    await toggleActivationWarning()
                }
            } else {
                setErrors(result);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error during resend code:", error);
        }
    };
    const activationAccount = async () => {
        setErrors({});
        try {
            setIsLoading(true);
            const result = await api.post('/profile/activate',activationForm);
            if (result.msg) {
                setIsLoading(false);
                await getUserInfo()
                await toggleActivation()
            } else {
                setErrors(result);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error during resend code:", error);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setActivationForm({
            ...activationForm,
            [name]: value,
        });
    };

    const getUserInfo = async () => {
        try {
            const result = await api.get('/profile/me');
            if (result.data) {
                // Update the user information in cookies after a successful update
                setCookie('userInfo', JSON.stringify({ ...result.data }));
            } else {

            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error during get profile:", error);
        }
    }

    return (
        <>
            <div className="header">
                <div className="container d-flex position-relative justify-content-between align-items-center">
                    <Link to={'/'} className="brand-logo">Linkmark</Link>

                    <div aria-expanded="false" className="avatar"
                         onClick={() => setIsDropdown(!isDropdown)}>
                        <img
                            src={'https://ui-avatars.com/api/?background=6dabe4&color=fff&rounded=true&bold=true&name=' + userInfo.name}
                            alt="avatar"/>

                        {/*Header dropdown start*/}
                        {isDropdown ? (<>
                            <ul className="dropdown-menu show header-dropdown border-0 shadow rounded-3 p-3">
                                <li className="d-flex align-items-center justify-content-between mb-4">
                                    <div className="name fs-5 ps-3 fw-medium flex-grow-1">{userInfo.name}</div>
                                    <div className="drop-avatar">
                                        <img
                                            src={'https://ui-avatars.com/api/?background=6dabe4&color=fff&rounded=true&bold=true&name=' + userInfo.name}
                                            alt="avatar"/>
                                    </div>
                                </li>
                                <li><Link to={'/profile'} className="dropdown-item p-2 rounded-3 mb-2">Profile</Link>
                                </li>
                                {userInfo.activation === 0 ? (<>
                                    <li>
                                        <a className="dropdown-item p-2 rounded-3" onClick={() => toggleActivation()}>
                                            Activate account
                                        </a>
                                    </li>
                                </>) : <></>}

                                <li><a className="dropdown-item p-2 rounded-3" onClick={() => logout()}>Logout</a></li>
                            </ul>
                        </>) : <></>}
                        {/*Header dropdown end  */}
                    </div>
                </div>
            </div>


            {/*Resource modal start*/}
            <Modal show={isActivationWarningModalVisible} onHide={toggleActivationWarning} ref={modalRef} centered>
                <Modal.Body className="px-4 text-center">
                    <i className="font-size-100 text-warning mb-4"><IoWarningOutline/></i>

                    <p className="fs-6">Please activate your account within 24 hours
                        otherwise your account will be deleted.</p>
                </Modal.Body>
                <Modal.Footer className="border-0 pb-5 justify-content-center">
                    <Button className="w-25" variant="secondary" onClick={toggleActivationWarning}>
                        Close
                    </Button>
                    <button type="button" name="activation"  disabled={isLoading}   onClick={() => handleResendCode(true)}
                            className="btn btn-theme w-25">{isLoading ? 'Sending...' : 'Activate'}</button>
                </Modal.Footer>
            </Modal>
            {/*Resource modal end  */}


            {/*Activation modal start*/}
            <Modal show={isActivationModalVisible} onHide={toggleActivation} ref={modalRef} centered>
                <Modal.Header className="border-0">
                    <Modal.Title>Activate Account</Modal.Title>
                </Modal.Header>
                <form action="" autoComplete="off">
                    <Modal.Body className="px-4">
                        <div className="form-group form-theme mb-4">
                            <label htmlFor="" className="form-label">Activation code</label>
                            <input type="text" className="form-control ps-0" name={'activation_code'} placeholder="Enter Activation code." value={activationForm.activation_code} onChange={handleInputChange}/>
                        </div>

                        <a href="" className="resend d-block text-end" onClick={() => handleResendCode}>Resend Code</a>
                    </Modal.Body>
                    <Modal.Footer className="border-0">
                        <Button className="w-25" variant="secondary" onClick={toggleActivation}>
                            Close
                        </Button>
                        <button type="button" name="activation"  disabled={isLoading}   onClick={() => activationAccount()}
                                className="btn btn-theme w-25">{isLoading ? 'Activating...' : 'Activate'}</button>
                    </Modal.Footer>
                </form>
            </Modal>
            {/*Activation modal end  */}


        </>
    )
}

export default Header

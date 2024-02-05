import '../../stylesheets/layout/includes/sidenav.scss'
import {useEffect, useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {removeCookie, getCookie, setCookie} from "../../services/cookies.jsx";
import {Button, Modal} from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';

// icons
import {IoWarningOutline} from "react-icons/io5";
import api from "../../services/api.jsx";
import {renderError} from "../../services/RenderError.jsx";
import { AiFillHome } from "react-icons/ai";
import { MdNotificationsActive } from "react-icons/md";
import { FaLockOpen } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
function Sidenav() {
    const [isDropdown, setIsDropdown] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [activationForm, setActivationForm] = useState({});
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    const modalRef = useRef(null);
    const [resendButtonDisabled, setResendButtonDisabled] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const [isResetLoading, setIsResetLoading] = useState(false);
    const [msg, setMsg] = useState(null);


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
        setMsg(null);
        setErrors({});
        resetActivationForm()
        if (isActivationWarningModalVisible) {
            setActivationWarningModalVisibility(!isActivationWarningModalVisible);
        }
        setActivationModalVisibility(!isActivationModalVisible);
    };

    const logout = () => {
        removeCookie('authToken')
        navigate("/auth/login")
    }
    const resetActivationForm = () => {
        setActivationForm({activation_code:''})
    }

    useEffect(() => {
        const user = getCookie('userInfo');
        if (user !== undefined) {
            const parsedUser = JSON.parse(user);
            setUserInfo(parsedUser);
            if (parsedUser.activation === 0) {
                toggleActivationWarning();
            }
        }
    }, []);

    useEffect(() => {
        let timer;
        if (resendButtonDisabled) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
            }, 1000);
        }else{
            setMsg(null);
        }

        return () => {
            clearInterval(timer);
        };
    }, [resendButtonDisabled]);

    // Resend activation code handler
    const handleResendCode = async () => {
        setErrors({});
        setMsg(null);
        setIsResetLoading(true);


        try {
            const result = await api.get('/profile/activation/resend');
            if (result.msg) {
                setIsResetLoading(false);
                setMsg(result.msg);

                // Disable the button for 30 seconds
                setResendButtonDisabled(true);
                setCountdown(30);

                setTimeout(() => {
                    setResendButtonDisabled(false);
                }, 30000);
            } else {
                setErrors(result);
                setIsResetLoading(false);
            }
        } catch (error) {
            setIsResetLoading(false);
            console.error("Error during resend code:", error);
        }
    };
    const activationAccount = async () => {
        setErrors({});
        try {
            setIsLoading(true);
            const result = await api.post('/profile/activate', activationForm);
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
        const {name, value} = e.target;
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
                setCookie('userInfo', JSON.stringify({...result.data}));
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error during get profile:", error);
        }
    }

    return (
        <>
            <div className="sidenav">
                {/*Top section*/}
                <div className="top">
                    <Link to={'/'} className="logo">
                        <span className={'text-blue border-bottom-blue'}>L</span>ink<span className={'text-blue border-top-blue'}>M</span>ark
                    </Link>
                    <div className="userInfo">
                        <div className="image">
                            <img
                                src={'https://ui-avatars.com/api/?background=6dabe4&color=fff&rounded=false&bold=true&name=' + userInfo.name} className={'avatar'}
                                alt="avatar"/>
                        </div>
                        <Link to={'/profile'} className="name">{userInfo.name}</Link>
                    </div>
                </div>

                {/*Middle section*/}
                <ul className="menu middle">
                    <li><AiFillHome /> Home</li>
                    <li><FaLockOpen /> Change Password</li>
                    {userInfo.activation === 0 ? (<>
                        <li>
                            <a  onClick={() => toggleActivation()}>
                                <MdNotificationsActive className={'text-danger'} /> Activate
                            </a>
                        </li>
                    </>) : <></>}
                </ul>

                {/*Bottom section*/}
                <div className="bottom">
                    <button className={'btn'}><RiLogoutCircleLine /> Logout</button>
                </div>
            </div>
            {/*<div className="header">
                <div className="container d-flex position-relative justify-content-between align-items-center">
                    <Link to={'/'} className="brand-logo">Linkmark</Link>

                    <div aria-expanded="false" className="avatar"
                         onClick={() => setIsDropdown(!isDropdown)}>
                        <img
                            src={'https://ui-avatars.com/api/?background=6dabe4&color=fff&rounded=true&bold=true&name=' + userInfo.name}
                            alt="avatar"/>

                        Header dropdown start
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
                        Header dropdown end
                    </div>
                </div>
            </div>*/}


            {/*Resource modal start*/}
            <Modal show={isActivationWarningModalVisible} onHide={toggleActivationWarning} ref={modalRef} centered>
                <Modal.Body className="px-4 text-center">
                    <i className="font-size-100 text-warning mb-4"><IoWarningOutline/></i>
                    <Alert key={'warning'} variant={'warning'} className={'fs-6'}>
                        Verification code has been sent to your email address.
                    </Alert>
                    <p className="">Please activate your account within 24 hours
                        otherwise your account will be deleted.</p>
                </Modal.Body>
                <Modal.Footer className="border-0 pb-5 justify-content-center">
                    <Button className="w-25" variant="secondary" onClick={toggleActivationWarning}>
                        Close
                    </Button>
                    <button type="button" name="activation" disabled={isLoading} onClick={() => toggleActivation()}
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
                            <input type="text" className="form-control ps-0" name={'activation_code'}
                                   placeholder="Enter Activation code." value={activationForm.activation_code}
                                   onChange={handleInputChange}/>
                            {renderError("activation_code", errors)}
                        </div>

                        {/*Resend code message*/}
                        {msg != null ? (
                            <Alert key={'warning'} variant={'warning'} className={'text-center'}>
                                {msg}
                            </Alert>
                        ) : ''}
                        {/*Resend code*/}
                        <div className="form-group text-center">
                            <span>

                                {!isResetLoading ? (
                                    <span>
                                        If you did not receive any email, please {' '}
                                        <a className={`resend text-end cursor-pointer ${resendButtonDisabled ? 'disabled text-secondary' : ''}`}
                                           onClick={() => handleResendCode()}>
                                        Resend Code
                                    </a>
                                    </span>
                                ) : 'Sending...'}

                                {resendButtonDisabled && <span className="countdown"> ({countdown}s)</span>}
                            </span>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="border-0 justify-content-center">
                        <Button className="w-25" variant="secondary" onClick={toggleActivation}>
                            Close
                        </Button>
                        <button type="button" name="activation" disabled={isLoading} onClick={() => activationAccount()}
                                className="btn btn-theme w-25">{isLoading ? 'Activating...' : 'Activate'}</button>
                    </Modal.Footer>
                </form>
            </Modal>
            {/*Activation modal end  */}


        </>
    )
}

export default Sidenav

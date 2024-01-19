import '../../stylesheets/layout/includes/header.scss'
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {removeCookie, getCookie} from "../../services/cookies.jsx";

function Header() {
    const [isDropdown, setIsDropdown] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const navigate = useNavigate()
    const logout = () =>{
        removeCookie('authToken')
        navigate("/auth/login")
    }
    useEffect(() => {
        const user = getCookie('userInfo');
        if (user !== undefined) {
            const parsedUser = JSON.parse(user);
            setUserInfo(parsedUser);
        }
    }, [getCookie]);
    return (
        <>
            <div className="header">
                <div className="container d-flex position-relative justify-content-between align-items-center">
                    <Link to={'/'} className="brand-logo">Linkmark</Link>

                    <div  aria-expanded="false" className="avatar"
                         onClick={() => setIsDropdown(!isDropdown)}>
                        <img
                            src={'https://ui-avatars.com/api/?background=6dabe4&color=fff&rounded=true&bold=true&name='+userInfo.name}
                            alt="avatar"/>

                        {/*Header dropdown start*/}
                        {isDropdown ? (<>
                            <ul className="dropdown-menu show header-dropdown border-0 shadow rounded-3 p-3">
                                <li className="d-flex align-items-center justify-content-between mb-4">
                                    <div className="name fs-5 ps-3 fw-medium flex-grow-1">{userInfo.name}</div>
                                    <div className="drop-avatar">
                                        <img
                                            src={'https://ui-avatars.com/api/?background=6dabe4&color=fff&rounded=true&bold=true&name='+userInfo.name}
                                            alt="avatar"/>
                                    </div>
                                </li>
                                <li><Link to={'/profile'} className="dropdown-item p-2 rounded-3 mb-2">Profile</Link></li>
                                <li><a className="dropdown-item p-2 rounded-3"  onClick={() => logout()}>Logout</a></li>
                            </ul>
                        </>) : <></>}
                        {/*Header dropdown end  */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header

import '../../stylesheets/layout/includes/header.scss'
import {useState} from "react";

function Header() {
    const [isDropdown, setIsDropdown] = useState(false);
    return (
        <>
            <div className="header d-flex justify-content-between align-items-center">
                <div className="brand-logo">Linkmark</div>

                <div data-bs-toggle="dropdown" aria-expanded="false" className="avatar"
                     onClick={() => setIsDropdown(!isDropdown)}>
                    <img
                        src="https://ui-avatars.com/api/?background=6dabe4&color=fff&rounded=true&bold=true&name=R+C"
                        alt="avatar"/>

                    {/*Header dropdown start*/}
                    {isDropdown ? (<>
                        <ul className="dropdown-menu show header-dropdown border-0 shadow rounded-3 p-3">
                            <li className="d-flex align-items-center justify-content-between mb-4">
                                <div className="name fs-5 fw-medium flex-grow-1">Rahat Chowdhury</div>
                                <div className="drop-avatar">
                                    <img
                                        src="https://ui-avatars.com/api/?background=6dabe4&color=fff&rounded=true&bold=true&name=Rahat+Chowdhury"
                                        alt="avatar"/>
                                </div>
                            </li>
                            <li><a className="dropdown-item rounded-3 mb-2" href="#">Profile</a></li>
                            <li><a className="dropdown-item rounded-3" href="#">Logout</a></li>
                        </ul>
                    </>) : <></>}
                    {/*Header dropdown end  */}
                </div>


            </div>
        </>
    )
}

export default Header

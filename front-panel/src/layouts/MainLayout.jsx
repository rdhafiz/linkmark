import {Outlet} from "react-router-dom";
import Sidenav from "./includes/sidenav.jsx";

/*Custom scss*/
import '../stylesheets/layout/mainLayout.scss'

function MainLayout() {
    return (
        <>
            <div className="layout-wrapper">
                <Sidenav/>
                <Outlet />
            </div>
        </>
    )
}

export default MainLayout

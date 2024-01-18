import {Outlet} from "react-router-dom";
import Header from "./includes/header.jsx";


function MainLayout() {
    return (
        <>
            <Header/>
            <Outlet />
        </>
    )
}

export default MainLayout

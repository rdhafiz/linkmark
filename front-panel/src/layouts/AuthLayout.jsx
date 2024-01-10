import {Outlet} from "react-router-dom";


function AuthLayout() {
    return (
        <>
            <main className={'main'}>
                <Outlet />
            </main>
        </>
    )
}

export default AuthLayout

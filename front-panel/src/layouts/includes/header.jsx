import '../../stylesheets/layout/includes/header.scss'

function Header() {
    return (
        <>
            <div className="header d-flex justify-content-between align-items-center">
                <div className="brand">Linkmark</div>

                <a href="javascript:void(0)">
                    <img src="https://ui-avatars.com/api/?name=John+Doe" alt=""/>
                </a>
            </div>
        </>
    )
}

export default Header

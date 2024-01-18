import '../stylesheets/pages/profile.scss'

// icons
import {LuUploadCloud} from "react-icons/lu";

function Profile() {
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
                                    src="https://ui-avatars.com/api/?background=6dabe4&color=fff&rounded=true&bold=true&name=R+C"
                                    alt="avatar"/>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="d-flex mb-4">
                                <div className="fw-bold me-3">Name :</div>
                                <div className="flex-grow-1">Rahat Chowdhury</div>
                            </div>

                            <div className="d-flex mb-4">
                                <div className="fw-bold me-3">Email :</div>
                                <div className="flex-grow-1">rahatchowdhury@gmail.com</div>
                            </div>
                        </div>

                        <div className="d-flex">
                            <button type="button" className="btn btn-theme w-50 me-3" data-bs-toggle="modal"
                                    data-bs-target="#editProfile">Edit Profile
                            </button>
                            <button type="button" className="btn btn-theme w-50">Change Password</button>
                        </div>

                    </div>
                </div>

                {/*Edit profile modal start*/}
                <div className="modal fade" id="editProfile" tabIndex="-1" aria-labelledby="editProfileLabel"
                     aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <h1 className="modal-title fs-5" id="editProfileLabel">Edit Profile</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                            </div>
                            <form action="">
                                <div className="modal-body px-4">

                                    <div className="form-group d-flex justify-content-center align-items-center mb-4">
                                        <label htmlFor="profileAvatar" className="avatar-upload-label">
                                            <input type="file" className="d-none" id="profileAvatar"/>
                                            <i><LuUploadCloud/></i>
                                        </label>
                                    </div>

                                    <div className="form-group form-theme mb-3">
                                        <label htmlFor="" className="form-label">First name</label>
                                        <input type="text" className="form-control" name="first_name"
                                               placeholder="Enter your first name"/>
                                    </div>

                                    <div className="form-group form-theme mb-3">
                                        <label htmlFor="" className="form-label">Last name</label>
                                        <input type="text" className="form-control" name="last_name"
                                               placeholder="Enter your last name"/>
                                    </div>

                                    <div className="form-group form-theme mb-3">
                                        <label htmlFor="" className="form-label">E-mail</label>
                                        <input type="text" className="form-control" name="email"
                                               placeholder="Enter your email address" disabled
                                               value="rahatchowdhury@gmail.con"/>
                                    </div>


                                </div>
                                <div className="modal-footer border-0">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel
                                    </button>
                                    <button type="button" className="btn btn-theme">Confirm</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/*Edit profile modal end  */}
            </div>
        </>
    )
}

export default Profile

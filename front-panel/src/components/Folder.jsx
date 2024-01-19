import React from "react";
/*Icons*/
import {FcFolder} from "react-icons/fc";
import { MdEdit } from "react-icons/md";
/*Custom style*/
import '../stylesheets/components/folder.scss'

const Link = (props) => {
    const { item, toggleEditModal } = props;
    const handleButtonClick = () => {
        toggleEditModal(item, 'folder');
    };

    return (
        <>
            <div className="link-box rounded-3 shadow-sm position-relative">
                <button className="edit" onClick={handleButtonClick}><MdEdit /></button>
                <div
                    className="link-box-cover rounded-top-3 d-flex justify-content-center align-items-center">
                    <FcFolder/>
                </div>
                <div className="link-box-content p-3 text-center bg-dark rounded-bottom-3">
                    <h5 className="title fw-bold">{item.title}</h5>
                </div>
            </div>
        </>
    );
};

export default Link;

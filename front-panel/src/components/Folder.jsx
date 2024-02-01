import React from "react";
/*Icons*/
import {FcFolder} from "react-icons/fc";
import { MdEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
/*Custom style*/
import '../stylesheets/components/folder.scss'
import {FaFolder} from "react-icons/fa";
import {HiOutlineDotsVertical} from "react-icons/hi";

const Link = (props) => {
    const { item, toggleEditModal,openFolder,deleteModal } = props;
    const handleButtonClick = () => {
        toggleEditModal(item, 'folder');
    };
    const handleDeleteClick = () => {
        deleteModal(item);
    };
    const toggleFolder = () => {
        openFolder(item);
    };

    return (
        <>
            {/*<div className="link-box rounded-3 shadow-sm position-relative">
                <button className="edit" onClick={handleButtonClick}><MdEdit /></button>
                <button className="delete" onClick={handleDeleteClick}><MdDeleteForever /></button>
                <div onClick={toggleFolder}
                    className="link-box-cover cursor-pointer rounded-top-3 d-flex justify-content-center align-items-center">
                    <FcFolder/>
                </div>
                <div className="link-box-content cursor-pointer p-3 text-center bg-dark rounded-bottom-3" onClick={toggleFolder}>
                    <h5 className="title fw-bold">{item.title}</h5>
                </div>
            </div>*/}
            <div className="each-folder"  >
                <div className="icon" onClick={toggleFolder}><FaFolder/></div>
                <div className="title" onClick={toggleFolder}>{item.title}</div>
                <div className="option" >
                    <HiOutlineDotsVertical/>
                </div>
            </div>
        </>
    );
};

export default Link;

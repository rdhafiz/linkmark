import {IoLink} from "react-icons/io5";
import React from "react";
import '../stylesheets/components/links.scss'
import {HiOutlineDotsVertical} from "react-icons/hi";

const Link = (props) => {
    const { item, toggleEditModal,deleteModal } = props;
    const handleButtonClick = () => {
        toggleEditModal(item, 'link');
    };
    const handleDeleteClick = () => {
        deleteModal(item);
    };
    const toggleDropdown = (event) => {
        const dropdownContainer = event.currentTarget.parentNode.querySelector('.options-dropdown');

        // Remove 'active' class from all other dropdowns
        document.querySelectorAll('.options-dropdown').forEach((dropdown) => {
            if (dropdown !== dropdownContainer) {
                dropdown.classList.remove('active');
            }
        });

        // Toggle 'active' class on the clicked dropdown
        dropdownContainer.classList.toggle('active');
    };
    return (
        <>
            <div className="link-box rounded-3 shadow-sm position-relative">

                <div className="option outsideClick">
                    <HiOutlineDotsVertical onClick={toggleDropdown}/>
                    <div className="options-dropdown">
                        <a className={'each-option'} onClick={handleButtonClick}>Edit</a>
                        <a className={'each-option'} onClick={handleDeleteClick}>Delete</a>
                    </div>
                </div>
                {/* <button className="edit" onClick={handleButtonClick}><MdEdit /></button>
                <button className="delete" onClick={handleDeleteClick}><MdDeleteForever /></button>*/}
                <div
                    className="link-box-cover rounded-top-3 d-flex justify-content-center align-items-center">
                    {item.preview != null && item.preview.images.length > 0 ? (
                        <img src={item.preview.images[0]} alt=""/>
                    ) : (
                        <i><IoLink/></i>
                    )}


                </div>
                <div className="link-box-content p-3  rounded-bottom-3">
                    <h5 className="title fw-bold show-2-line">{item.title}</h5>
                    {item.preview != null && item.preview.description != null ? (
                        <p className="small desc mb-2 show-2-line">{item.preview.description}</p>
                    ) : null}
                    <a target={'_blank'} href={item.url} className="link show-1-line">{item.url}</a>
                </div>
            </div>
        </>
    );
};

export default Link;

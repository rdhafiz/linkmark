import {IoLink} from "react-icons/io5";
import React from "react";
import {MdEdit} from "react-icons/md";

const Link = (props) => {
    const { item, toggleEditModal } = props;
    const handleButtonClick = () => {
        toggleEditModal(item, 'link');
    };
    return (
        <>
            <div className="link-box rounded-3 shadow-sm position-relative">
                <button className="edit" onClick={handleButtonClick}><MdEdit /></button>
                <div
                    className="link-box-cover rounded-top-3 d-flex justify-content-center align-items-center">
                    {item.preview != null && item.preview.images.length > 0 ? (
                        <img src={item.preview.images[0]} alt="" />
                    ) : (
                        <i><IoLink/></i>
                    )}


                </div>
                <div className="link-box-content p-3 bg-dark rounded-bottom-3">
                    <h5 className="title fw-bold">{item.title}</h5>
                    {item.preview != null && item.preview.description != null ? (
                        <p className="small desc mb-2 show-2-line">{item.preview.description}</p>
                    ) :null}
                    <a target={'_blank'} href={item.url} className="link show-2-line">{item.url}</a>
                </div>
            </div>
        </>
    );
};

export default Link;

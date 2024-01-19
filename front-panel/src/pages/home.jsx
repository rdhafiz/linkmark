import React, {useEffect, useRef, useState} from "react";


import '../stylesheets/pages/home.scss'

// icons
import {IoLink} from "react-icons/io5";
import {FcFolder} from "react-icons/fc";
import { FaPlus } from "react-icons/fa6";
import {Button, Modal} from "react-bootstrap";
import api from "../services/api.jsx";
import {setCookie} from "../services/cookies.jsx";
import Link from "../components/Link.jsx";
import Folder from "../components/Folder.jsx";

function Home() {
    /*Global*/
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const modalRef = useRef(null);
    const renderError = (fieldName) => {
        if (errors[fieldName]) {
            return <div className="text-danger">{errors[fieldName]}</div>;
        }
        return null;
    };


    /*Folder*/
    const [isFolderModalVisible, setIsFolderModalVisible] = useState(false);
    const [folderFormData, setFolderFormData] = useState({
        title: "",
        parent_id: '0',
    });
    const toggleFolderModal = () => {
        setErrors({});
        resetFormFolder()
        setIsFolderModalVisible(!isFolderModalVisible);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFolderFormData({
            ...folderFormData,
            [name]: value,
        });
    };
    const folderManage = async () => {
        setErrors({});
        try {
            setIsLoading(true);
            const result = await api.post('/resource/create', folderFormData);
            if (result.data) {
                setIsLoading(false);
                toggleFolderModal();
                resetFormFolder()
                await fetchListData()
            } else {
                setErrors(result);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error during bookmark create:", error);
        }
    };
    const resetFormFolder = () => {
        setFolderFormData({
            title: "",
            parent_id: '0',
        })
    }

    /*Url*/
    const [isUrlModalVisible, setIsUrlModalVisible] = useState(false);
    const [urlFormData, setUrlFormData] = useState({
        title: "",
        parent_id: '0',
        url: '',
    });
    const toggleUrlModal = () => {
        setErrors({});
        resetFormUrl()
        setIsUrlModalVisible(!isUrlModalVisible);
    };
    const handleInputChangeUrl = (e) => {
        const { name, value } = e.target;
        setUrlFormData({
            ...urlFormData,
            [name]: value,
        });
    };
    const UrlManage = async () => {
        setErrors({});
        try {
            setIsLoading(true);
            const result = await api.post('/resource/create', urlFormData);
            if (result.data) {
                setIsLoading(false);
                toggleUrlModal();
                resetFormUrl()
            } else {
                setErrors(result);
                setIsLoading(false);
                await fetchListData()
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error during bookmark create:", error);
        }
    };
    const resetFormUrl = () => {
        setFolderFormData({
            title: "",
            url: '',
            parent_id: '0',
        })
    }

    /*Edit*/
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isFolderOrUrl, setIsFolderOrUrl] = useState(false);
    const [editFormData, setEditFormData] = useState({
        id: "",
        title: "",
        parent_id: '0',
    });
    const toggleEditModal = (data = null, type = 'link') => {
        setErrors({});
        if(data != null){
            resetFormEdit(data)
        }
        if (type === 'link'){
            setIsFolderOrUrl(true)
        }else{
            setIsFolderOrUrl(false)
        }
        setIsEditModalVisible(!isEditModalVisible);
    };
    const handleInputChangeEdit = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value,
        });
    };
    const EditManage = async () => {
        setErrors({});
        try {
            setIsLoading(true);
            const result = await api.put('/resource/update', editFormData);
            if (result.msg) {
                setIsLoading(false);
                resetFormUrl()
                await fetchListData()
                await toggleEditModal()
            } else {
                setErrors(result);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error during bookmark create:", error);
        }
    };
    const resetFormEdit = (data) => {
        setEditFormData({
            id: data._id,
            title: data.title,
            parent_id: data.parent_id,
        })
    }

    /*List*/
    const [isListLoading, setIsListLoading] = useState(false);
    const [listData, setListData] = useState([]);
    const [listFormData, setListFormData] = useState({
        page: 1,
        limit: 20,
        parent_id: '0',
    });
    const fetchListData = async () => {
        try {
            setIsListLoading(true);
            const result = await api.get(`/resource/all?page=${listFormData.page}&limit=${listFormData.limit}&parent_id=${listFormData.parent_id}`);
            if (result.data) {
                setListData(result.data);
                setIsListLoading(false);
            } else {
                setErrors(result);
                setIsListLoading(false);
            }
        } catch (error) {
            setIsListLoading(false);
            console.error("Error during list retrieval:", error);
        }
    };



    useEffect(() => {
        fetchListData();
    }, []);
    return (
        <>
            <div className="home container">

                <div className="mx-3 my-4 text-end">
                    <button type="button" className="btn btn-theme width-150 me-3" onClick={() => toggleFolderModal()}>Add Folder   <i><FaPlus /></i></button>
                    <button type="button" className="btn btn-theme width-150" onClick={() => toggleUrlModal()}>Add URL   <i><FaPlus /></i></button>
                </div>
                <div className="home-content p-3">
                    {/*Link*/}
                    {listData.map((data, index) => (
                        data.is_dir === 0 ? (
                            <Link key={index} item={data}  toggleEditModal={toggleEditModal}  />
                        ) : <Folder key={index} item={data}  toggleEditModal={toggleEditModal}  />
                    ))}
                </div>



                {/*Folder modal start*/}
                <Modal show={isFolderModalVisible} onHide={toggleFolderModal} ref={modalRef} centered>
                    <Modal.Header closeButton className="border-0">
                        <Modal.Title>New Folder</Modal.Title>
                    </Modal.Header>
                    <form autoComplete="off" onSubmit={(e) => {
                        e.preventDefault();
                        folderManage();
                    }}>
                        <Modal.Body className="px-4">
                            <div className="form-group form-theme mb-4">
                                <input type="text" className="form-control ps-0"
                                       autoComplete='new-title'
                                       value={folderFormData.title}
                                       name={'title'}
                                       onChange={handleInputChange}
                                       placeholder="Enter a title."/>
                                {renderError("title")}
                            </div>

                            <div className="form-group form-theme mb-4">
                                <select  className="form-select form-control ps-0"
                                        name={'parent_id'}
                                        value={folderFormData.parent_id}
                                        onChange={handleInputChange} >
                                    <option value="">Select a folder</option>
                                </select>
                                {renderError("parent_id")}
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="border-0">
                            <Button className="w-25" variant="secondary" onClick={toggleFolderModal}>
                                Close
                            </Button>
                            <button type="submit" name="signin" id="signin" disabled={isLoading}  className="btn btn-theme w-25" >{isLoading ? 'Saving...' : 'Save'}</button>
                        </Modal.Footer>
                    </form>
                </Modal>
                {/*Folder modal end  */}

                {/*Url modal start*/}
                <Modal show={isUrlModalVisible} onHide={toggleUrlModal} ref={modalRef} centered>
                    <Modal.Header closeButton className="border-0">
                        <Modal.Title>New Url</Modal.Title>
                    </Modal.Header>
                    <form autoComplete="off" onSubmit={(e) => {
                        e.preventDefault();
                        UrlManage();
                    }}>
                        <Modal.Body className="px-4">
                            <div className="form-group form-theme mb-4">
                                <input type="text" className="form-control ps-0"
                                       autoComplete='new-title'
                                       value={urlFormData.title}
                                       name={'title'}
                                       onChange={handleInputChangeUrl}
                                       placeholder="Enter a title."/>
                                {renderError("title")}
                            </div>
                            <div className="form-group form-theme mb-4">
                                <input type="text" className="form-control ps-0"
                                       autoComplete='new-url'
                                       value={urlFormData.url}
                                       name={'url'}
                                       onChange={handleInputChangeUrl}
                                       placeholder="Enter a Url."/>
                                {renderError("url")}
                            </div>

                            <div className="form-group form-theme mb-4">
                                <select  className="form-select form-control ps-0"
                                         name={'parent_id'}
                                         value={urlFormData.parent_id}
                                         onChange={handleInputChangeUrl} >
                                    <option value="">Select a folder</option>
                                </select>
                                {renderError("parent_id")}
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="border-0">
                            <Button className="w-25" variant="secondary" onClick={toggleUrlModal}>
                                Close
                            </Button>
                            <button type="submit" name="signin" id="signin" disabled={isLoading}  className="btn btn-theme w-25" >{isLoading ? 'Saving...' : 'Save'}</button>
                        </Modal.Footer>
                    </form>
                </Modal>
                {/*Url modal end  */}

                {/*Edit modal start*/}
                <Modal show={isEditModalVisible} onHide={toggleEditModal} ref={modalRef} centered>
                    <Modal.Header closeButton className="border-0">
                        <Modal.Title>{isFolderOrUrl === false ? 'Edit Folder' : 'Edit Url'}</Modal.Title>
                    </Modal.Header>
                    <form autoComplete="off" onSubmit={(e) => {
                        e.preventDefault();
                        EditManage();
                    }}>
                        <Modal.Body className="px-4">
                            <div className="form-group form-theme mb-4">
                                <input type="text" className="form-control ps-0"
                                       autoComplete='new-title'
                                       value={editFormData.title}
                                       name={'title'}
                                       onChange={handleInputChangeEdit}
                                       placeholder="Enter a title."/>
                                {renderError("title")}
                            </div>

                            <div className="form-group form-theme mb-4">
                                <select  className="form-select form-control ps-0"
                                         name={'parent_id'}
                                         value={editFormData.parent_id}
                                         onChange={handleInputChangeEdit} >
                                    <option value="">Select a folder</option>
                                </select>
                                {renderError("parent_id")}
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="border-0">
                            <Button className="w-25" variant="secondary" onClick={toggleEditModal}>
                                Close
                            </Button>
                            <button type="submit" name="signin" id="signin" disabled={isLoading}  className="btn btn-theme w-25" >{isLoading ? 'Saving...' : 'Save'}</button>
                        </Modal.Footer>
                    </form>
                </Modal>
                {/*Edit modal end  */}

            </div>
        </>
    )
}

export default Home

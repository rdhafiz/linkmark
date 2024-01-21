import React, {useEffect, useRef, useState} from "react";


import '../stylesheets/pages/home.scss'

// icons
import {IoLink} from "react-icons/io5";
import {FcFolder} from "react-icons/fc";
import {FaPlus} from "react-icons/fa6";
import {Button, Modal} from "react-bootstrap";
import api from "../services/api.jsx";
import {setCookie} from "../services/cookies.jsx";
import Link from "../components/Link.jsx";
import Folder from "../components/Folder.jsx";
import {MdDeleteForever} from "react-icons/md";

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
    const [globalFormData, setGlobalFormData] = useState({
        parent_id: '0',
        history: [
            {parent_id: '0', title: "Home"}
        ]
    });


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
        const {name, value} = e.target;
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
            parent_id: globalFormData.parent_id,
        })
    }

    /*Url*/
    const [isUrlModalVisible, setIsUrlModalVisible] = useState(false);
    const [urlFormData, setUrlFormData] = useState({
        title: "",
        parent_id: globalFormData.parent_id,
        url: '',
    });
    const toggleUrlModal = () => {
        setErrors({});
        resetFormUrl()
        setIsUrlModalVisible(!isUrlModalVisible);
    };
    const handleInputChangeUrl = (e) => {
        const {name, value} = e.target;
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
                fetchListData()
            } else {
                setErrors(result);
                setIsLoading(false);
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
            parent_id: globalFormData.parent_id,
        })
    }

    /*Edit*/
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isFolderOrUrl, setIsFolderOrUrl] = useState(false);
    const [editFormData, setEditFormData] = useState({
        id: "",
        title: "",
        parent_id: globalFormData.parent_id,
    });
    const toggleEditModal = (data = null, type = 'link') => {
        setErrors({});
        if (data != null) {
            resetFormEdit(data)
        }
        if (type === 'link') {
            setIsFolderOrUrl(true)
        } else {
            setIsFolderOrUrl(false)
        }
        setIsEditModalVisible(!isEditModalVisible);
    };
    const handleInputChangeEdit = (e) => {
        const {name, value} = e.target;
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
        parent_id: globalFormData.parent_id,
    });
    const fetchListData = async (data = null) => {
        try {
            let formData = {
                limit: listFormData.limit,
                page: listFormData.page,
                parent_id: listFormData.parent_id,
            }
            if (data != null) {
                formData = {
                    limit: data.limit,
                    page: data.page,
                    parent_id: data.parent_id,
                }
                setListFormData(formData)
            }
            setIsListLoading(true);
            const result = await api.get(`/resource/all?page=${formData.page}&limit=${formData.limit}&parent_id=${formData.parent_id}`);
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
    const openFolder = async (data) => {
        try {
            // Update list data for the new folder
            const formData = {
                limit: listFormData.limit,
                page: listFormData.page,
                parent_id: data._id,
            };

            await fetchListData(formData);

            // Update form data for folder and URL
            setFolderFormData((prevData) => ({ ...prevData, parent_id: formData.parent_id }));
            setUrlFormData((prevData) => ({ ...prevData, parent_id: formData.parent_id }));

            // Update global form data and history
            setGlobalFormData((prevGlobalData) => {
                const newHistoryItem = { parent_id: formData.parent_id, title: data.title };
                const newHistory = Array.isArray(prevGlobalData.history)
                    ? [...prevGlobalData.history, newHistoryItem]
                    : [newHistoryItem];

                return { parent_id: formData.parent_id, history: newHistory };
            });
        } catch (error) {
            console.error("Error opening folder:", error);
            // Handle error as needed
        }
    };
    const changeFolder = async (index) => {
        const formData = {
            limit: listFormData.limit,
            page: listFormData.page,
            parent_id: globalFormData.history[index].parent_id,
        };
        setListFormData({...listFormData,parent_id: formData.parent_id})
        setFolderFormData((prevData) => ({ ...prevData, parent_id: formData.parent_id }));
        setUrlFormData((prevData) => ({ ...prevData, parent_id: formData.parent_id }));

        setGlobalFormData((prevGlobalData) => {
            // Ensure history is an array
            const historyArray = Array.isArray(prevGlobalData.history) ? prevGlobalData.history : [];

            // Remove items starting from the specified index
            const newHistory = historyArray.slice(0, index + 1);

            return { ...prevGlobalData, history: newHistory };
        });
        await fetchListData(formData)
    };

    /*Delete*/
    const [deleteMsg, setDeleteMsg] = useState('Are you sure you want to delete this folder?');
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [deletedId, setDeletedId] = useState('');

    const toggleDeleteModal = (data = null, type = 'folder') => {
        if(data != null){
            setDeletedId(data._id)
            if (type === 'folder') {
                setDeleteMsg('Are you sure you want to delete this folder ?')
            } else {
                setDeleteMsg('Are you sure you want to delete this file ?')
            }
        }
        setIsDeleteModalVisible(!isDeleteModalVisible);
    };
    const manageDelete = async () => {
        try {
            setIsLoading(true);
            const result = await api.delete(`/resource/delete/${deletedId}`, editFormData);
            if (result.msg) {
                setIsLoading(false);
                await fetchListData()
                await toggleDeleteModal()
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error during delete:", error);
        }
    }


    useEffect(() => {
        fetchListData();
    }, []);
    return (
        <>
            <div className="home container">

                <div className="mx-3 my-4 d-flex justify-content-between align-items-center">
                    <div className="history">
                        <ul>
                            {globalFormData.history.map((data, index) => (
                                <li key={index} className={'cursor-pointer'} onClick={() => changeFolder(index)}>
                                    {data.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <button type="button" className="btn btn-theme width-150 me-3"
                                onClick={() => toggleFolderModal()}>Add Folder <i><FaPlus/></i></button>
                        <button type="button" className="btn btn-theme width-150" onClick={() => toggleUrlModal()}>Add
                            URL <i><FaPlus/></i></button>
                    </div>
                </div>

                <div className="home-content p-3">
                    {/*Link*/}
                    {listData.map((data, index) => (
                        data.is_dir === 0 ? (
                            <Link key={index} item={data} toggleEditModal={toggleEditModal} deleteModal={toggleDeleteModal}/>
                        ) : <Folder key={index} item={data} toggleEditModal={toggleEditModal} openFolder={openFolder} deleteModal={toggleDeleteModal}/>
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

                        </Modal.Body>
                        <Modal.Footer className="border-0">
                            <Button className="w-25" variant="secondary" onClick={toggleFolderModal}>
                                Close
                            </Button>
                            <button type="submit" name="signin" id="signin" disabled={isLoading}
                                    className="btn btn-theme w-25">{isLoading ? 'Saving...' : 'Save'}</button>
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

                        </Modal.Body>
                        <Modal.Footer className="border-0">
                            <Button className="w-25" variant="secondary" onClick={toggleUrlModal}>
                                Close
                            </Button>
                            <button type="submit" name="signin" id="signin" disabled={isLoading}
                                    className="btn btn-theme w-25">{isLoading ? 'Saving...' : 'Save'}</button>
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

                        </Modal.Body>
                        <Modal.Footer className="border-0">
                            <Button className="w-25" variant="secondary" onClick={toggleEditModal}>
                                Close
                            </Button>
                            <button type="submit" name="signin" id="signin" disabled={isLoading}
                                    className="btn btn-theme w-25">{isLoading ? 'Saving...' : 'Save'}</button>
                        </Modal.Footer>
                    </form>
                </Modal>
                {/*Edit modal end  */}

                {/*Delete modal start*/}
                <Modal show={isDeleteModalVisible} onHide={toggleDeleteModal} ref={modalRef} centered>
                    <Modal.Header  className="border-0">
                        <Modal.Title></Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="px-4 text-center delete-modal">
                        <div className="icon"><MdDeleteForever /></div>
                        <div className={'warning-text'}>{deleteMsg}</div>
                        <div className={'d-flex align-items-center justify-content-center mt-3'}>
                            <Button className="w-25 me-3" variant="secondary" onClick={toggleDeleteModal}>
                                Close
                            </Button>
                            <button type="button" name="Delete" id="Delete" disabled={isLoading} onClick={manageDelete}
                                    className="btn btn-danger w-25">{isLoading ? 'Deleting...' : 'Delete'}</button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="border-0 "></Modal.Footer>
                </Modal>
                {/*Delete modal end  */}

            </div>
        </>
    )
}

export default Home

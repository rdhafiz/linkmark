import React, {useEffect, useRef, useState} from "react";


import '../stylesheets/pages/home.scss'

// icons
import {FaAnglesRight} from "react-icons/fa6";
import {MdDeleteForever} from "react-icons/md";
import {TbReload} from "react-icons/tb";

import {Button, Modal, Dropdown} from "react-bootstrap";
import api from "../services/api.jsx";
import {renderError} from "../services/RenderError.jsx";
import EmptyScreen from "../components/Empty-screen.jsx";
import Folder from "../components/Folder.jsx";
import Link from '../components/Link.jsx'
import folder from "../components/Folder.jsx";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {IoLink} from "react-icons/io5";

function Home() {
    /*Global*/
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const modalRef = useRef(null);

    const [globalFormData, setGlobalFormData] = useState({
        parent_id: '0',
        history: [
            {parent_id: '0', title: "Home"}
        ]
    });


    /*Folder*/
    const [isFolderModalVisible, setIsFolderModalVisible] = useState(false);
    const [totalPageFolder, setTotalPageFolder] = useState(0);
    const [totalCountFolder, setTotalCountFolder] = useState(0);
    const [totalPageLinks, setTotalPageLinks] = useState(0);
    const [totalCountLinks, setTotalCountLinks] = useState(0);
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
                await fetchFolderData()
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
                fetchUrlData()
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
        setUrlFormData({
            title: "",
            parent_id: globalFormData.parent_id,
            url: '',
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
                await fetchUrlData()
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
    const [folderData, setFolderData] = useState([]);
    const [listData, setListData] = useState([]);
    const [listFormData, setListFormData] = useState({
        page: 1,
        limit:20,
        parent_id: globalFormData.parent_id,
    });
    const [folderParam, setFolderParam] = useState({
        page: 1,
        limit: 20,
        parent_id: globalFormData.parent_id,
    });
    const fetchUrlData = async (data = null) => {
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
                updateUrlData(result.data);
                setTotalPageLinks(result.totalPages);
                setTotalCountLinks(result.totalCount);
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
    const fetchFolderData = async (data = null) => {
        try {
            let formData = {
                limit: folderParam.limit,
                page: folderParam.page,
                parent_id: folderParam.parent_id,
                is_dir: 1,
            }
            if (data != null) {
                formData = {
                    limit: data.limit,
                    page: data.page,
                    parent_id: data.parent_id,
                    is_dir: 1,
                }
                setFolderParam(formData)
            }
            setIsListLoading(true);
            const result = await api.get(`/resource/all?page=${formData.page}&limit=${formData.limit}&parent_id=${formData.parent_id}&is_dir=1`);
            if (result.data) {
                updateFolderData(result.data);
                setTotalPageFolder(result.totalPages);
                setTotalCountFolder(result.totalCount);
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
    const updateFolderData = (newData) => {
        setFolderData((prevData) => {
            // Create a Set to keep track of unique IDs
            const uniqueIds = new Set(prevData.map(item => item._id));

            // Filter out items with duplicate IDs from newData
            const filteredNewData = newData.filter(item => !uniqueIds.has(item._id));

            // Concatenate the filtered newData with the existing data
            return [...prevData, ...filteredNewData];
        });
    };
    const updateUrlData = (newData) => {
        setListData((prevData) => {
            // Create a Set to keep track of unique IDs
            const uniqueIds = new Set(prevData.map(item => item._id));

            // Filter out items with duplicate IDs from newData
            const filteredNewData = newData.filter(item => !uniqueIds.has(item._id));

            // Concatenate the filtered newData with the existing data
            return [...prevData, ...filteredNewData];
        });
    };
    const loadFolder = async () => {
        // Update list, folder, and URL form data
        const updatedFormData = {
            limit: folderParam.limit,
            page: folderParam.page + 1,
            parent_id: folderParam.parent_id,
            is_dir: folderParam.is_dir,
        };
        // Fetch data
        await Promise.all([
            fetchFolderData(updatedFormData),
            setFolderParam({
                limit: updatedFormData.limit,
                page: updatedFormData.page,
                parent_id: updatedFormData.parent_id,
                is_dir: updatedFormData.is_dir
            })
        ]);
    }
    const loadLinks = async () => {
        // Update list, folder, and URL form data
        const updatedFormData = {
            limit: listFormData.limit,
            page: listFormData.page + 1,
            parent_id: listFormData.parent_id,
        };
        // Fetch data
        await Promise.all([
            fetchUrlData(updatedFormData),
            setListFormData({
                limit: updatedFormData.limit,
                page: updatedFormData.page,
                parent_id: updatedFormData.parent_id,
            })
        ]);
    }
    const openFolder = async (data) => {
        try {
            setFolderData(prevFolderData => {
                // Ensure immediate update of folder data
                return [];
            });

            setListData(prevListData => {
                // Ensure immediate update of list data
                return [];
            });

            // Update list data for the new folder
            const formData = {
                limit: folderParam.limit,
                page: folderParam.page,
                parent_id: data._id,
                is_dir: 1,
            };

            // Update list data for the new folder
            const formDataUrl = {
                limit: listFormData.limit,
                page: listFormData.page,
                parent_id: data._id,
            };

            await fetchFolderData(formData);
            await fetchUrlData(formDataUrl);

            // Update form data for folder and URL
            setFolderFormData((prevData) => ({...prevData, parent_id: formData.parent_id}));
            setUrlFormData((prevData) => ({...prevData, parent_id: formData.parent_id}));

            // Update global form data and history
            setGlobalFormData((prevGlobalData) => {
                const newHistoryItem = {parent_id: formData.parent_id, title: data.title};
                const newHistory = Array.isArray(prevGlobalData.history)
                    ? [...prevGlobalData.history, newHistoryItem]
                    : [newHistoryItem];

                return {parent_id: formData.parent_id, history: newHistory};
            });
        } catch (error) {
            console.error("Error opening folder:", error);
            // Handle error as needed
        }
    };
    const changeFolder = async (index) => {
        try {
            setFolderData([])
            setListData([])
            const parent_id = globalFormData.history[index].parent_id;

            // Update list, folder form data
            const updatedFormData = {
                limit: folderParam.limit,
                page: 1,
                parent_id: parent_id,
                is_dir: 1,
            };

            // Update list and URL form data
            const updatedFormDataUrl = {
                limit: listFormData.limit,
                page: 1,
                parent_id: parent_id,
            };

            // Update global form data
            await setGlobalFormData((prevGlobalData) => {
                const historyArray = Array.isArray(prevGlobalData.history) ? prevGlobalData.history : [];
                const newHistory = historyArray.slice(0, index + 1);
                return { parent_id: parent_id, history: newHistory };
            });

            // Fetch data sequentially
            await fetchUrlData(updatedFormDataUrl);
            await fetchFolderData(updatedFormData);

            // Update list and folder form data
            setListFormData({
                page: updatedFormDataUrl.page,
                limit: updatedFormDataUrl.limit,
                parent_id: updatedFormDataUrl.parent_id,
            });

            setFolderFormData({ title: '', parent_id: updatedFormData.parent_id });
            setUrlFormData({ title: '', url: '', parent_id: updatedFormData.parent_id });
        } catch (error) {
            console.error("Error in changeFolder:", error);
            // Handle error as needed
        }
    };



    /*Delete*/
    const [deleteMsg, setDeleteMsg] = useState('Are you sure you want to delete this folder?');
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [deletedId, setDeletedId] = useState('');

    const toggleDeleteModal = (data = null, type = 'folder') => {
        if (data != null) {
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
                await fetchUrlData()
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
        fetchUrlData();
        fetchFolderData();
    }, [listFormData, urlFormData, folderFormData, globalFormData]);

    return (
        <>
            <div className="home ">
                <div className="header d-flex justify-content-between align-items-center">
                    <div className="history">
                        <ul key={'link'}>
                            {globalFormData.history.map((data, index) => (
                                <>
                                    <li key={index + 'link'} className={'cursor-pointer'}
                                        onClick={async () => changeFolder(index)}>
                                        {data.title}
                                    </li>

                                    {index === globalFormData.history.length - 1 ?
                                        null
                                        : <li key={index + 'arrow'} className={'fs-10'}>
                                            <FaAnglesRight/>
                                        </li>}

                                </>
                            ))}
                        </ul>
                    </div>
                    <div className={'options'}>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" className={'btn btn-theme width-150'}
                            >
                                New
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => toggleFolderModal()}>Add Folder</Dropdown.Item>
                                <Dropdown.Item onClick={() => toggleUrlModal()}>Add Url</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>


                <div className="home-content ">
                    {/*Folder*/}
                    {folderData.length > 0 ? (
                        <div className="section">
                            <div className="section-title">Folders ({totalCountFolder})</div>
                            <div className="folder">
                                {folderData.map((data, index) => (
                                    <Folder key={index + 'folder'} item={data} toggleEditModal={toggleEditModal}
                                            openFolder={openFolder} deleteModal={toggleDeleteModal}/>
                                ))}
                                {totalPageFolder > 1 && totalPageFolder !== folderParam.page ? (
                                    <div className="each-folder"  key={'folder-reload'}>
                                        <div className="title text-center w-100 " onClick={loadFolder}><TbReload/> Load more
                                        </div>
                                    </div>
                                ) : null}
                            </div>

                        </div>
                    ) : null}
                    <div className="section mt-3">
                        {listData.length > 0 ? (
                            <>
                                <div className="section-title">Links ({totalCountLinks})</div>
                                <div className="links">
                                    {listData.map((data, index) => (
                                        <Link key={index} item={data} toggleEditModal={toggleEditModal}
                                              deleteModal={toggleDeleteModal}/>
                                    ))}
                                    {totalPageLinks > 1 && totalPageLinks !== listFormData.page ? (
                                        <div  onClick={loadLinks} className="link-box cursor-pointer rounded-3 shadow-sm position-relative d-flex align-items-center justify-content-center">
                                            <div className="fs-6"><TbReload/> Load more</div>
                                        </div>
                                    ) : null}
                                </div>
                            </>
                        ) : null}


                    </div>

                </div>

                {folderData.length === 0 && listData.length === 0 ? (
                    <EmptyScreen title={'Currently you do not have any folder or url'}/>) : null}


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
                                {renderError("title", errors)}
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

                                {renderError("title", errors)}
                            </div>
                            <div className="form-group form-theme mb-4">
                                <input type="text" className="form-control ps-0"
                                       autoComplete='new-url'
                                       value={urlFormData.url}
                                       name={'url'}
                                       onChange={handleInputChangeUrl}
                                       placeholder="Enter a Url."/>
                                {renderError("url", errors)}
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
                                {renderError("title", errors)}
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
                    <Modal.Header className="border-0">
                        <Modal.Title></Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="px-4 text-center delete-modal">
                        <div className="icon"><MdDeleteForever/></div>
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

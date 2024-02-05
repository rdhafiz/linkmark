
/*Icons*/
/*Custom style*/
import '../stylesheets/components/folder.scss'
import {FaFolder} from "react-icons/fa";
import {HiOutlineDotsVertical} from "react-icons/hi";

const Folder = (props) => {
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
    const handleOutsideClick = (event) => {
        const dropdowns = document.querySelectorAll('.options-dropdown');
        // Check if the click occurred on an element with the 'outsideClick' class
        if (event.target.closest('.outsideClick')) {
            return;
        }

        dropdowns.forEach((dropdown) => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });
    };

    document.addEventListener('click', handleOutsideClick);
    return (
        <>
            <div className="each-folder"  >
                <div className="icon" onClick={toggleFolder}><FaFolder/></div>
                <div className="title" onClick={toggleFolder}>{item.title}</div>
                <div className="option outsideClick" >
                    <HiOutlineDotsVertical onClick={toggleDropdown} />
                    <div className="options-dropdown">
                        <a className={'each-option'} onClick={handleButtonClick}>Edit</a>
                        <a className={'each-option'} onClick={handleDeleteClick}>Delete</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Folder;

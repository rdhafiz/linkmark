
/*Icons*/
import { FaBoxOpen } from "react-icons/fa";
/*Custom style*/
import '../stylesheets/components/empty-screen.scss'

const EmptyScreen = (props) => {
    const { title } = props;


    return (
        <>
            <div className="empty-screen p-3">
                <div className="icon"><FaBoxOpen /></div>
                <div className={'fs-5'}>{title}</div>
                <div  className={'fs-6'}>Please click on &ldquo; <span className={'text-blue'}>New+</span> &ldquo; to create folder or add url</div>
            </div>
        </>
    );
};

export default EmptyScreen;

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaFilePdf, FaThLarge, FaFileImage, FaRegArrowAltCircleRight, FaRegCommentDots, FaFont, FaBirthdayCake, FaListOl, FaKey } from 'react-icons/fa';

import './RightMenu.scss';
import { Context } from '../../../contexts/Context';

const RightMenu = () => {
    
    const { rightMenuShow } = useContext(Context);

    return (
        <div className={`right-menu ${ rightMenuShow?'right-menu-show':'' }`}>
            <div  className='right-menu-items'>
                <Link to={'/users/'} className='right-menu-item d-flex'>
                    <i><FaUser /></i>
                    <span>Users</span>
                </Link>
                <Link to={'/pdf-offsets/'} className='right-menu-item d-flex'>
                    <i><FaFilePdf /></i>
                    <span>PDF Offsets</span>
                </Link>
                <Link to={'/pdf-templates/'} className='right-menu-item d-flex'>
                    <i><FaThLarge /></i>
                    <span>PDF Templates</span>
                </Link>
                <Link to={'/pdf-images/'} className='right-menu-item d-flex'>
                    <i><FaFileImage /></i>
                    <span>PDF Images</span>
                </Link>
                <Link to={'/senders/'} className='right-menu-item d-flex'>
                    <i><FaRegArrowAltCircleRight /></i>
                    <span>Senders</span>
                </Link>
                <Link to={'/descriptions/'} className='right-menu-item d-flex'>
                    <i><FaRegCommentDots /></i>
                    <span>Descriptions</span>
                </Link>
                <Link to={'/font-group/'} className='right-menu-item d-flex'>
                    <i><FaFont /></i>
                    <span>Fonts</span>
                </Link>
                <Link to={'/holidays/'} className='right-menu-item d-flex'>
                    <i><FaBirthdayCake /></i>
                    <span>Holidays</span>
                </Link>
                <Link to={'/ranges/'} className='right-menu-item d-flex'>
                    <i><FaListOl /></i>
                    <span>Ranges</span>
                </Link>
                <Link to={'/keywords/'} className='right-menu-item d-flex'>
                    <i><FaKey /></i>
                    <span>Keywords</span>
                </Link>
            </div>
        </div>
    )
}

export default RightMenu;
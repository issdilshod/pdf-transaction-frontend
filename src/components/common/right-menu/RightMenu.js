import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaFilePdf, FaThLarge, FaFileImage, FaRegArrowAltCircleRight, FaRegCommentDots, FaFont, FaBirthdayCake, FaListOl, FaKey, FaExchangeAlt, FaObjectGroup, FaSignOutAlt } from 'react-icons/fa';

import './RightMenu.scss';
import { Context } from '../../../contexts/Context';

import Api from '../../../services/Api';

const RightMenu = () => {

    const api = new Api();
    const nav = useNavigate();
    
    const { rightMenuShow } = useContext(Context);

    const logout = () => {
        api.request('/api/logout', 'POST', {'token': JSON.parse(localStorage.getItem('auth_token'))['token'] })
            .then(res => {
                nav(process.env.REACT_APP_FRONTEND_PREFIX + '/login');
            })
    }

    return (
        <div className={`right-menu ${ rightMenuShow?'right-menu-show':'' }`}>
            <div  className='right-menu-items'>
                <Link to={`${process.env.REACT_APP_FRONTEND_PREFIX}/users/`} className='right-menu-item d-flex'>
                    <i><FaUser /></i>
                    <span>Users</span>
                </Link>
                <Link to={`${process.env.REACT_APP_FRONTEND_PREFIX}/transaction-type/`} className='right-menu-item d-flex'>
                    <i><FaExchangeAlt /></i>
                    <span>Transaction type</span>
                </Link>
                <Link to={`${process.env.REACT_APP_FRONTEND_PREFIX}/transaction-categories/`} className='right-menu-item d-flex'>
                    <i><FaObjectGroup /></i>
                    <span>Transaction category</span>
                </Link>
                <Link to={`${process.env.REACT_APP_FRONTEND_PREFIX}/pdf-offsets/`} className='right-menu-item d-flex'>
                    <i><FaFilePdf /></i>
                    <span>PDF Offsets</span>
                </Link>
                <Link to={`${process.env.REACT_APP_FRONTEND_PREFIX}/pdf-templates/`} className='right-menu-item d-flex'>
                    <i><FaThLarge /></i>
                    <span>PDF Templates</span>
                </Link>
                <Link to={`${process.env.REACT_APP_FRONTEND_PREFIX}/pdf-images/`} className='right-menu-item d-flex'>
                    <i><FaFileImage /></i>
                    <span>PDF Images</span>
                </Link>
                <Link to={`${process.env.REACT_APP_FRONTEND_PREFIX}/senders/`} className='right-menu-item d-flex'>
                    <i><FaRegArrowAltCircleRight /></i>
                    <span>Senders</span>
                </Link>
                <Link to={`${process.env.REACT_APP_FRONTEND_PREFIX}/descriptions/`} className='right-menu-item d-flex'>
                    <i><FaRegCommentDots /></i>
                    <span>Descriptions</span>
                </Link>
                <Link to={`${process.env.REACT_APP_FRONTEND_PREFIX}/font-group/`} className='right-menu-item d-flex'>
                    <i><FaFont /></i>
                    <span>Fonts</span>
                </Link>
                <Link to={`${process.env.REACT_APP_FRONTEND_PREFIX}/holidays/`} className='right-menu-item d-flex'>
                    <i><FaBirthdayCake /></i>
                    <span>Holidays</span>
                </Link>
                <Link to={`${process.env.REACT_APP_FRONTEND_PREFIX}/ranges/`} className='right-menu-item d-flex'>
                    <i><FaListOl /></i>
                    <span>Ranges</span>
                </Link>
                <Link to={`${process.env.REACT_APP_FRONTEND_PREFIX}/keywords/`} className='right-menu-item d-flex'>
                    <i><FaKey /></i>
                    <span>Keywords</span>
                </Link>

                <div className='right-menu-item d-flex t-cursor-pointer' onClick={ () => { logout() } }>
                    <i><FaSignOutAlt /></i>
                    <span>Logout</span>
                </div>
            </div>
        </div>
    )
}

export default RightMenu;
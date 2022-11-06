import React, { useContext } from 'react';
import { FaTachometerAlt, FaList, FaBuilding, FaUsers, FaCalendar, FaListAlt } from 'react-icons/fa';

import { Context } from '../../../contexts/Context';

import './LeftMenu.scss';
import Logo from '../../../assets/img/logo.svg';
import { Link } from 'react-router-dom';

const LeftMenu = () => {

    const { leftMenuShow } = useContext(Context);

    return (
        <div className={`left-menu ${ leftMenuShow?'left-menu-open':'' }`}>
            <div className='left-menu-logo d-flex'>
                <img src={ Logo } alt='logo' />
                <span>PDF-T</span>
            </div>
            <div className='left-menu-items'>
                <Link className='left-menu-item d-flex' to={`${process.env.REACT_APP_FRONTEND_PREFIX}/dashboard/`}>
                    <i><FaTachometerAlt /></i>
                    <span>Dashboard</span>
                </Link>
                <Link className='left-menu-item d-flex' to={`${process.env.REACT_APP_FRONTEND_PREFIX}/tasks/`}>
                    <i><FaList /></i>
                    <span>Tasks</span>
                </Link>
                <Link className='left-menu-item d-flex' to={`${process.env.REACT_APP_FRONTEND_PREFIX}/companies/`}>
                    <i><FaBuilding /></i>
                    <span>Companies</span>
                </Link>
                <Link className='left-menu-item d-flex' to={`${process.env.REACT_APP_FRONTEND_PREFIX}/customers/`}>
                    <i><FaUsers /></i>
                    <span>Customers</span>
                </Link>
                <Link className='left-menu-item d-flex' to={`${process.env.REACT_APP_FRONTEND_PREFIX}/organizations/`}>
                    <i><FaCalendar /></i>
                    <span>Organizaations</span>
                </Link>
                <Link className='left-menu-item d-flex' to={`${process.env.REACT_APP_FRONTEND_PREFIX}/statements/`}>
                    <i><FaListAlt /></i>
                    <span>Statements</span>
                </Link>
            </div>
        </div>
    );
}

export default LeftMenu;
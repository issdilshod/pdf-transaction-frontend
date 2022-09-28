import { FaBars, FaCog } from 'react-icons/fa';

import { useContext } from 'react';
import { Context } from '../../../contexts/Context';
import './Header.scss';

const Header = () => {

    const { leftMenuShow, setLeftMenuShow, rightMenuShow, setRightMenuShow } = useContext(Context);

    return (
        <div className='header-block d-flex'>
            <div className='left-menu-toggle mr-auto' onClick={() => {setLeftMenuShow(!leftMenuShow); setRightMenuShow(false); }}>
                <span><FaBars /></span>
            </div>
            <div className='rigth-menu-control d-flex' onClick={ () => { setRightMenuShow(!rightMenuShow); setLeftMenuShow(false); } }>
                <div className='setting-control'>
                    <span><FaCog /> Settings</span>
                </div>
            </div>
        </div>
    );
}

export default Header;
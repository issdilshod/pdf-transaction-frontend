import React, { useState } from 'react';
import { Context } from '../../contexts/Context';

import Header from './header/Header';
import LeftMenu from './left-menu/LeftMenu';
import RightMenu from './right-menu/RightMenu';

const Collect = ( { MainContent } ) => {
    const [leftMenuShow, setLeftMenuShow] = useState(false);
    const [rightMenuShow, setRightMenuShow] = useState(false);

    return (
        <Context.Provider value={
            {leftMenuShow, setLeftMenuShow, rightMenuShow, setRightMenuShow}
        }>
            <div className='d-flex'>
                <div className='menu-content'>
                    <LeftMenu />
                </div>
                <div className='main-content'>
                    <Header />
                    <div className='d-flex'>
                        <div className='mr-auto w-100 main-section'><MainContent /></div>
                        <div><RightMenu /></div>
                    </div>
                </div>
            </div>
        </Context.Provider>
    )
}

export default Collect;
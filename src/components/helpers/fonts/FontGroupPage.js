import { useContext } from 'react';

import { ContextCrud } from '../../../contexts/ContextCrud';

import Notification from '../../common/notification/Notification';
import Modal from '../../common/modal/Modal';

import FontGroupForm from'./FontGroupForm';
import FontGroupList from'./FontGroupList';

import './FontGroup.module.scss';

const FontGroupPage = () => {
    const { alertMsg, alertType, alertShow, setAlertShow, modalShow } = useContext(ContextCrud);

    return (
        <>
            <div className='container-fluid'>
                <div className='page-block'>
                    <FontGroupList />
                </div>
            </div>
            <Modal Content={FontGroupForm} Show={modalShow} />
            <Notification Msg={alertMsg} Type={alertType} Show={alertShow} SetShow={setAlertShow} />
        </>
    )
} 

export default FontGroupPage;
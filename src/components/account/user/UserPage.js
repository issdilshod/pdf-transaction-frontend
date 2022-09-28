import { useContext } from 'react';

import { ContextCrud } from '../../../contexts/ContextCrud';

import Modal from '../../common/modal/Modal';
import UserList from'./UserList';
import UserForm from'./UserForm';

import './User.module.scss';
import Notification from '../../common/notification/Notification';

const UserPage = () => {
    const { alertMsg, alertType, alertShow, setAlertShow, modalShow } = useContext(ContextCrud);

    return (
        <>
            <div className='container-fluid'>
                <div className='page-block'>
                    <UserList />
                </div>
            </div>
            <Modal Content={UserForm} Show={modalShow} />
            <Notification Msg={alertMsg} Type={alertType} Show={alertShow} SetShow={setAlertShow} />
        </>
    )
} 

export default UserPage;
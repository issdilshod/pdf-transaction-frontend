import { useContext } from 'react';

import { ContextCrud } from '../../../contexts/ContextCrud';

import Notification from '../../common/notification/Notification';
import Modal from '../../common/modal/Modal';

import OrganizationForm from'./OrganizationForm';
import OrganizationList from'./OrganizationList';

import './Organization.module.scss';

const OrganizationPage = () => {
    const { alertMsg, alertType, alertShow, setAlertShow, modalShow } = useContext(ContextCrud);

    return (
        <>
            <div className='container-fluid'>
                <div className='page-block'>
                    <OrganizationList />
                </div>
            </div>
            <Modal Content={OrganizationForm} Show={modalShow} />
            <Notification Msg={alertMsg} Type={alertType} Show={alertShow} SetShow={setAlertShow} />
        </>
    )
} 

export default OrganizationPage;
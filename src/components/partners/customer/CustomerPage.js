import { useContext } from 'react';

import { ContextCrud } from '../../../contexts/ContextCrud';

import Notification from '../../common/notification/Notification';
import Modal from '../../common/modal/Modal';

import CustomerForm from'./CustomerForm';
import CustomerList from'./CustomerList';

import ImportForm from './ImportForm';

import './Customer.module.scss';

const CustomerPage = () => {
    const { alertMsg, alertType, alertShow, setAlertShow, modalShow, importModalShow } = useContext(ContextCrud);

    return (
        <>
            <div className='container-fluid'>
                <div className='page-block'>
                    <CustomerList />
                </div>
            </div>
            <Modal Content={CustomerForm} Show={modalShow} />
            <Modal Content={ImportForm} Show={importModalShow} />
            <Notification Msg={alertMsg} Type={alertType} Show={alertShow} SetShow={setAlertShow} />
        </>
    )
} 

export default CustomerPage;
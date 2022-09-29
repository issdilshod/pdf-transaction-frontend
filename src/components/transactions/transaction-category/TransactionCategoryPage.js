import { useContext } from 'react';

import { ContextCrud } from '../../../contexts/ContextCrud';

import Notification from '../../common/notification/Notification';
import Modal from '../../common/modal/Modal';

import TransactionCategoryForm from'./TransactionCategoryForm';
import TransactionCategoryList from'./TransactionCategoryList';

import './TransactionCategory.module.scss';

const TransactionCategoryPage = () => {
    const { alertMsg, alertType, alertShow, setAlertShow, modalShow } = useContext(ContextCrud);

    return (
        <>
            <div className='container-fluid'>
                <div className='page-block'>
                    <TransactionCategoryList />
                </div>
            </div>
            <Modal Content={TransactionCategoryForm} Show={modalShow} />
            <Notification Msg={alertMsg} Type={alertType} Show={alertShow} SetShow={setAlertShow} />
        </>
    )
} 

export default TransactionCategoryPage;
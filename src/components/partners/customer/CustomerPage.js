import { useContext, useEffect, useState } from 'react';

import { ContextCrud } from '../../../contexts/ContextCrud';
import { ContextData } from '../../../contexts/ContextData';

import Notification from '../../common/notification/Notification';
import Modal from '../../common/modal/Modal';

import CustomerForm from'./CustomerForm';
import CustomerList from'./CustomerList';

import ImportForm from './ImportForm';

import './Customer.module.scss';
import Pagination from '../../common/pagination/Pagination';

const CustomerPage = () => {
    const { alertMsg, alertType, alertShow, setAlertShow, modalShow, importModalShow } = useContext(ContextCrud);

    const { handlePaginationClick, currentPage, totalPage } = useContext(ContextData);

    const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);
    useEffect(() => {
        setLocalCurrentPage(currentPage);
    }, [currentPage]);
    const [localTotalPage, setLocalTotalPage] = useState(totalPage);
    useEffect(() => {
        setLocalTotalPage(totalPage);
    }, [totalPage]);

    return (
        <>
            <div className='container-fluid'>
                <div className='page-block'>
                    <CustomerList />
                    <Pagination 
                        handlePaginationClick={handlePaginationClick}
                        currentPage={localCurrentPage}
                        totalPage={localTotalPage}
                        rangeShow={5}
                    />
                </div>
            </div>
            <Modal Content={CustomerForm} Show={modalShow} />
            <Modal Content={ImportForm} Show={importModalShow} />
            <Notification Msg={alertMsg} Type={alertType} Show={alertShow} SetShow={setAlertShow} />
        </>
    )
} 

export default CustomerPage;
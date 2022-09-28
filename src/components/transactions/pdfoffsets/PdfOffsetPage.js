import { useContext } from 'react';

import { ContextCrud } from '../../../contexts/ContextCrud';

import Notification from '../../common/notification/Notification';
import Modal from '../../common/modal/Modal';

import PdfOffsetForm from'./PdfOffsetForm';
import PdfOffsetList from'./PdfOffsetList';

import './PdfOffset.module.scss';

const PdfOffsetPage = () => {
    const { alertMsg, alertType, alertShow, setAlertShow, modalShow } = useContext(ContextCrud);

    return (
        <>
            <div className='container-fluid'>
                <div className='page-block'>
                    <PdfOffsetList />
                </div>
            </div>
            <Modal Content={PdfOffsetForm} Show={modalShow} />
            <Notification Msg={alertMsg} Type={alertType} Show={alertShow} SetShow={setAlertShow} />
        </>
    )
} 

export default PdfOffsetPage;
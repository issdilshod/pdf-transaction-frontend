import { useContext } from 'react';

import { ContextCrud } from '../../../contexts/ContextCrud';

import Notification from '../../common/notification/Notification';
import Modal from '../../common/modal/Modal';

import PdfTemplateForm from'./PdfTemplateForm';
import PdfTemplateList from'./PdfTemplateList';

import './PdfTemplate.module.scss';

const PdfTempaltePage = () => {
    const { alertMsg, alertType, alertShow, setAlertShow, modalShow } = useContext(ContextCrud);

    return (
        <>
            <div className='container-fluid'>
                <div className='page-block'>
                    <PdfTemplateList />
                </div>
            </div>
            <Modal Content={PdfTemplateForm} Show={modalShow} />
            <Notification Msg={alertMsg} Type={alertType} Show={alertShow} SetShow={setAlertShow} />
        </>
    )
} 

export default PdfTempaltePage;
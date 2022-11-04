import { useContext } from 'react';

import { ContextCrud } from '../../../contexts/ContextCrud';

import Notification from '../../common/notification/Notification';
import Modal from '../../common/modal/Modal';

import PdfImageForm from'./PdfImageForm';
import PdfImageList from'./PdfImageList';

import './PdfImage.module.scss';

const PdfImagePage = () => {
    const { alertMsg, alertType, alertShow, setAlertShow, modalShow } = useContext(ContextCrud);

    return (
        <>
            <div className='container-fluid'>
                <div className='page-block'>
                    <PdfImageList />
                </div>
            </div>
            <Modal Content={PdfImageForm} Show={modalShow} />
            <Notification Msg={alertMsg} Type={alertType} Show={alertShow} SetShow={setAlertShow} />
        </>
    )
} 

export default PdfImagePage;
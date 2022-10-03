import { useContext, useState } from 'react';

import { ContextCrud } from '../../../contexts/ContextCrud';

import Notification from '../../common/notification/Notification';

import Company from './steps/Company';

import './Statement.scss';

const StatementsPage = () => {

    const [breadcrumbs, setBreadcrumbs] = useState([
        'Company', 'Organization'
    ]);
    const [step, setStep] = useState(0);

    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('');
    const [alertShow, setAlertShow] = useState(false);

    //#region Triggers

    const triggerAlertShow = (typ, msg) => {
        setAlertType(typ);
        setAlertMsg(msg);
        setAlertShow(true);
    }

    //#endregion

    return (
        <>
            <div className='container-fluid'>
                <div className='page-block'>

                    <div className='c-breadcrumbs mb-2'>
                        <div className='c-breadcrumbs-items d-flex'>
                            {
                                breadcrumbs.map((value, index) => {
                                    return (
                                        <div key={index} className={`c-breadcrumbs-item ${index>step?'c-disabled':''}`}>
                                            <span>
                                                {value}
                                            </span>
                                        </div>
                                    )
                                })
                            } 
                        </div>
                    </div>

                    <div className='steps-page'>
                        <Company />
                    </div>

                    <div className='spec-pagination mt-2 d-flex justify-content-end'>
                        <div>Previous</div>
                        <div>Next</div>
                        <div>Save</div>
                    </div>

                </div>
            </div>
            <Notification Msg={alertMsg} Type={alertType} Show={alertShow} SetShow={setAlertShow} />
        </>
    )
} 

export default StatementsPage;
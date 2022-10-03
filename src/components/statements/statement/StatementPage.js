import { useContext, useEffect, useState } from 'react';

import { ContextCrud } from '../../../contexts/ContextCrud';
import { ContextData } from '../../../contexts/ContextData';

import Notification from '../../common/notification/Notification';

import Company from './steps/Company';
import Organization from './steps/Organization';

import './Statement.scss';

const StatementsPage = () => {
    const { loading, id } = useContext(ContextData);

    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('');
    const [alertShow, setAlertShow] = useState(false);

    //#region Statement const 

    const [breadcrumbs, setBreadcrumbs] = useState([
        'Company', 'Organization'
    ]);

    const [step, setStep] = useState(0);
    const [stepAble, setStepAble] = useState(0);

    const entityStatement = {
        'company_id': '',
        'organization_id': '',
    };

    const entityPeriod = {
        'statement_id': '',
        'period': ''
    };

    const entityTransaction = {
        'period_id': '',
        'type_id': '',
        'category_id': '',
        'customer_id': '',
        'sender_id': '',
        'date': '',
        'amount': '',
        'amount_min': '',
        'amount_max': ''
    };

    const [statement, setStatement] = useState(entityStatement);
    const [period, setPeriod] = useState([entityPeriod]);

    useEffect(() => {
        console.log(step);
    }, [step]);

    //#endregion

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
                                        <div 
                                            key={index} 
                                            className={`c-breadcrumbs-item ${index>step?'c-disabled':''}`}
                                            onClick={ () => {setStep(index)} }
                                        >
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
                        {   step==0 &&
                            <Company statement={statement} setStatement={setStatement} step={step} setStep={setStep} />
                        }
                        {   step==1 &&
                            <Organization statement={statement} setStatement={setStatement} step={step} setStep={setStep} />
                        }
                    </div>

                    <div className='spec-pagination d-flex justify-content-end'>
                        <div>Previous</div>
                        <div>Save</div>
                        <div>Next</div>
                    </div>

                </div>
            </div>
            <Notification Msg={alertMsg} Type={alertType} Show={alertShow} SetShow={setAlertShow} />
        </>
    )
} 

export default StatementsPage;
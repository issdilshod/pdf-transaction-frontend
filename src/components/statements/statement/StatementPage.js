import { useContext, useEffect, useState } from 'react';

import Api from '../../../services/Api';

import { ContextCrud } from '../../../contexts/ContextCrud';
import { ContextData } from '../../../contexts/ContextData';

import Notification from '../../common/notification/Notification';

import Company from './steps/Company';
import Organization from './steps/Organization';

import './Statement.scss';
import Transaction from './steps/Transaction';

const StatementsPage = () => {
    const api = new Api();

    const { loading, id } = useContext(ContextData);

    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('');
    const [alertShow, setAlertShow] = useState(false);

    //#region Statement const 

    const [breadcrumbs, setBreadcrumbs] = useState([
        'Company', 'Organization', 'Transactions', 'Pages', 'Replacements', 'Compression', 'PDF'
    ]);

    const [step, setStep] = useState(0);
    const [stepAble, setStepAble] = useState(0);

    const entityStatement = {
        'company_id': '',
        'organization_id': '',
        'periods': []
    };

    const entityPeriod = {
        'period': '', 
        'begining_balance': '',
        'ending_balance': '',
        'transactions': []
    };

    const entityTransaction = {
        'type_id': '',
        'category_id': '',
        'customer_id': '',
        'sender_id': '',
        'date': '',
        'amount': '',
        'amount_min': '',
        'amount_max': '',
        'descriptions': [ 
            { 'description': { 'rules': [] }, 'value': '{}' } 
        ],
    };

    const [editMode, setEditMode] = useState(false);
    const [statement, setStatement] = useState(entityStatement);

    useEffect(() => {
        if (step==3){ // transaction created
            if (!editMode){
                /*api.request('/api/statement', 'POST', statement)
                    .then(res => {

                    });*/
            }
        }
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
                        {   step==2 &&
                            <Transaction step={step} setStep={setStep} statement={statement} setStatement={setStatement} entityPeriod={entityPeriod} entityTransaction={entityTransaction} />
                        }
                    </div>

                    <div className='spec-pagination d-flex justify-content-end'>
                        <div 
                            className={`${step<=0?'c-disabled':''}`}
                            onClick={ () => { if (step>0){ setStep(step-1) } } }
                        >
                            Previous
                        </div>
                        <div>Save</div>
                        <div 
                            className={`${step>=7?'c-disabled':''}`}
                            onClick={ () => { if (step<7){ setStep(step+1) } } }
                        >
                            Next
                        </div>
                    </div>

                </div>
            </div>
            <Notification Msg={alertMsg} Type={alertType} Show={alertShow} SetShow={setAlertShow} />
        </>
    )
} 

export default StatementsPage;
import { useContext, useEffect, useState } from 'react';

import Api from '../../../services/Api';

import { ContextCrud } from '../../../contexts/ContextCrud';
import { ContextData } from '../../../contexts/ContextData';

import Notification from '../../common/notification/Notification';

import Company from './steps/Company';
import Organization from './steps/Organization';
import Transaction from './steps/Transaction';
import Pages from './steps/Pages';

import './Statement.scss';
import Replacements from './steps/Replacements';
import Compression from './steps/Compression';
import Pdf from './steps/Pdf';
import DateFunction from './steps/transaction/functions/DateFunction';
import TransactionFunction from './steps/transaction/functions/TransactionFunction';

const StatementsPage = () => {
    const api = new Api();
    const transactionFunction = new TransactionFunction();

    const { setLoading, id } = useContext(ContextData);

    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('');
    const [alertShow, setAlertShow] = useState(false);

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
        'account_number': '',
        'item_previous_cycle': '',
        'transactions': [],
        'replacement': [],

        // helper
        'types': [],
        'pages': [],
        'pdf_content': {
            'lines': [],
            'transactions': []
        },
        'compression': [],
    };

    const entityTransaction = {
        'type_id': '',
        'category_id': '',
        'customer_id': '',
        'customer': null,
        'sender_id': '',
        'sender': null,
        'date': '',
        'amount': '',
        'amount_min': '',
        'amount_max': '',
        'descriptions': [ 
            { 'description': { 'rules': [] }, 'value': '{}' } 
        ],

        // helper
        'offset': {
            'id': '', 'value': ''
        }
    };

    const [editMode, setEditMode] = useState(false);
    const [statement, setStatement] = useState(entityStatement);
    const [types, setTypes] = useState([]);
    const [fonts, setFonts] = useState([]);
    const [pages, setPages] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const [categories, setCategories] = useState([]);
    const [senders, setSenders] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        setLoading(true);
        firstInit()
    }, [])

    const firstInit = () => {
        
        api.request('/api/transaction-type', 'GET')
            .then(res => {
                if (res.status===200||res.status===201){
                    setTypes(res.data.data);
                    let tmpTyp = res.data.data;

                    api.request('/api/transaction-category', 'GET')
                        .then(res => {
                            if (res.status===200||res.status===201){
                                setCategories(res.data.data);
                                let tmpCateg = res.data.data;

                                api.request('/api/transaction-page', 'GET')
                                    .then(res => {
                                        if (res.status===200||res.status===201){
                                            setPages(res.data.data);
                                            let tmpPag = res.data.data;

                                            if (id){
                                                initStatement(tmpTyp, tmpCateg, tmpPag);
                                            }else{
                                                setLoading(false);
                                            }
                                        }
                                    });
                            }
                        });
                }
            });

        api.request('/api/holiday', 'GET')
            .then(res => {
                if (res.status===200||res.status===201){
                    setHolidays(res.data.data);
                }
            });

        api.request('/api/font-group', 'GET')
            .then(res => {
                if (res.status===200||res.status===201){
                    setFonts(res.data.data);
                }
            });
        
        api.request('/api/sender', 'GET')
            .then(res => {
                if (res.status===200||res.status===201){
                    setSenders(res.data.data);
                }
            })

        api.request('/api/customer', 'GET')
            .then(res => {
                if (res.status===200||res.status===201){
                    setCustomers(res.data.data);
                }
            })
        
    }

    const initStatement = (typess, categoriess, pagess) => {
        api.request('/api/statement/'+id, 'GET')
            .then(res => {
                if (res.status===200||res.status===201){
                    
                    let tmpArray = {...res.data.data};
                    for (let periodIndex in tmpArray['periods']){
                        // get types of period with values
                        tmpArray['periods'][periodIndex]['types'] = transactionFunction.get_period_types(tmpArray['periods'][periodIndex], typess);

                        // get pages of transaction
                        tmpArray['periods'][periodIndex] = transactionFunction.get_period_pages(tmpArray['periods'][periodIndex], categoriess, pagess);

                        // get pdf contents (lines/transactions)
                        tmpArray['periods'][periodIndex] = transactionFunction.get_pdf_content_lines(tmpArray['periods'][periodIndex], pagess);
                        tmpArray['periods'][periodIndex] = transactionFunction.get_pdf_content_transactions(tmpArray, tmpArray['periods'][periodIndex], pagess);
                    }
                    setStatement(tmpArray);
                    setEditMode(true);
                }
                setLoading(false);
            });
    }

    useEffect(() => {
        
        if (step>=3){ // transaction created
            let doubleStatement = statementToSave();
            if (!editMode){
                api.request('/api/statement', 'POST', doubleStatement)
                    .then(res => {
                        if (res.status==200||res.status==201){
                            setStatement({...statement, 'id': res.data.data.id});
                            setEditMode(true);
                        }
                    });
            }else{
                api.request('/api/statement/'+doubleStatement['id'], 'PUT', doubleStatement)
                    .then(res => {
                        // show alert saved
                    });
            }
        }
    }, [step]);

    const statementToSave = () => {
        let tmpArray = JSON.parse(JSON.stringify(statement));
        let dateFunction = new DateFunction();

        // periods
        for (let key in tmpArray['periods']){

            // transactions
            for (let key1 in tmpArray['periods'][key]['transactions']){
                tmpArray['periods'][key]['transactions'][key1]['date'] = dateFunction.formatDate(new Date(tmpArray['periods'][key]['transactions'][key1]['date']));
            }

            // replacement
            for (let key1 in tmpArray['periods'][key]['replacement']){
                tmpArray['periods'][key]['replacement'][key1]['content'] = '';
                tmpArray['periods'][key]['replacement'][key1]['original_content'] = '';

                // font
                for (let key2 in tmpArray['periods'][key]['replacement'][key1]['font']){
                    tmpArray['periods'][key]['replacement'][key1]['font'][key2]['content'] = [];
                }
            }
        }
        return tmpArray;
    }

    const triggerAlertShow = (typ, msg) => {
        setAlertType(typ);
        setAlertMsg(msg);
        setAlertShow(true);
    }

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
                            <Company 
                                statement={statement} setStatement={setStatement} 
                                step={step} setStep={setStep} 
                            />
                        }
                        {   step==1 &&
                            <Organization 
                                statement={statement} setStatement={setStatement} 
                                step={step} setStep={setStep} 
                            />
                        }
                        {   step==2 &&
                            <Transaction 
                                step={step} setStep={setStep} 
                                statement={statement} setStatement={setStatement} 
                                entityPeriod={entityPeriod} entityTransaction={entityTransaction} 
                                types={types} pages={pages} holidays={holidays} categories={categories} 
                                senders={senders} setSenders={setSenders} customers={customers} setCustomers={setCustomers}
                            />
                        }
                        {   step==3 &&
                            <Pages 
                                step={step} setStep={setStep} 
                                statement={statement} setStatement={setStatement} 
                                types={types} 
                            />
                        }
                        {   step==4 &&
                            <Replacements 
                                step={step} setStep={setStep} 
                                statement={statement} setStatement={setStatement} 
                                types={types} fonts={fonts} 
                            />
                        }
                        {   step==5 &&
                            <Compression 
                                step={step} setStep={setStep} 
                                statement={statement} setStatement={setStatement} 
                                types={types} fonts={fonts} 
                            />
                        }
                        {   step==6 &&
                            <Pdf 
                                step={step} setStep={setStep} 
                                statement={statement} setStatement={setStatement} 
                            />
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
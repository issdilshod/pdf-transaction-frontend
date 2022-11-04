import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Transactions from "./transaction/Transactions";


import Api from '../../../../services/Api';
import DateFunction from './transaction/functions/DateFunction';

import { ContextData } from '../../../../contexts/ContextData';


const Transaction = ({ step, setStep, statement, setStatement, entityPeriod, entityTransaction, types, pages, holidays, categories, senders, customers }) => {

    const { setLoading } = useContext(ContextData);

    const api = new Api();
    const dateFunction = new DateFunction();

    const [manualPeriod, setManualPeriod] = useState({
        'period': '',
        'type_id': '',
        'total': ''
    });


    const handleAddTransaction = () => {
        if (manualPeriod['period']!='' && manualPeriod['type_id']!='' && manualPeriod['total']!=''){
            setLoading(true);

            let tmpArray = { ...statement };

            // set period
            let exists = false, exists_index = -1;
            for (let key in tmpArray['periods']){
                if (tmpArray['periods'][key]['period']==manualPeriod['period']){
                    exists = true;
                    exists_index = key;
                }
            }
            if (!exists){
                let tmpPeriod = {...entityPeriod};
                tmpPeriod['period'] = manualPeriod['period'];
                tmpArray['periods'].push(tmpPeriod);
            }

            // set transactions
            for (let key in tmpArray['periods']){
                if (tmpArray['periods'][key]['period']==manualPeriod['period']){
                    // transactions
                    for (let i=0; i<parseInt(manualPeriod['total']); i++){
                        let tmpTransactions = {...entityTransaction};
                        tmpTransactions['date'] = dateFunction.random(manualPeriod['period'], holidays);
                        tmpTransactions['type_id'] = manualPeriod['type_id'];
                        tmpArray['periods'][key]['transactions'].push(tmpTransactions);
                    }

                    // sort array
                    tmpArray['periods'][key]['transactions'].sort(function(a, b) {
                        return a.type_id.toString().localeCompare(b.type_id.toString()) || new Date(a.date) - new Date(b.date);
                    });
                }
            }

            //setStatement(tmpArray);

            // get begining balance from database
            let lastPeriod = manualPeriod['period'];
            lastPeriod = new Date(lastPeriod);
            lastPeriod = new Date(lastPeriod.getFullYear(), lastPeriod.getMonth(), 0);
            lastPeriod = lastPeriod.getFullYear() +
                        (lastPeriod.getMonth() + 1).toString().padStart(2, '0') +
                        (lastPeriod.getDate()).toString().padStart(2, '0');

            if (exists_index==-1){
                exists_index = tmpArray['periods'].length-1;
            }

            api.request('/api/statement-last/' + tmpArray['company_id'] + '/' + lastPeriod, 'GET')
                .then(res => {
                    if (res.status===200||res.status===201){
                        if (tmpArray['periods'][exists_index]['begining_balance']==null || tmpArray['periods'][exists_index]['begining_balance']==''){
                            tmpArray['periods'][exists_index]['begining_balance'] = res.data.ending_balance;
                        }
                    }
                    setStatement(tmpArray);
                    setLoading(false);
                });
        }   
    }

    const handleManualChange = (e) => {
        const { value, name } = e.target;
        setManualPeriod({ ...manualPeriod, [name]: value });
    }

    return (
        <>
            <div className='transaction-creator'>
                <div className='form-group'>
                    <label>Period:</label>
                    <input 
                        className='form-control' 
                        name='period'
                        type='date'
                        onChange={ (e) => { handleManualChange(e) } }
                    />
                </div>
                <div className='form-group'>
                    <label>Type:</label>
                    <select
                        className='form-control'
                        name='type_id'
                        onChange={ (e) => { handleManualChange(e) } }
                    >
                        <option value=''>-</option>
                        {
                            types.map((value, index) => {
                                return (
                                    <option key={index} value={value['id']}>{value['name']}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='form-group'>
                    <label>Total:</label>
                    <input
                        className='form-control'
                        name='total'
                        type='number'
                        onChange={ (e) => { handleManualChange(e) } }
                    />
                </div>
                <div className='form-group text-right'>
                    <button className='c-btn c-btn-primary' onClick={ handleAddTransaction }>
                        <FaPlus />
                    </button>
                </div>
            </div>

            <div className='transaction-info'>
                <Transactions 
                    statement={statement} setStatement={setStatement} 
                    types={types} pages={pages} categories={categories} holidays={holidays} 
                    senders={senders} customers={customers} 
                />
            </div>
        </>
        
    )
}

export default Transaction;
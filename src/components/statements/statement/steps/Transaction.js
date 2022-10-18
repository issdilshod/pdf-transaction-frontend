import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import Transactions from "./transaction/Transactions";


import Api from '../../../../services/Api';
import DateFunction from './transaction/functions/DateFunction';


const Transaction = ({ step, setStep, statement, setStatement, entityPeriod, entityTransaction }) => {

    const api = new Api();
    const dateFunction = new DateFunction();

    const [types, setTypes] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const [pages, setPages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [senders, setSenders] = useState([]);

    const [manualPeriod, setManualPeriod] = useState({
        'period': '',
        'type_id': '',
        'total': ''
    });

    useEffect(() => {
        api.request('/api/transaction-type', 'GET')
            .then(res => {
                if (res.status===200||res.status===201){
                    setTypes(res.data.data);
                }
            });
        
        api.request('/api/holiday', 'GET')
            .then(res => {
                if (res.status===200||res.status===201){
                    setHolidays(res.data.data);
                }
            });

        api.request('/api/transaction-page', 'GET')
            .then(res => {
                if (res.status===200||res.status===201){
                    setPages(res.data.data);
                }
            })

        api.request('/api/transaction-category', 'GET')
            .then(res => {
                if (res.status===200||res.status===201){
                    setCategories(res.data.data);
                }
            })
        api.request('/api/sender', 'GET')
            .then(res => {
                if (res.status===200||res.status===201){
                    setSenders(res.data.data);
                }
            })

    }, []);

    const handleAddTransaction = () => {
        if (manualPeriod['period']!='' && manualPeriod['type_id']!='' && manualPeriod['total']!=''){
            let tmpArray = { ...statement };

            // set period
            let exsist = false;
            for (let key in tmpArray['periods']){
                if (tmpArray['periods'][key]['period']==manualPeriod['period']){
                    exsist = true;
                }
            }
            if (!exsist){
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
                        return a.type_id.localeCompare(b.type_id) || new Date(a.date) - new Date(b.date);
                    });
                }
            }

            setStatement(tmpArray);
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
                <Transactions statement={statement} setStatement={setStatement} types={types} pages={pages} categories={categories} holidays={holidays} senders={senders} />
            </div>
        </>
        
    )
}

export default Transaction;
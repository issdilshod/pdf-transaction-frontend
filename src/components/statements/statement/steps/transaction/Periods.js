import { useState } from "react";
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import Descriptions from "./Descriptions";
import CategoryFunction from "./functions/CategoryFunction";
import DateFunction from "./functions/DateFunction";
import NumberFunction from "./functions/NumberFunction";
import TypeFunction from "./functions/TypeFunction";
import TransactionFunction from "./functions/TransactionFunction";
import CurrencyInput from "react-currency-input-field";
import CurrencyFormat from "react-currency-format";
import { Tab, Tabs } from "react-bootstrap";


const Periods = ({statement, setStatement, transactions, types, pages, categories, holidays, periodIndex}) => {

    const typeFunction = new TypeFunction();
    const dateFunction = new DateFunction()
    const numberFunction = new NumberFunction();
    const categoryFunction = new CategoryFunction();
    const transactionFunction = new TransactionFunction();

    const [dateFormEntity, setDateFormEntity] = useState({'show': false, 'periodIndex': periodIndex, 'transactionIndex': '', 'date': '', 'time': ''});
    const [dateForm, setDateForm] = useState({'show': false, 'periodIndex': periodIndex, 'transactionIndex': '', 'date': '', 'time': ''});

    /* Handle Globe */

    const handleRemovePeriod = () => {
        let tmpArray = {...statement};
        tmpArray['periods'].splice(periodIndex, 1);
        setStatement(tmpArray);
    } 

    const handleRemoveTransaction = (index) => {
        let tmpArray = {...statement};
        tmpArray['periods'][periodIndex]['transactions'].splice(index, 1);
        if (tmpArray['periods'][periodIndex]['transactions'].length<=0){
            tmpArray['periods'].splice(periodIndex, 1);
        }else{
            // calc ending balance
            tmpArray['periods'][periodIndex]['ending_balance'] = transactionFunction.calc_ending_balance(tmpArray['periods'][periodIndex]);

            // get types of period with values
            tmpArray['periods'][periodIndex]['types'] = transactionFunction.get_period_types(tmpArray['periods'][periodIndex], types);

            // get pages of transaction
            tmpArray['periods'][periodIndex] = transactionFunction.get_period_pages(tmpArray['periods'][periodIndex], categories, pages);

            // get pdf contents (lines/transactions)
            tmpArray['periods'][periodIndex] = transactionFunction.get_pdf_content_lines(tmpArray['periods'][periodIndex], pages);
            tmpArray['periods'][periodIndex] = transactionFunction.get_pdf_content_transactions(tmpArray, tmpArray['periods'][periodIndex], pages);
        }
    
        setStatement(tmpArray);
    }

    /* Handle Begining balance */

    const handleOnChangeBeginingBalance = (e) => {
        const { value } = e.target;
        let tmpArray = {...statement};
        tmpArray['periods'][periodIndex]['begining_balance'] = value;

        // calc ending balance
        tmpArray['periods'][periodIndex]['ending_balance'] = transactionFunction.calc_ending_balance(tmpArray['periods'][periodIndex]);

        setStatement(tmpArray);
    }

    /* Handle Category */

    const handleCategoryChange = (e, type_id, index) => {
        const { value } = e.target;
        let tmpArray = {...statement};
        tmpArray['periods'][periodIndex]['transactions'][index]['category_id'] = value;
        tmpArray['periods'][periodIndex]['transactions'][index]['descriptions'] = [];
        if (value!=''){
            let category = typeFunction.getTypeCategory(type_id, value, types);
            tmpArray['periods'][periodIndex]['transactions'][index]['descriptions'] = categoryFunction.getDescriptions(category);
        }
        
        // get types of period with values
        tmpArray['periods'][periodIndex]['types'] = transactionFunction.get_period_types(tmpArray['periods'][periodIndex], types);

        // get pages of transaction
        tmpArray['periods'][periodIndex] = transactionFunction.get_period_pages(tmpArray['periods'][periodIndex], categories, pages);

        // get pdf contents (lines/transactions)
        tmpArray['periods'][periodIndex] = transactionFunction.get_pdf_content_lines(tmpArray['periods'][periodIndex], pages);
        tmpArray['periods'][periodIndex] = transactionFunction.get_pdf_content_transactions(tmpArray, tmpArray['periods'][periodIndex], pages);

        setStatement(tmpArray);
    }

    /* Hanlde Amount */

    const handleAmountChange = (e, index) => {
        const {value, name} = e.target;
        let tmpArray = {...statement};
        tmpArray['periods'][periodIndex]['transactions'][index]['amount_'+name] = value;
        setStatement(tmpArray);
    }

    const handleAmountGen = (index) => {
        let tmpArray = {...statement};
        let amount = numberFunction.random(tmpArray['periods'][periodIndex]['transactions'][index]['amount_min'], tmpArray['periods'][periodIndex]['transactions'][index]['amount_max']);
        tmpArray['periods'][periodIndex]['transactions'][index]['amount'] = amount;

        // calc ending balance
        tmpArray['periods'][periodIndex]['ending_balance'] = transactionFunction.calc_ending_balance(tmpArray['periods'][periodIndex]);

        // get types of period with values
        tmpArray['periods'][periodIndex]['types'] = transactionFunction.get_period_types(tmpArray['periods'][periodIndex], types);

        // get pdf content (transactions)
        tmpArray['periods'][periodIndex] = transactionFunction.get_pdf_content_transactions(tmpArray, tmpArray['periods'][periodIndex], pages);

        setStatement(tmpArray);
    }

    /* Handle Date */

    const handleDateClick = (index) => {
        let tmpArray = transactions;
        let date = dateFunction.get_fullyear_month_day(tmpArray[index]['date']);
        let time = dateFunction.get_hour_minute(tmpArray[index]['date']);
        let dateFirst = dateFunction.get_first_day(statement['periods'][periodIndex]['period']);
        setDateForm({ ...dateForm, show: true, transactionIndex: index, date: date, time: time, min: dateFirst, max: statement['periods'][periodIndex]['period'] });
    }

    const handleDateClose = () => {
        setDateForm(dateFormEntity);
    }

    const handleDateChange = (e) => {
        const { value, name } = e.target;
        setDateForm({ ...dateForm, [name]: value });
    }

    const handleDateSave = (e) => {
        e.preventDefault();
        let tmpArray = {...statement};
        let tmpDate = new Date(dateForm['date'] + ' ' + dateForm['time']);
        
        // check holidays/time
        let on_holiday = false, holiday_index;
        for (let key in holidays){
            if (holidays[key]['date']==dateForm['date']){
                on_holiday = true;
                holiday_index = key;
                break;
            }
        }

        let on_weekend = false;
        if (tmpDate.getDay()=='0' || tmpDate.getDay()=='6'){
            on_weekend = true;
        }

        let out_time = false;
        if (tmpDate.getHours()<'9' || tmpDate.getHours()>'16'){
            out_time = true;
        }

        // TODO: Alert to ui
        if (on_holiday){
            alert('Can\'t choose holiday ' + holidays[holiday_index]['name'] + ' date.');
            return false;
        }

        if (on_weekend){
            alert('Can\'t choose weekend date.');
            return false;
        }

        if (out_time){
            alert('Can\'t choose time before 9AM and after 5PM.');
            return false;
        }
        
        tmpArray['periods'][dateForm['periodIndex']]['transactions'][dateForm['transactionIndex']]['date'] = tmpDate;

        // sort array
        tmpArray['periods'][dateForm['periodIndex']]['transactions'].sort(function(a, b) {
            return a.type_id.localeCompare(b.type_id) || new Date(a.date) - new Date(b.date);
        });

        // get types of period with values
        tmpArray['periods'][periodIndex]['types'] = transactionFunction.get_period_types(tmpArray['periods'][periodIndex], types);

        // get pages of transaction
        tmpArray['periods'][periodIndex] = transactionFunction.get_period_pages(tmpArray['periods'][periodIndex], categories, pages);

        // get pdf contents (lines/transactions)
        tmpArray['periods'][periodIndex] = transactionFunction.get_pdf_content_lines(tmpArray['periods'][periodIndex], pages);
        tmpArray['periods'][periodIndex] = transactionFunction.get_pdf_content_transactions(tmpArray, tmpArray['periods'][periodIndex], pages);

        setStatement(tmpArray);

        setDateForm(dateFormEntity);
    }
    

    return (
        <div className='mt-2'>

            <>
                <div className={`c-modal ${!dateForm['show']?'c-modal-hide':''}`}>
                    <div className='c-modal-window'>
                        <div className='c-form'>
                            <div className='c-form-head d-flex'>
                                <div className='mr-auto'>Date choose</div>
                                <div className='c-times' onClick={ () => { handleDateClose() } }>
                                    <i>
                                        <FaTimes />
                                    </i>
                                </div>
                            </div>
                            <div className='c-form-body'>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Date</label>
                                            <input 
                                                className="form-control"
                                                type="date"
                                                placeholder="Date"
                                                name='date'
                                                value={ dateForm['date'] }
                                                min={ dateForm['min'] }
                                                max={ dateForm['max'] }
                                                onChange={ (e) => { handleDateChange(e) } }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Time</label>
                                            <input 
                                                className="form-control"
                                                type="time"
                                                placeholder="Time"
                                                name='time'
                                                value={ dateForm['time'] }
                                                onChange={ (e) => { handleDateChange(e) } }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group text-right">
                                            <button 
                                                className='c-btn c-btn-primary'
                                                onClick={ (e) => { handleDateSave(e) } }
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

            <div className='d-flex'>
                <div className='mr-auto'>
                    <b>Transactions</b>
                </div>
                <button className='c-btn c-btn-danger' onClick={ () => { handleRemovePeriod() } }>
                    <FaTrash />
                </button>
            </div>

            <div className='page-content'>

                <table className='c-table mt-2'>
                    <thead>
                        <tr>
                            <th style={{width: '60px'}}>#</th>
                            <th style={{width: '150px'}}>Date</th>
                            <th style={{width: '140px'}}>Type</th>
                            <th style={{width: '150px'}}>Category</th>
                            {
                                statement['periods'][periodIndex]['pages'].map((value, index) => {
                                    return (
                                        <th style={{width: '80px'}} key={index}>Page {value['page']}</th>
                                    )
                                })
                            }
                            <th style={{width: '600px'}}>Description</th>
                            <th style={{width: '300px'}}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='transaction-sort'>
                                            <button className='c-btn c-btn-danger' onClick={ () => { handleRemoveTransaction(index) } }>
                                                <FaTrash />
                                            </button>
                                            {index+1}
                                        </td>
                                        <td 
                                            className='t-cursor-pointer'
                                            onClick={ () => { handleDateClick(index) } }
                                        >
                                            {dateFunction.beautifulDateTime(value['date'])}
                                        </td>
                                        <td>{typeFunction.getTypeName(value['type_id'], types)}</td>
                                        <td>
                                            <select
                                                className='form-control'
                                                onChange={ (e) => { handleCategoryChange(e, value['type_id'], index) } }
                                                value={value['category_id']}
                                            >
                                                <option value=''>-</option>
                                                {
                                                    typeFunction.getTypeCategories(value['type_id'], types).map((value1, index1) => {
                                                        return (
                                                            <option key={index1} value={value1['id']}>{value1['name']}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </td>

                                        {
                                            statement['periods'][periodIndex]['pages'].map((value1, index1) => {
                                                return (
                                                    <td key={index1}>
                                                        { (value1['id']==value['offset']['id']) &&
                                                            value['offset']['value']
                                                        }
                                                    </td>
                                                )
                                            })
                                        }

                                        <td className='col-desc'>

                                            {
                                                value['descriptions'].map((value1, index1) => {
                                                    return (
                                                        <Descriptions 
                                                            key={index1}
                                                            periodIndex={periodIndex}
                                                            transactionIndex={index}
                                                            descriptionIndex={index1}
                                                            description={value1}
                                                            transaction={value}
                                                        />
                                                    )
                                                })
                                            }
                                        </td>
                                        <td className='text-center'>
                                            <span>
                                                <CurrencyFormat 
                                                    value={value['amount']}
                                                    displayType='text'
                                                    thousandSeparator={true}
                                                    decimalScale={2}
                                                />
                                            </span>

                                            <div className='row mt-2'>
                                                <div className='col-6 p-0'>
                                                    <CurrencyInput
                                                        className='form-control'
                                                        decimalScale={2}
                                                        decimalsLimit={2}
                                                        name='min'
                                                        placeholder="Min"
                                                        value={value['amount_min']}
                                                        onChange={ (e) => { handleAmountChange({'target': { 'name': e.target.name, 'value': e.target.value.replaceAll(',', '') }}, index) } }
                                                    />
                                                </div>
                                                <div className='col-6 p-0'>
                                                    <CurrencyInput
                                                        className='form-control'
                                                        decimalScale={2}
                                                        decimalsLimit={2}
                                                        name='max'
                                                        placeholder="Max"
                                                        value={value['amount_max']}
                                                        onChange={ (e) => { handleAmountChange({'target': { 'name': e.target.name, 'value': e.target.value.replaceAll(',', '') }}, index) } }
                                                    />
                                                </div>
                                                <div className='col-12 p-0 mt-2'>
                                                    <button className='c-btn c-btn-primary w-100' onClick={ () => { handleAmountGen(index) } }>
                                                        Generate
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        
                    </tbody>
                </table>

                <div className='mt-4 mb-2'>
                    <b>Total</b>
                </div>

                <table className='c-table'>
                    <thead>
                        <tr>
                            <th style={ {width: '25%'} }>Begining balance</th>
                            {
                                statement['periods'][periodIndex]['types'].map((value, index) => {
                                    return(
                                        <th key={index} style={ {width: '25%'} }>{value['name']}</th>
                                    )
                                })
                            }
                            <th>Ending balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <CurrencyInput
                                    className="form-control"
                                    decimalScale={2}
                                    decimalsLimit={2}
                                    name='begining_balance'
                                    placeholder="Begining balance"
                                    defaultValue={statement['periods'][periodIndex]['begining_balance']}
                                    onChange={ (e) => { handleOnChangeBeginingBalance({'target': { 'name': e.target.name, 'value': e.target.value.replaceAll(',', '') }}) } }
                                />
                            </td>
                            {
                                statement['periods'][periodIndex]['types'].map((value, index) => {
                                    return(
                                        <td key={index}>
                                            <CurrencyFormat 
                                                value={value['value']}
                                                displayType='text'
                                                thousandSeparator={true}
                                                decimalScale={2}
                                            />
                                        </td>
                                    )
                                })
                            }
                            <td>
                                <CurrencyFormat
                                    value={statement['periods'][periodIndex]['ending_balance']}
                                    displayType='text'
                                    thousandSeparator={true}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className='mt-4 mb-2'>
                    <b>PDF Content</b>
                </div>

                <table className='c-table'>
                    <thead>
                        <tr>
                            <th style={ {width: '50%'} }>PDF Content Lines</th>
                            <th style={ {width: '50%'} }>PDF Content Transactions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='col-desc'>
                                <Tabs
                                    defaultActiveKey='0'
                                >
                                    {
                                        statement['periods'][periodIndex]['pdf_content']['lines'].map((value, index) => {
                                            return (
                                                <Tab
                                                    key={index}
                                                    eventKey={index}
                                                    title={ 'Page' + value['page']}
                                                >
                                                    {
                                                        value['types'].map((value1, index1) => {
                                                            return (
                                                                <div key={index1}>
                                                                    <p className='mt-2'><b>{typeFunction.getTypeName(value1['type_id'], types)}</b></p>
                                                                    {value1['content']}
                                                                </div>
                                                            )
                                                        })
                                                        
                                                    }
                                                </Tab>
                                            )
                                        })
                                    }
                                </Tabs>
                            </td>
                            <td className='col-desc'>
                                <Tabs
                                    defaultActiveKey='0'
                                >
                                    {
                                        statement['periods'][periodIndex]['pdf_content']['transactions'].map((value, index) => {
                                            return (
                                                <Tab
                                                    key={index}
                                                    eventKey={index}
                                                    title={ 'Page' + value['page']}
                                                >
                                                    {
                                                        value['types'].map((value1, index1) => {
                                                            return (
                                                                <div key={index1}>
                                                                    <p className='mt-2'><b>{typeFunction.getTypeName(value1['type_id'], types)}</b></p>
                                                                    {value1['content']}
                                                                </div>
                                                            )
                                                        })
                                                        
                                                    }
                                                </Tab>
                                            )
                                        })
                                    }
                                </Tabs>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Periods;
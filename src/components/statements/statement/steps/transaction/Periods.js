import { useEffect, useState } from "react";
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
import DescriptionFunction from "./functions/DescriptionFunction";


const Periods = ({statement, setStatement, transactions, types, pages, categories, holidays, periodIndex}) => {

    const typeFunction = new TypeFunction();
    const dateFunction = new DateFunction()
    const numberFunction = new NumberFunction();
    const categoryFunction = new CategoryFunction();
    const transactionFunction = new TransactionFunction();
    const descriptionFunction = new DescriptionFunction();

    const [dateFormEntity, setDateFormEntity] = useState({'show': false, 'periodIndex': periodIndex, 'transactionIndex': '', 'date': '', 'time': ''});
    const [dateForm, setDateForm] = useState({'show': false, 'periodIndex': periodIndex, 'transactionIndex': '', 'date': '', 'time': ''});

    const [randomFormEntity, setRandomFormEntity] = useState({'show': false, 'periodIndex': periodIndex, 'transactionIndex': '', 'descriptionIndex': '', 'index': '', 'min': '', 'max': '', 'val': ''});
    const [randomForm, setRandomForm] = useState({'show': false, 'periodIndex': periodIndex, 'transactionIndex': '', 'descriptionIndex': '', 'index': '', 'min': '', 'max': '', 'val': '', 'mmin': '', 'mmax': '', 'description': ''});

    const [selectFormEntity, setSelectFormEntity] = useState({'show': false, 'periodIndex': periodIndex, 'transactionIndex': '', 'descriptionIndex': '', 'index': '', 'val': '', 'variants': [], 'description': ''});
    const [selectForm, setSelectForm] = useState({'show': false, 'periodIndex': periodIndex, 'transactionIndex': '', 'descriptionIndex': '', 'index': '', 'val': '', 'variants': [], 'description': ''});

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

    /* Handle Random */

    const handleRandomClick = (transactionIndex, descriptionIndex, index) => {
        let tmpArray = {...statement};
        let value = tmpArray['periods'][periodIndex]['transactions'][transactionIndex]['descriptions'][descriptionIndex];
        value = JSON.parse(value['value']);
        value = JSON.parse(value[index]);
        
        setRandomForm({ ...randomForm, 
            'show': true, 
            'transactionIndex': transactionIndex, 'descriptionIndex': descriptionIndex, 'index': index, 
            'min': value['min'], 'max': value['max'], 'val': value['val'], 
            'mmin': value['min'], 'mmax': value['max'],
            'description': descriptionFunction.get_string_description(statement, statement['periods'][periodIndex], statement['periods'][periodIndex]['transactions'][transactionIndex], tmpArray['periods'][periodIndex]['transactions'][transactionIndex]['descriptions'][descriptionIndex]) });
    }

    const handleRandomClose = () => {
        setRandomForm(randomFormEntity)
    }

    const handleRandomChange = (e) => {
        const { value, name } = e.target;

        // TODO: Check number is not less or over min&max

        setRandomForm({ ...randomForm, [name]: value });
    }

    const handleRandomGen = (e) => {
        e.preventDefault();

        let tmpRandom = parseInt(numberFunction.random(randomForm['min'], randomForm['max']));

        // set data
        let tmpArray = {...statement};
        let description = tmpArray['periods'][periodIndex]['transactions'][randomForm.transactionIndex]['descriptions'][randomForm.descriptionIndex];
        let values = JSON.parse(description['value']);
        let value = JSON.parse(values[randomForm.index]);
        value['min'] = randomForm['min']; value['max'] = randomForm['max']; value['val'] = tmpRandom;
        //reverse
        values[randomForm.index] = JSON.stringify(value);
        description['value'] = JSON.stringify(values);
        tmpArray['periods'][periodIndex]['transactions'][randomForm.transactionIndex]['descriptions'][randomForm.descriptionIndex] = description;
 
        // get types of period with values
        tmpArray['periods'][periodIndex]['types'] = transactionFunction.get_period_types(tmpArray['periods'][periodIndex], types);

        // get pages of transaction
        tmpArray['periods'][periodIndex] = transactionFunction.get_period_pages(tmpArray['periods'][periodIndex], categories, pages);

        // get pdf contents (lines/transactions)
        tmpArray['periods'][periodIndex] = transactionFunction.get_pdf_content_lines(tmpArray['periods'][periodIndex], pages);
        tmpArray['periods'][periodIndex] = transactionFunction.get_pdf_content_transactions(tmpArray, tmpArray['periods'][periodIndex], pages);

        setStatement(tmpArray);

        setRandomForm(randomFormEntity);

    }

    /* Handle Select */

    const handleSelectClick = (transactionIndex, descriptionIndex, index) => {
        let tmpArray = {...statement};
        let value = tmpArray['periods'][periodIndex]['transactions'][transactionIndex]['descriptions'][descriptionIndex];
        value = JSON.parse(value['value']);
        value = JSON.parse(value[index]);
        
        setSelectForm({ ...randomForm, 
            'show': true, 
            'transactionIndex': transactionIndex, 'descriptionIndex': descriptionIndex, 'index': index, 
            'variants': value['value'], 'val': value['val'], 
            'description': descriptionFunction.get_string_description(statement, statement['periods'][periodIndex], statement['periods'][periodIndex]['transactions'][transactionIndex], tmpArray['periods'][periodIndex]['transactions'][transactionIndex]['descriptions'][descriptionIndex]) });
    }

    const handleSelectClose = () => {
        setSelectForm(selectFormEntity)
    }

    const handleSelectChange = (e) => {
        const { value, name } = e.target;
        setSelectForm({ ...selectForm, [name]: value });
    }

    const handleSelectSave = (e) => {
        e.preventDefault();

        // set data
        let tmpArray = {...statement};
        let description = tmpArray['periods'][periodIndex]['transactions'][selectForm.transactionIndex]['descriptions'][selectForm.descriptionIndex];
        let values = JSON.parse(description['value']);
        let value = JSON.parse(values[selectForm.index]);
        value['val'] = selectForm.val;
        //reverse
        values[selectForm.index] = JSON.stringify(value);
        description['value'] = JSON.stringify(values);
        tmpArray['periods'][periodIndex]['transactions'][selectForm.transactionIndex]['descriptions'][selectForm.descriptionIndex] = description;
 
        // get types of period with values
        tmpArray['periods'][periodIndex]['types'] = transactionFunction.get_period_types(tmpArray['periods'][periodIndex], types);

        // get pages of transaction
        tmpArray['periods'][periodIndex] = transactionFunction.get_period_pages(tmpArray['periods'][periodIndex], categories, pages);

        // get pdf contents (lines/transactions)
        tmpArray['periods'][periodIndex] = transactionFunction.get_pdf_content_lines(tmpArray['periods'][periodIndex], pages);
        tmpArray['periods'][periodIndex] = transactionFunction.get_pdf_content_transactions(tmpArray, tmpArray['periods'][periodIndex], pages);

        setStatement(tmpArray);

        setSelectForm(selectFormEntity);
    }

    

    return (
        <div className='mt-2'>

            <>
                <div id='date' className={`c-modal ${!dateForm['show']?'c-modal-hide':''}`}>
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

                <div id='random' className={`c-modal ${!randomForm['show']?'c-modal-hide':''}`}>
                    <div className='c-modal-window'>
                        <div className='c-form'>
                            <div className='c-form-head d-flex'>
                                <div className='mr-auto'>Random generate</div>
                                <div className='c-times' onClick={ () => { handleRandomClose() } }>
                                    <i>
                                        <FaTimes />
                                    </i>
                                </div>
                            </div>
                            <div className='c-form-body'>
                                <div className="row">
                                    <div className='col-12'>
                                        <p>{randomForm['description']}</p>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group">
                                            <label>Min</label>
                                            <input 
                                                className="form-control"
                                                type="number"
                                                placeholder="Min"
                                                name='min'
                                                value={ randomForm['min'] }
                                                min={ randomForm['mmin'] }
                                                onChange={ (e) => { handleRandomChange(e) } }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group">
                                            <label>Max</label>
                                            <input 
                                                className="form-control"
                                                type="number"
                                                placeholder="Max"
                                                name='max'
                                                value={ randomForm['max'] }
                                                max={ randomForm['mmax'] }
                                                onChange={ (e) => { handleRandomChange(e) } }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group text-right">
                                            <button 
                                                className='c-btn c-btn-primary'
                                                onClick={ (e) => { handleRandomGen(e) } }
                                            >
                                                Generate
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='select' className={`c-modal ${!selectForm['show']?'c-modal-hide':''}`}>
                    <div className='c-modal-window'>
                        <div className='c-form'>
                            <div className='c-form-head d-flex'>
                                <div className='mr-auto'>Choose variants</div>
                                <div className='c-times' onClick={ () => { handleSelectClose() } }>
                                    <i>
                                        <FaTimes />
                                    </i>
                                </div>
                            </div>
                            <div className='c-form-body'>
                                <div className="row">
                                    <div className='col-12'>
                                        <p>{selectForm['description']}</p>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Variants</label>
                                            <select 
                                                className='form-control'
                                                name='val'
                                                value={selectForm['val']}
                                                onChange={ (e) => { handleSelectChange(e) } }
                                            >
                                                <option></option>
                                                {
                                                    selectForm['variants'].map((value, index) => {
                                                        return (
                                                            <option key={index}>{value}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group text-right">
                                            <button 
                                                className='c-btn c-btn-primary'
                                                onClick={ (e) => { handleSelectSave(e) } }
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
                                                            statement={statement}
                                                            // random event
                                                            onRandomClick={handleRandomClick}
                                                            // select event
                                                            onSelectClick={handleSelectClick}
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
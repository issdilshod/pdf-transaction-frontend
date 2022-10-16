import { FaCheck, FaTrash } from "react-icons/fa";
import Descriptions from "./Descriptions";
import CategoryFunction from "./functions/CategoryFunction";
import DateFunction from "./functions/DateFunction";
import NumberFunction from "./functions/NumberFunction";
import TypeFunction from "./functions/TypeFunction";
import TransactionFunction from "./functions/TransactionFunction";


const Periods = ({statement, setStatement, transactions, types, pages, categories, periodIndex}) => {

    const typeFunction = new TypeFunction();
    const dateFunction = new DateFunction()
    const numberFunction = new NumberFunction();
    const categoryFunction = new CategoryFunction();
    const transactionFunction = new TransactionFunction();

    const handleAmountChange = (e, index) => {
        const {value, name} = e.target;
        let tmpArray = {...statement};
        tmpArray['periods'][periodIndex]['transactions'][index]['amount_'+name] = value;
        setStatement(tmpArray);
    }

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
        }
    
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

        setStatement(tmpArray);
    }

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

        setStatement(tmpArray);
    }

    const handleOnChangeBeginingBalance = (e) => {
        const { value } = e.target;
        let tmpArray = {...statement};
        tmpArray['periods'][periodIndex]['begining_balance'] = value;

        // calc ending balance
        tmpArray['periods'][periodIndex]['ending_balance'] = transactionFunction.calc_ending_balance(tmpArray['periods'][periodIndex]);

        setStatement(tmpArray);
    }

    return (
        <div className='mt-2'>
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
                            <th style={{width: '5%'}}>#</th>
                            <th style={{width: '12%'}}>Date</th>
                            <th style={{width: '10%'}}>Type</th>
                            <th style={{width: '5%'}}>Category</th>
                            {
                                statement['periods'][periodIndex]['pages'].map((value, index) => {
                                    return (
                                        <th key={index}>Page {value['page']}</th>
                                    )
                                })
                            }
                            <th style={{width: '40%'}}>Description</th>
                            <th style={{width: '20%'}}>Amount</th>
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
                                        <td>{dateFunction.beautifulDateTime(value['date'])}</td>
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
                                                    <td key={index}>
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
                                            <span>{value['amount']}</span>

                                            <div className='row mt-2'>
                                                <div className='col-6 p-0'>
                                                    <input 
                                                        className='form-control'
                                                        type='number'
                                                        name='min'
                                                        step='.01'
                                                        placeholder="Min"
                                                        value={value['amount_min']}
                                                        onChange={ (e) => { handleAmountChange(e, index) } }
                                                    />
                                                </div>
                                                <div className='col-6 p-0'>
                                                    <input 
                                                        className='form-control'
                                                        type='number'
                                                        name='max'
                                                        step='.01'
                                                        placeholder="Max"
                                                        value={value['amount_max']}
                                                        onChange={ (e) => { handleAmountChange(e, index) } }
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
                                <input 
                                    className="form-control"
                                    type='number'
                                    step='.01'
                                    name='begining_balance'
                                    placeholder='Begining balance'
                                    value={statement['periods'][periodIndex]['begining_balance']}
                                    onChange={ (e) => { handleOnChangeBeginingBalance(e) } }
                                />
                            </td>
                            {
                                statement['periods'][periodIndex]['types'].map((value, index) => {
                                    return(
                                        <td key={index}>{value['value']}</td>
                                    )
                                })
                            }
                            <td>
                                {statement['periods'][periodIndex]['ending_balance']}
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
                            <td>
                                
                            </td>
                            <td>
                                
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Periods;
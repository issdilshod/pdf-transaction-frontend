import { FaCheck, FaTrash } from "react-icons/fa";
import CategoryFunction from "./functions/CategoryFunction";
import DateFunction from "./functions/DateFunction";
import NumberFunction from "./functions/NumberFunction";
import TypeFunction from "./functions/TypeFunction";


const Periods = ({statement, setStatement, transactions, types, periodIndex}) => {

    const typeFunction = new TypeFunction();
    const dateFunction = new DateFunction()
    const numberFunction = new NumberFunction();
    const categoryFunction = new CategoryFunction();

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
        }
        setStatement(tmpArray);
    }

    const handleAmountGen = (index) => {
        let tmpArray = {...statement};
        let amount = numberFunction.random(tmpArray['periods'][periodIndex]['transactions'][index]['amount_min'], tmpArray['periods'][periodIndex]['transactions'][index]['amount_max']);
        tmpArray['periods'][periodIndex]['transactions'][index]['amount'] = amount;
        setStatement(tmpArray);
    }

    const handleCategoryChange = (e, type_id, index) => {
        const { value } = e.target;
        if (value!=''){
            let category = typeFunction.getTypeCategory(type_id, value, types);
            // TODO: make description
            console.log(index);
            for (let key in category['descriptions']){
                categoryFunction.makeDescriptionFromRule(category['descriptions'], statement['periods'][periodIndex]['transactions'][index]);
            }
            
        }
    }

    return (
        <div className='mt-2'>
            <div className='d-flex'>
                <div className='mr-auto'>
                    <h6>Transactions</h6>
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
                                        <td>

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
                    <h6>Total</h6>
                </div>

                <table className='c-table'>
                    <thead>
                        <tr>
                            <th style={ {width: '50%'} }>Begining balance</th>
                            <th style={ {width: '50%'} }>Ending balance</th>
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
                                />
                            </td>
                            <td>
                                444.4
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className='mt-4 mb-2'>
                    <h6>PDF Content</h6>
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
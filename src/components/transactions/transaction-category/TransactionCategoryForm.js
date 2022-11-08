import { useContext, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { ContextCrud } from "../../../contexts/ContextCrud";
import { ContextData } from "../../../contexts/ContextData";
import ListSelectable from "./list-selectable/ListSelectable";

import OnOff from '../../common/on-off/OnOff';

const TransactionCategoryForm = () => {
    const { transactionCategoryForm, triggerModalHide, handleFormChange, handleFormSubmit } = useContext(ContextCrud);
    const { transactionTypeList, descriptionList } = useContext(ContextData);

    const handleLocalChange = (obj) => {
        handleFormChange(obj);
    }

    const handleAdd = (id, name = '') => {
        let tmpCateg = transactionCategoryForm['descriptions'];
        let tmpDesc = descriptionList;
        for (let key in tmpDesc){
            if (tmpDesc[key]['id']==id){
                tmpCateg.push(tmpDesc[key]);
            }
        }
        handleFormChange({'target': { 'name': name, value: tmpCateg } });
    }

    const handleDelete = (id, name = '') => {
        let tmpCateg = transactionCategoryForm['descriptions'];
        for (let key in tmpCateg){
            if (tmpCateg[key]['id']==id){
                tmpCateg.splice(key, 1);
            }
        }
        handleFormChange({'target': { 'name': name, value: tmpCateg } });
    }

    return (
        <div className='c-form'>
            <div className='c-form-head d-flex'>
                <div className='mr-auto'>Transaction Cateories</div>
                <div className='c-times' onClick={ () => { triggerModalHide() } }>
                    <i><FaTimes /></i>
                </div>
            </div>
            <div className='c-form-body'>
                <form className='row' onSubmit={ (e) => { handleFormSubmit(e) } }>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Type</label>
                        <select
                            className='form-control'
                            name='transaction_type_id'
                            value={transactionCategoryForm['transaction_type_id']}
                            onChange={ (e) => { handleFormChange(e) }}
                        >
                            <option value='-'>-</option>
                            {
                                transactionTypeList.map((value, index) => {
                                    return (
                                        <option key={index} value={value['id']}>{value['name']}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Category Name</label>
                        <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Category Name' 
                            name='name'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={transactionCategoryForm['name']}
                        /> 
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Offset</label>
                        <input 
                            className='form-control' 
                            type='number' 
                            placeholder='Offset' 
                            name='offset'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={transactionCategoryForm['offset']}
                        /> 
                    </div>
                    <div className='col-6 col-sm-3 form-group'>
                        <label>Customer</label>
                        <OnOff 
                            Name='customer'
                            State={parseInt(transactionCategoryForm['customer'])} 
                            onChange={handleLocalChange} 
                        />
                    </div>
                    <div className='col-6 col-sm-3 form-group'>
                        <label>Sender</label>
                        <OnOff 
                            Name='sender'
                            State={parseInt(transactionCategoryForm['sender'])} 
                            onChange={handleLocalChange} 
                        />
                    </div>
                    <div className='col-12 form-group'>
                        <label>Descriptions</label>
                        <ListSelectable 
                            Name='descriptions'
                            AllItems={descriptionList}
                            Items={transactionCategoryForm['descriptions']}
                            onAdd={handleAdd}
                            onDelete={handleDelete}
                        />
                    </div>
                    <div className='col-12 mt-4 text-right'>
                        <button className='c-btn c-btn-primary'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TransactionCategoryForm;
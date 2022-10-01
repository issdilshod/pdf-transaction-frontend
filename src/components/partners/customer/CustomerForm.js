import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { ContextCrud } from "../../../contexts/ContextCrud";

const CustomerForm = () => {
    const { customerForm, triggerModalHide, handleFormChange, handleFormSubmit } = useContext(ContextCrud);

    return (
        <div className='c-form'>
            <div className='c-form-head d-flex'>
                <div className='mr-auto'>Customer</div>
                <div className='c-times' onClick={ () => { triggerModalHide() } }>
                    <i><FaTimes /></i>
                </div>
            </div>
            <div className='c-form-body'>
                <form className='row' onSubmit={ (e) => { handleFormSubmit(e) } }>
                    <div className='col-12 form-group'>
                        <label>Customer Name</label>
                        <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Customer Name' 
                            name='name'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={customerForm['name']}
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

export default CustomerForm;
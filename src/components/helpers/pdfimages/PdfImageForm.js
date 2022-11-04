import React, { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { ContextCrud } from "../../../contexts/ContextCrud";

const PdfImageForm = () => {

    const { form, triggerModalHide, handleFormChange, handleFormSubmit } = useContext(ContextCrud);

    return (
        <div className='c-form'>
            <div className='c-form-head d-flex'>
                <div className='mr-auto'>Pdf Image</div>
                <div className='c-times' onClick={ () => { triggerModalHide() } }>
                    <i><FaTimes /></i>
                </div>
            </div>
            <div className='c-form-body'>
                <form className='row' onSubmit={ (e) => { handleFormSubmit(e) } }>
                    <div className='col-12 form-group'>
                        <label>Period</label>
                        <input 
                            className='form-control' 
                            type='date' 
                            placeholder='Period' 
                            name='period'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={form['period']}
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

export default PdfImageForm;
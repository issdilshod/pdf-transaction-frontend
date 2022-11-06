import React, { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { ContextCrud } from "../../../contexts/ContextCrud";

const PdfTemplateForm = () => {

    const { form, triggerModalHide, handleFormChange, handleFormSubmit } = useContext(ContextCrud);

    return (
        <div className='c-form'>
            <div className='c-form-head d-flex'>
                <div className='mr-auto'>Pdf Template</div>
                <div className='c-times' onClick={ () => { triggerModalHide() } }>
                    <i><FaTimes /></i>
                </div>
            </div>
            <div className='c-form-body'>
                <form className='row' onSubmit={ (e) => { handleFormSubmit(e) } }>
                    <div className='col-12 col-sm-6 form-group'>
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
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Name</label>
                        <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Name' 
                            name='name'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={form['name']}
                        /> 
                    </div>
                    <div className='col-12 form-group'>
                        <label>Template File</label>
                        <input 
                            className='form-control' 
                            type='file' 
                            placeholder='Template File' 
                            onChange={ (e) => { handleFormChange({'target': {'name': 'file', 'value': e.target.files}}) }}
                        /> 
                        <div className='mt-2 mb-2'>
                            Tempalte File: <b>{form['file_name']}</b>
                        </div>
                    </div>
                    <div className='col-12 mt-4 text-right'>
                        <button className='c-btn c-btn-primary'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PdfTemplateForm;
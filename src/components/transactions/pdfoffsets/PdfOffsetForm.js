import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { ContextCrud } from "../../../contexts/ContextCrud";

const PdfOffsetForm = () => {
    const { pdfOffsetForm, triggerModalHide, handleFormChange, handleFormSubmit } = useContext(ContextCrud);

    return (
        <div className='c-form'>
            <div className='c-form-head d-flex'>
                <div className='mr-auto'>Sender</div>
                <div className='c-times' onClick={ () => { triggerModalHide() } }>
                    <i><FaTimes /></i>
                </div>
            </div>
            <div className='c-form-body'>
                <form className='row' onSubmit={ (e) => { handleFormSubmit(e) } }>
                    <div className='col-12 form-group'>
                        <label>Page</label>
                        <input 
                            className='form-control' 
                            type='number' 
                            placeholder='Page' 
                            name='page'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={pdfOffsetForm['page']}
                        /> 
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Start Offset</label>
                        <input 
                            className='form-control' 
                            type='number' 
                            step='.01'
                            placeholder='Start Offset' 
                            name='start_offset'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={pdfOffsetForm['start_offset']}
                        /> 
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>End Offset</label>
                        <input 
                            className='form-control' 
                            type='number' 
                            step='.01'
                            placeholder='End Offset' 
                            name='end_offset'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={pdfOffsetForm['end_offset']}
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

export default PdfOffsetForm;
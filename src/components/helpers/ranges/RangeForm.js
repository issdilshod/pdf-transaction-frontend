import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { ContextCrud } from "../../../contexts/ContextCrud";

const RangeForm = () => {
    const { rangeForm, triggerModalHide, handleFormChange, handleFormSubmit } = useContext(ContextCrud);

    return (
        <div className='c-form'>
            <div className='c-form-head d-flex'>
                <div className='mr-auto'>Range</div>
                <div class='c-times' onClick={ () => { triggerModalHide() } }>
                    <i><FaTimes /></i>
                </div>
            </div>
            <div className='c-form-body'>
                <form className='row' onSubmit={ (e) => { handleFormSubmit(e) } }>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Start</label>
                        <input 
                            className='form-control' 
                            type='number'
                            step='.01' 
                            placeholder='Start' 
                            name='start'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={rangeForm['start']}
                        /> 
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>End</label>
                        <input 
                            className='form-control' 
                            type='number'
                            step='.01' 
                            placeholder='End' 
                            name='end'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={rangeForm['end']}
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

export default RangeForm;
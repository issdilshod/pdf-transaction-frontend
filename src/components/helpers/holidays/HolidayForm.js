import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { ContextCrud } from "../../../contexts/ContextCrud";

const HolidayForm = () => {
    const { holidayForm, triggerModalHide, handleFormChange, handleFormSubmit } = useContext(ContextCrud);

    return (
        <div className='c-form'>
            <div className='c-form-head d-flex'>
                <div className='mr-auto'>Holiday</div>
                <div className='c-times' onClick={ () => { triggerModalHide() } }>
                    <i><FaTimes /></i>
                </div>
            </div>
            <div className='c-form-body'>
                <form className='row' onSubmit={ (e) => { handleFormSubmit(e) } }>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Holiday Name</label>
                        <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Holiday Name' 
                            name='name'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={holidayForm['name']}
                        /> 
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Date</label>
                        <input 
                            className='form-control' 
                            type='date' 
                            placeholder='Date' 
                            name='date'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={holidayForm['date']}
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

export default HolidayForm;
import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { ContextCrud } from "../../../contexts/ContextCrud";
import { ContextData } from "../../../contexts/ContextData";

const CompanyForm = () => {
    const { companyForm, triggerModalHide, handleFormChange, handleFormSubmit } = useContext(ContextCrud);
    const { states } = useContext(ContextData);

    return (
        <div className='c-form'>
            <div className='c-form-head d-flex'>
                <div className='mr-auto'>Company</div>
                <div class='c-times' onClick={ () => { triggerModalHide() } }>
                    <i><FaTimes /></i>
                </div>
            </div>
            <div className='c-form-body'>
                <form className='row' onSubmit={ (e) => { handleFormSubmit(e) } }>
                    <div className='col-12 form-group'>
                        <label>Company Name</label>
                        <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Company Name' 
                            name='name'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={companyForm['name']}
                        /> 
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Address Line 1</label>
                        <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Address Line 1' 
                            name={'address_line1'}
                            onChange={ (e) => { handleFormChange(e, 'address') }}
                            value={companyForm['address']['address_line1']}
                        /> 
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Address Line 2</label>
                        <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Address Line 2' 
                            name={'address_line2'}
                            onChange={ (e) => { handleFormChange(e, 'address') }}
                            value={companyForm['address']['address_line2']}
                        /> 
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>State</label>
                        <select
                            className='form-control' 
                            name={'state_id'}
                            onChange={ (e) => { handleFormChange(e, 'address') }}
                            value={companyForm['address']['state_id']}
                        >
                            <option value='-'>-</option>
                            {
                                states.map((value, index) => {
                                    return (
                                        <option key={index} value={value['id']}>{value['full_name']} ({value['short_name']})</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>City</label>
                        <input 
                            className='form-control' 
                            type='text' 
                            placeholder='City' 
                            name={'city'}
                            onChange={ (e) => { handleFormChange(e, 'address') }}
                            value={companyForm['address']['city']}
                        /> 
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Zip Code</label>
                        <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Zip Code' 
                            name={'postal'}
                            onChange={ (e) => { handleFormChange(e, 'address') }}
                            value={companyForm['address']['postal']}
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

export default CompanyForm;
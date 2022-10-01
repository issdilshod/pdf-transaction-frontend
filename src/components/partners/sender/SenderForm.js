import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { ContextCrud } from "../../../contexts/ContextCrud";

const SenderForm = () => {
    const { senderForm, triggerModalHide, handleFormChange, handleFormSubmit } = useContext(ContextCrud);

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
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Sender Name</label>
                        <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Sender Name' 
                            name='name'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={senderForm['name']}
                        /> 
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Sender ID</label>
                        <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Sender ID' 
                            name='it_id'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={senderForm['it_id']}
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

export default SenderForm;
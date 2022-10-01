import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { ContextCrud } from "../../../contexts/ContextCrud";

const UserForm = () => {
    const { userForm, triggerModalHide, handleFormChange, handleFormSubmit } = useContext(ContextCrud);

    return (
        <div className='c-form'>
            <div className='c-form-head d-flex'>
                <div className='mr-auto'>User</div>
                <div className='c-times' onClick={ () => { triggerModalHide() } }>
                    <i><FaTimes /></i>
                </div>
            </div>
            <div className='c-form-body'>
                <form className='row' onSubmit={ (e) => { handleFormSubmit(e) } }>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>First Name</label>
                        <input 
                            className='form-control' 
                            type='text' 
                            placeholder='First Name' 
                            name='first_name'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={userForm['first_name']}
                        /> 
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Last Name</label>
                        <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Last Name' 
                            name='last_name'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={userForm['last_name']}
                        /> 
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Username</label>
                        <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Username' 
                            name='username'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={userForm['username']}
                        /> 
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Password</label>
                        <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Password' 
                            name='password'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={userForm['password']}
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

export default UserForm;
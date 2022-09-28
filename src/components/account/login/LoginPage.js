import { useContext } from 'react';
import { Context } from '../../../contexts/Context';
import './Login.scss';

const LoginPage = () => {

    const { loginForm, errorMsg, errorShow, handleLoginFormChange, handleLoginFormSubmit } = useContext(Context);

    return (
        <div className="login-block">
            <div className='login-header'>
                <div className='login-welcome'>Welcome back!</div>
            </div>
            <div className='login-body'>
                <div className='login-body-text mb-4'>Login</div>
                {   errorShow &&
                    <div className='alert alert-danger'>{errorMsg}</div>
                }
                <div className='login-form'>
                    <form className='' onSubmit={ (e) => { handleLoginFormSubmit(e) } }>
                        <div className='form-group'>
                            <label>Username</label>
                            <input 
                                className='form-control' 
                                type='text' 
                                placeholder='Username' 
                                name='username'
                                value={ loginForm['username'] }
                                onChange={ (e) => { handleLoginFormChange(e) } }
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input 
                                className='form-control' 
                                type='password' 
                                placeholder='Password' 
                                name='password'
                                value={ loginForm['password'] }
                                onChange={ (e) => { handleLoginFormChange(e) } }
                            />
                        </div>
                        <div className='form-group mt-4'>
                            <button className='c-btn c-btn-primary w-100'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
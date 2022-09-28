import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Api from '../../../services/Api';
import LocalStorage from '../../../services/LocalStorage';

import LoginPage from "./LoginPage";
import { Context } from '../../../contexts/Context';

const Login = () => {
    const api = new Api();
    const lStorage = new LocalStorage();
    const nav = useNavigate();

    const [loginForm, setLoginForm] = useState({});
    const [errorMsg, setErrorMsg] = useState('');
    const [errorShow, setErrorShow] = useState(false);

    const handleLoginFormChange = (e) => {
        const { value, name } = e.target;
        setLoginForm({ ...loginForm, [name]: value  });
    }

    const handleLoginFormSubmit = (e) => {
        e.preventDefault();
        setErrorMsg('');
        setErrorShow(false);
        api.request('/api/login', 'POST', loginForm)
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        lStorage.setItem('auth_token', res.data);
                        nav('/dashboard');
                        break;
                    case 404:
                        setErrorMsg(res.data['error']);
                        setErrorShow(true);
                        break;
                    case 422:
                        setErrorMsg(res.data.message);
                        setErrorShow(true);
                        break;
                }
            });
    }

    return (
        <Context.Provider value={
            { 
                loginForm, setLoginForm, errorMsg, setErrorMsg, errorShow, setErrorShow,
                handleLoginFormChange, handleLoginFormSubmit
            }
        }>
            <div className='container-fluid'>
                <LoginPage />
            </div>
        </Context.Provider>
    );
}

export default Login;
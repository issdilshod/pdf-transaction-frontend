import { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import Api from '../services/Api';
import LocalStorage from '../services/LocalStorage';

const Protected = () => {
    const api = new Api();
    const lStorage = new LocalStorage();
    const nav = useNavigate();
    let _token = lStorage.getItem('auth_token');

    useEffect(() => { // check auth
        api.request('/api/is_auth', 'GET')
            .then(res => {
                if (res.status===401){
                    lStorage.removeItem('auth_token');
                    nav(process.env.REACT_APP_FRONTEND_PREFIX +'/login/');
                }
            });
    }, []);

    return (
        _token ? <Outlet /> : <Navigate to={process.env.REACT_APP_FRONTEND_PREFIX+'/login/'} />
    )
}

export default Protected;
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
                switch(res.status){
                    case 200:
                    case 201:
                        
                        break;
                    default:
                        lStorage.removeItem('auth_token');
                        nav('/login/');
                        break; 
                }
            });
    }, []);

    return (
        _token ? <Outlet /> : <Navigate to={'/login/'} />
    )
}

export default Protected;
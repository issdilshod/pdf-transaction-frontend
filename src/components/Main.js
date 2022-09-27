import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RouteProtected from '../routes/Protected';

import Login from './account/login/Login';
import Page404 from './errors/404/Page404';
import Dashboard from './partners/dashboard/Dashboard';

const Main = () => {
    return (
        <div className='container-fluid'>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Login />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route element={<RouteProtected />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                    <Route path="*" element={<Page404 />}></Route>
                </Routes>  
            </Router>
        </div>
    );
}

export default Main;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RouteProtected from '../routes/Protected';

import Login from './account/login/Login';
import Page404 from './errors/404/Page404';
import Dashboard from './common/dashboard/Dashboard';
import User from './account/user/User';
import Sender from './partners/sender/Sender';
import Holiday from './helpers/holidays/Holiday';
import Range from './helpers/ranges/Range';
import FontGroup from './helpers/fonts/FontGroup';
import TransactionType from './transactions/transaction-type/TransactionType';
import PdfOffset from './transactions/pdfoffsets/PdfOffset';
import Company from './partners/company/Company';

const Main = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route element={<RouteProtected />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<User />} />
                    <Route path="/senders" element={<Sender />} />
                    <Route path="/holidays" element={<Holiday />} />
                    <Route path="/ranges" element={<Range />} />
                    <Route path="/font-group" element={<FontGroup />} />
                    <Route path="/transaction-type" element={<TransactionType />} />
                    <Route path="/pdf-offsets" element={<PdfOffset />} />
                    <Route path="/companies" element={<Company />} />
                </Route>
                <Route path="*" element={<Page404 />}></Route>
            </Routes>  
        </Router>
    );
}

export default Main;
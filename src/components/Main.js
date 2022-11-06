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
import Customer from './partners/customer/Customer';
import Organization from './partners/organization/Organization';
import TransactionCategory from './transactions/transaction-category/TransactionCategory';
import Description from './helpers/descriptions/Description';

import Statements from './statements/statements/Statements';
import Statement from './statements/statement/Statement';

import PdfImage from './helpers/pdfimages/PdfImage';
import PdfTemplate from './helpers/pdftemplates/PdfTemplate';

const Main = () => {
    return (
        <Router>
            <Routes>
                <Route exact path={`${process.env.REACT_APP_FRONTEND_PREFIX}`} element={<Login />}></Route>
                <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/login`} element={<Login />}></Route>
                <Route element={<RouteProtected />}>
                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/dashboard`} element={<Dashboard />} />
                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/users`} element={<User />} />
                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/senders`} element={<Sender />} />
                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/holidays`} element={<Holiday />} />
                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/ranges`} element={<Range />} />
                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/font-group`} element={<FontGroup />} />
                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/transaction-type`} element={<TransactionType />} />
                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/pdf-offsets`} element={<PdfOffset />} />
                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/companies`} element={<Company />} />

                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/pdf-images`} element={<PdfImage />} />
                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/pdf-templates`} element={<PdfTemplate />} />

                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/customers`} element={<Customer />} />
                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/customers/page/:page`} element={<Customer />} />

                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/organizations`} element={<Organization />} />
                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/transaction-categories`} element={<TransactionCategory />} />
                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/descriptions`} element={<Description />} />

                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/statements`} element={<Statements />} />
                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/statement`} element={<Statement />} />
                    <Route path={`${process.env.REACT_APP_FRONTEND_PREFIX}/statement/:id`} element={<Statement />} />
                </Route>
                <Route path="*" element={<Page404 />}></Route>
            </Routes>  
        </Router>
    );
}

export default Main;
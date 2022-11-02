import { useEffect, useState } from 'react';
import { FaBuilding, FaCalendar, FaListAlt, FaUsers } from 'react-icons/fa';

import CountUp from 'react-countup';

import Api from '../../../services/Api';

import './Dashboard.scss';

const DashboardPage = () => {

    const api = new Api();

    const [indicatorCompany, setIndicatorCompany] = useState(0);
    const [indicatorCustomer, setIndicatorCustomer] = useState(0);
    const [indicatorOrganization, setIndicatorOrganization] = useState(0);
    const [indicatorStatement, setIndicatorStatement] = useState(0);

    useEffect(() => {
        document.title = 'Dashboard';

        // company
        api.request('/api/company-count', 'GET')
            .then(res => {
                setIndicatorCompany(res.data);
            });

        // customer
        api.request('/api/customer-count', 'GET')
            .then(res => {
                setIndicatorCustomer(res.data);
            });
        
        // organization
        api.request('/api/organization-count', 'GET')
            .then(res => {
                setIndicatorOrganization(res.data);
            });

        // statement
        api.request('/api/statement-count', 'GET')
            .then(res => {
                setIndicatorStatement(res.data);
            });
    }, []);

    return (
        <div className="container-fluid">
            <div className="page-block">
                <div className="page-head">
                    <div className="page-title">Dashboard</div>
                </div>
                <div className="page-content mt-4">
                    <div className='row'>
                        <div className='col-12 col-sm-6 col-xl-3 mt-2 indicators-block'>
                            <div className='indicators'>
                                <div className='d-flex'>
                                    <div className='mr-auto'>
                                        Companies
                                        <div className='indicator-icon'>
                                            <i><FaBuilding /></i>
                                        </div>
                                    </div>
                                    <div className='indicator-count'>
                                        <CountUp 
                                            end={indicatorCompany}
                                            duration={1}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-sm-6 col-xl-3 mt-2 indicators-block'>
                            <div className='indicators'>
                                <div className='d-flex'>
                                    <div className='mr-auto'>
                                        Customers
                                        <div className='indicator-icon'>
                                            <i><FaUsers /></i>
                                        </div>
                                    </div>
                                    <div className='indicator-count'>
                                        <CountUp 
                                            end={indicatorCustomer}
                                            duration={1}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-sm-6 col-xl-3 mt-2 indicators-block'>
                            <div className='indicators'>
                                <div className='d-flex'>
                                    <div className='mr-auto'>
                                        Organizations
                                        <div className='indicator-icon'>
                                            <i><FaCalendar /></i>
                                        </div>
                                    </div>
                                    <div className='indicator-count'>
                                        <CountUp 
                                            end={indicatorOrganization}
                                            duration={1}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='col-12 col-sm-6 col-xl-3 mt-2 indicators-block'>
                            <div className='indicators'>
                                <div className='d-flex'>
                                    <div className='mr-auto'>
                                        Statements
                                        <div className='indicator-icon'>
                                            <i><FaListAlt /></i>
                                        </div>
                                    </div>
                                    <div className='indicator-count'>
                                        <CountUp 
                                            end={indicatorStatement}
                                            duration={1}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage;
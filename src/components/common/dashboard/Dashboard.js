
import { useState } from 'react';
import { Context } from '../../../contexts/Context';

import Collect from '../Collect';
import DashboardPage from './DashboardPage';

const Dashboard = () => {

    return (
        <Context.Provider value={{}}>
            <Collect MainContent={DashboardPage} />
        </Context.Provider>
    )
}

export default Dashboard;
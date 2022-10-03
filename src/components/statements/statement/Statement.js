import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import { ContextData } from '../../../contexts/ContextData';

import Loading from '../../common/loading/Loading';

import Collect from '../../common/Collect';
import StatementPage from './StatementPage';

const Statement = () => {

    const { id } = useParams();

    const [loading, setLoading] = useState(false);

    return (
        <>
            <ContextData.Provider value={
                { setLoading }
            }>
                <Collect MainContent={StatementPage} />
            </ContextData.Provider>
            {   loading &&
                <Loading />
            }
        </>
    );
}

export default Statement;
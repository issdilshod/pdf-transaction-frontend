import React, { useEffect, useState } from "react";

import Api from '../../../services/Api';
import { ContextData } from "../../../contexts/ContextData";
import Collect from "../../common/Collect";

import TransactionTypePage from "./TransactionTypePage";

const TransactionType = () => {
    const api = new Api();
    const [transactionTypeList, setTransactionTypeList] = useState([]);

    // Init
    useEffect(() => {
        document.title = 'Transaction Types';

        getTransactionTypeList();
    }, [])

    const getTransactionTypeList = () => {
        api.request('/api/transaction-type', 'GET')
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        setTransactionTypeList(res.data.data);
                        break;
                }
            });
    }

    return (
        <ContextData.Provider value={
            {transactionTypeList, setTransactionTypeList}
        }>
            <Collect MainContent={TransactionTypePage} />
        </ContextData.Provider>
    )
}

export default TransactionType;
import React, { useEffect, useState } from "react";

import Api from '../../../services/Api';
import { ContextData } from "../../../contexts/ContextData";
import Collect from "../../common/Collect";

import PdfOffsetPage from "./PdfOffsetPage";

const PdfOffset = () => {
    const api = new Api();
    const [transactionPageList, setTransactionPageList] = useState([]);
    const [transactionCategoryList, setTransactionCategoryList] = useState([]);

    // Init
    useEffect(() => {
        getTransactionPageList();
        getTransactionCategoryList();
    }, [])

    const getTransactionPageList = () => {
        api.request('/api/transaction-page', 'GET')
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        setTransactionPageList(res.data.data);
                        break;
                }
            });
    }

    const getTransactionCategoryList = () => {
        api.request('/api/transaction-category', 'GET')
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        console.log(res.data.data);
                        setTransactionCategoryList(res.data.data);
                        break;
                }
            });
    }

    return (
        <ContextData.Provider value={
            {transactionPageList, setTransactionPageList, transactionCategoryList, setTransactionCategoryList}
        }>
            <Collect MainContent={PdfOffsetPage} />
        </ContextData.Provider>
    )
}

export default PdfOffset;
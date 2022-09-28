import React, { useEffect, useState } from "react";

import Api from '../../../services/Api';
import { ContextData } from "../../../contexts/ContextData";
import Collect from "../../common/Collect";

import SenderPage from "./SenderPage";

const Sender = () => {
    const api = new Api();
    const [senderList, setSenderList] = useState([]);

    // Init
    useEffect(() => {
        getSenderList();
    }, [])

    const getSenderList = () => {
        api.request('/api/sender', 'GET')
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        setSenderList(res.data.data);
                        break;
                }
            });
    }

    return (
        <ContextData.Provider value={
            {senderList, setSenderList}
        }>
            <Collect MainContent={SenderPage} />
        </ContextData.Provider>
    )
}

export default Sender;
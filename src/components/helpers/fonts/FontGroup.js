import React, { useEffect, useState } from "react";

import Api from '../../../services/Api';
import { ContextData } from "../../../contexts/ContextData";
import Collect from "../../common/Collect";

import FontGroupPage from "./FontGroupPage";

const FontGroup = () => {
    const api = new Api();
    const [fontGroupList, setFontGroupList] = useState([]);

    // Init
    useEffect(() => {
        getFontGroupList();
    }, [])

    const getFontGroupList = () => {
        api.request('/api/font-group', 'GET')
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        setFontGroupList(res.data.data);
                        break;
                }
            });
    }

    return (
        <ContextData.Provider value={
            {fontGroupList, setFontGroupList}
        }>
            <Collect MainContent={FontGroupPage} />
        </ContextData.Provider>
    )
}

export default FontGroup;
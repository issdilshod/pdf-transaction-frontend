import React, { useEffect, useState } from "react";

import Api from '../../../services/Api';
import { ContextData } from "../../../contexts/ContextData";
import Collect from "../../common/Collect";

import RangePage from "./RangePage";

const Range = () => {
    const api = new Api();
    const [rangeList, setRangeList] = useState([]);

    // Init
    useEffect(() => {
        getRangeList();
    }, [])

    const getRangeList = () => {
        api.request('/api/range', 'GET')
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        setRangeList(res.data.data);
                        break;
                }
            });
    }

    return (
        <ContextData.Provider value={
            {rangeList, setRangeList}
        }>
            <Collect MainContent={RangePage} />
        </ContextData.Provider>
    )
}

export default Range;
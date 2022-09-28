import React, { useEffect, useState } from "react";

import Api from '../../../services/Api';
import { ContextData } from "../../../contexts/ContextData";
import Collect from "../../common/Collect";

import HolidayPage from "./HolidayPage";

const Holiday = () => {
    const api = new Api();
    const [holidayList, setHolidayList] = useState([]);

    // Init
    useEffect(() => {
        getHolidayList();
    }, [])

    const getHolidayList = () => {
        api.request('/api/holiday', 'GET')
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        setHolidayList(res.data.data);
                        break;
                }
            });
    }

    return (
        <ContextData.Provider value={
            {holidayList, setHolidayList}
        }>
            <Collect MainContent={HolidayPage} />
        </ContextData.Provider>
    )
}

export default Holiday;
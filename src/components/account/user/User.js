import React, { useEffect, useState } from "react";

import Api from '../../../services/Api';
import { ContextData } from "../../../contexts/ContextData";
import Collect from "../../common/Collect";

import UserPage from "./UserPage";

const User = () => {
    const api = new Api();
    const [userList, setUserList] = useState([]);

    // Init
    useEffect(() => {
        getUserList();
    }, [])

    const getUserList = () => {
        api.request('/api/user', 'GET')
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        setUserList(res.data.data);
                        break;
                }
            });
    }

    return (
        <ContextData.Provider value={
            {userList, setUserList}
        }>
            <Collect MainContent={UserPage} />
        </ContextData.Provider>
    )
}

export default User;
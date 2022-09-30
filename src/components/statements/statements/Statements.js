import React, { useEffect, useState } from "react";

import Api from '../../../services/Api';
import { ContextData } from "../../../contexts/ContextData";
import { ContextCrud } from '../../../contexts/ContextCrud';
import Collect from "../../common/Collect";

import StatementsPage from "./StatementsPage";

import Loading from '../../common/loading/Loading';

const Statements = () => {
    const api = new Api();
    const [statementsList, setStatementsList] = useState([]);

    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('');
    const [alertShow, setAlertShow] = useState(false);

    const [loading, setLoading] = useState(true);

    //#region Init

    useEffect(() => {
        getStatementsList();
    }, [])

    //#endregion

    //#region Functions

    const getStatementsList = () => {
        setLoading(true);
        api.request('/api/statement', 'GET')
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        setStatementsList(res.data.data);
                        break;
                }
                setLoading(false);
            });
    }

    const fdelete = async (id) => {
        setLoading(true);
        let tmp_res = api.request('/api/statement/'+id, 'DELETE')
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        tmp_res = {'status': 'ok', 'data': true};
                        break;
                    default:
                        tmp_res = {'status': 'error', 'data': 'Error'};
                        break;
                }
                setLoading(false);
                return tmp_res;
            });
        return tmp_res;
    }

    //#endregion

    //#region Handles

    const handleAddClick = () => {
        console.log('add clicked');
    }

    const handleEditClick = (id) => {
        console.log('edit click');
    }

    const handleDeleteClick = (id) => {
        fdelete(id).then(function(res){
            if (res['status']=='ok'){
                let tmpArray = statementsList;
                for (let key in tmpArray){
                    if (tmpArray[key]['id']==id){
                        tmpArray.splice(key, 1);
                    }
                }
                setStatementsList(tmpArray);
                triggerAlertShow('success', 'Successfuly deleted');
            }else{
                triggerAlertShow('success', 'Error');
            }
        });
    }

    //#endregion

    //#region Triggers

    const triggerAlertShow = (typ, msg) => {
        setAlertType(typ);
        setAlertMsg(msg);
        setAlertShow(true);
    }

    //#endregion 


    return (
        <>
            <ContextData.Provider value={
                {statementsList, setStatementsList}
            }>
                <ContextCrud.Provider value={
                    { handleAddClick, handleEditClick, handleDeleteClick, alertMsg, alertType, alertShow, setAlertShow}
                }>
                    <Collect MainContent={StatementsPage} />
                </ContextCrud.Provider>
            </ContextData.Provider>
            {   loading &&
                <Loading />
            }
        </>
    )
}

export default Statements;
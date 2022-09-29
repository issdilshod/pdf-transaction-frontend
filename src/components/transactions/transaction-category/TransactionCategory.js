import React, { useEffect, useState } from "react";

import Api from '../../../services/Api';
import { ContextData } from "../../../contexts/ContextData";
import { ContextCrud } from '../../../contexts/ContextCrud';
import Collect from "../../common/Collect";

import TransactionCategoryPage from "./TransactionCategoryPage";

const TransactionCategory = () => {
    const api = new Api();
    const [transactionCategoryList, setTransactionCategoryList] = useState([]);
    const [transactionTypeList, setTransactionTypeList] = useState([]);

    // CRUD
    const entity = {
        'transaction_type_id': '',
        'name': '',
        'offset': '',
        'customer': 0,
        'sender': 0
    };
    const [modalShow, setModalShow] = useState(false);
    const [transactionCategoryForm, setTransactionCategoryForm] = useState(entity);
    const [editMode, setEditMode] = useState(false);

    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('');
    const [alertShow, setAlertShow] = useState(false);

    //#region Init

    useEffect(() => {
        getTransactionCategoryList();
        getTransactionTypeList();
    }, [])

    //#endregion

    //#region Functions

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

    const getTransactionCategoryList = () => {
        api.request('/api/transaction-category', 'GET')
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        setTransactionCategoryList(res.data.data);
                        break;
                }
            });
    }

    const add = async (form) => {
        let tmp_res = api.request('/api/transaction-category', 'POST', form)
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        tmp_res = {'status': 'ok', 'data': res.data.data};
                        break;
                    default:
                        tmp_res = {'status': 'error', 'data': 'Error'};
                        break;
                }
                return tmp_res;
            });
        return tmp_res;
    }

    const edit = async (id, form) => {
        let tmp_res = api.request('/api/transaction-category/'+id, 'PUT', form)
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        tmp_res = {'status': 'ok', 'data': res.data.data};
                        break;
                    default:
                        tmp_res = {'status': 'error', 'data': 'Error'};
                        break;
                }
                return tmp_res;
            });
        return tmp_res;
    }

    const fdelete = async (id) => {
        let tmp_res = api.request('/api/transaction-category/'+id, 'DELETE')
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
                return tmp_res;
            });
        return tmp_res;
    }

    //#endregion

    //#region Handles

    const handleAddClick = () => {
        setTransactionCategoryForm(entity);
        triggerModalShow();
        setEditMode(false);
    }

    const handleEditClick = (id) => {
        for (let key in transactionCategoryList){
            if (transactionCategoryList[key]['id']==id){
                setTransactionCategoryForm(transactionCategoryList[key]);
            }
        }
        triggerModalShow();
        setEditMode(true);
    }

    const handleDeleteClick = (id) => {
        fdelete(id).then(function(res){
            if (res['status']=='ok'){
                let tmpArray = transactionCategoryList;
                for (let key in tmpArray){
                    if (tmpArray[key]['id']==id){
                        tmpArray.splice(key, 1);
                    }
                }
                setTransactionCategoryList(tmpArray);
                triggerAlertShow('success', 'Successfuly deleted');
            }else{
                triggerAlertShow('success', 'Error');
            }
        });
    }

    const handleFormChange = (e) => {
        const { value, name } = e.target;
        setTransactionCategoryForm({  ...transactionCategoryForm, [name]: value });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editMode){
            edit(transactionCategoryForm['id'], transactionCategoryForm).then(function(res){
                if (res['status'] == 'ok'){
                    let tmpArray = transactionCategoryList;
                    for (let key in tmpArray){
                        if (res.data['id']==tmpArray[key]['id']){
                            tmpArray[key] = res.data;
                        }
                    }
                    setTransactionCategoryList(tmpArray);
                    triggerModalHide();
                    triggerAlertShow('success', 'Successfuly updated');
                }else{
                    triggerAlertShow('danger', res['data']);
                }
            });
        }else{
            add(transactionCategoryForm).then(function(res){
                if (res['status'] == 'ok'){
                    setTransactionCategoryList([ ...transactionCategoryList, res['data'] ]);
                    triggerModalHide();
                    triggerAlertShow('success', 'Successfuly added');
                }else{
                    triggerAlertShow('danger', res['data']);
                }
            });
        }
        
    }

    //#endregion

    //#region Triggers

    const triggerModalShow = () => {
        setModalShow(true);
    }

    const triggerModalHide = () => {
        setModalShow(false);
    }

    const triggerAlertShow = (typ, msg) => {
        setAlertType(typ);
        setAlertMsg(msg);
        setAlertShow(true);
    }

    //#endregion 


    return (
        <ContextData.Provider value={
            {transactionCategoryList, setTransactionCategoryList, transactionTypeList}
        }>
            <ContextCrud.Provider value={
                {modalShow, transactionCategoryForm, triggerModalHide, handleAddClick, handleEditClick, handleDeleteClick, handleFormChange, handleFormSubmit, alertMsg, alertType, alertShow, setAlertShow}
            }>
                <Collect MainContent={TransactionCategoryPage} />
            </ContextCrud.Provider>
        </ContextData.Provider>
    )
}

export default TransactionCategory;
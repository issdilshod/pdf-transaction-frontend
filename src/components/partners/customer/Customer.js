import React, { useEffect, useState } from "react";

import Api from '../../../services/Api';
import { ContextData } from "../../../contexts/ContextData";
import { ContextCrud } from '../../../contexts/ContextCrud';
import Collect from "../../common/Collect";

import CustomerPage from "./CustomerPage";

const Customer = () => {
    const api = new Api();
    const [customerList, setCustomerList] = useState([]);

    // CRUD
    const entity = {
        'name': ''
    };
    const [modalShow, setModalShow] = useState(false);
    const [customerForm, setCustomerForm] = useState(entity);
    const [editMode, setEditMode] = useState(false);

    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('');
    const [alertShow, setAlertShow] = useState(false);

    //#region Init

    useEffect(() => {
        getCustomerList();
    }, [])

    //#endregion

    //#region Functions

    const getCustomerList = () => {
        api.request('/api/customer', 'GET')
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        setCustomerList(res.data.data);
                        break;
                }
            });
    }

    const add = async (form) => {
        let tmp_res = api.request('/api/customer', 'POST', form)
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
        let tmp_res = api.request('/api/customer/'+id, 'PUT', form)
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
        let tmp_res = api.request('/api/customer/'+id, 'DELETE')
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
        setCustomerForm(entity);
        triggerModalShow();
        setEditMode(false);
    }

    const handleEditClick = (id) => {
        for (let key in customerList){
            if (customerList[key]['id']==id){
                setCustomerForm(customerList[key]);
            }
        }
        triggerModalShow();
        setEditMode(true);
    }

    const handleDeleteClick = (id) => {
        fdelete(id).then(function(res){
            if (res['status']=='ok'){
                let tmpArray = customerList;
                for (let key in tmpArray){
                    if (tmpArray[key]['id']==id){
                        tmpArray.splice(key, 1);
                    }
                }
                setCustomerList(tmpArray);
                triggerAlertShow('success', 'Successfuly deleted');
            }else{
                triggerAlertShow('success', 'Error');
            }
        });
    }

    const handleFormChange = (e) => {
        const { value, name } = e.target;
        setCustomerForm({  ...customerForm, [name]: value });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editMode){
            edit(customerForm['id'], customerForm).then(function(res){
                if (res['status'] == 'ok'){
                    let tmpArray = customerList;
                    for (let key in tmpArray){
                        if (res.data['id']==tmpArray[key]['id']){
                            tmpArray[key] = res.data;
                        }
                    }
                    setCustomerList(tmpArray);
                    triggerModalHide();
                    triggerAlertShow('success', 'Successfuly updated');
                }else{
                    triggerAlertShow('danger', res['data']);
                }
            });
        }else{
            add(customerForm).then(function(res){
                if (res['status'] == 'ok'){
                    setCustomerList([ res['data'], ...customerList ]);
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
            {customerList, setCustomerList}
        }>
            <ContextCrud.Provider value={
                {modalShow, customerForm, triggerModalHide, handleAddClick, handleEditClick, handleDeleteClick, handleFormChange, handleFormSubmit, alertMsg, alertType, alertShow, setAlertShow}
            }>
                <Collect MainContent={CustomerPage} />
            </ContextCrud.Provider>
        </ContextData.Provider>
    )
}

export default Customer;
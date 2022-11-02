import React, { useEffect, useState } from "react";

import Api from '../../../services/Api';
import { ContextData } from "../../../contexts/ContextData";
import { ContextCrud } from "../../../contexts/ContextCrud";
import Collect from "../../common/Collect";

import HolidayPage from "./HolidayPage";
import Loading from "../../common/loading/Loading";

const Holiday = () => {
    const api = new Api();
    const [holidayList, setHolidayList] = useState([]);

    // CRUD
    const entity = {
        'name': '',
        'date': ''
    };
    const [modalShow, setModalShow] = useState(false);
    const [holidayForm, setHolidayForm] = useState(entity);
    const [editMode, setEditMode] = useState(false);

    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('');
    const [alertShow, setAlertShow] = useState(false);

    const [loading, setLoading] = useState(true);

    //#region Init

    useEffect(() => {
        document.title = 'Holidays';

        getHolidayList();
    }, [])

    //#endregion

    //#region Functions

    const getHolidayList = () => {
        setLoading(true);
        api.request('/api/holiday', 'GET')
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        setHolidayList(res.data.data);
                        break;
                }
                setLoading(false);
            });
    }

    const add = async (form) => {
        setLoading(true);
        let tmp_res = api.request('/api/holiday', 'POST', form)
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
                setLoading(false);
                return tmp_res;
            });
        return tmp_res;
    }

    const edit = async (id, form) => {
        setLoading(true);
        let tmp_res = api.request('/api/holiday/'+id, 'PUT', form)
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
                setLoading(false);
                return tmp_res;
            });
        return tmp_res;
    }

    const fdelete = async (id) => {
        setLoading(true);
        let tmp_res = api.request('/api/holiday/'+id, 'DELETE')
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
        setHolidayForm(entity);
        triggerModalShow();
        setEditMode(false);
    }

    const handleEditClick = (id) => {
        for (let key in holidayList){
            if (holidayList[key]['id']==id){
                setHolidayForm(holidayList[key]);
            }
        }
        triggerModalShow();
        setEditMode(true);
    }

    const handleDeleteClick = (id) => {
        fdelete(id).then(function(res){
            if (res['status']=='ok'){
                let tmpArray = holidayList;
                for (let key in tmpArray){
                    if (tmpArray[key]['id']==id){
                        tmpArray.splice(key, 1);
                    }
                }
                setHolidayList(tmpArray);
                triggerAlertShow('success', 'Successfuly deleted');
            }else{
                triggerAlertShow('success', 'Error');
            }
        });
    }

    const handleFormChange = (e) => {
        const { value, name } = e.target;
        setHolidayForm({  ...holidayForm, [name]: value });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editMode){
            edit(holidayForm['id'], holidayForm).then(function(res){
                if (res['status'] == 'ok'){
                    let tmpArray = holidayList;
                    for (let key in tmpArray){
                        if (res.data['id']==tmpArray[key]['id']){
                            tmpArray[key] = res.data;
                        }
                    }
                    setHolidayList(tmpArray);
                    triggerModalHide();
                    triggerAlertShow('success', 'Successfuly updated');
                }else{
                    triggerAlertShow('danger', res['data']);
                }
            });
        }else{
            add(holidayForm).then(function(res){
                if (res['status'] == 'ok'){
                    setHolidayList([ res['data'], ...holidayList ]);
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
        <>
            <ContextData.Provider value={
                {holidayList, setHolidayList}
            }>
                <ContextCrud.Provider value={
                    {modalShow, holidayForm, triggerModalHide, handleAddClick, handleEditClick, handleDeleteClick, handleFormChange, handleFormSubmit, alertMsg, alertType, alertShow, setAlertShow}
                }>
                    <Collect MainContent={HolidayPage} />
                </ContextCrud.Provider>
            </ContextData.Provider>
            {   loading &&
                <Loading />
            }
        </>
    )
}

export default Holiday;
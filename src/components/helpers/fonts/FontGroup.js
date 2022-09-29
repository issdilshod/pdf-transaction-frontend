import React, { useEffect, useState } from "react";

import Api from '../../../services/Api';
import { ContextData } from "../../../contexts/ContextData";
import { ContextCrud } from "../../../contexts/ContextCrud";
import Collect from "../../common/Collect";

import FontGroupPage from "./FontGroupPage";

const FontGroup = () => {
    const api = new Api();
    const [fontGroupList, setFontGroupList] = useState([]);

    // CRUD
    const entity = {
        'name': '',
        'fonts': []
    };
    const [modalShow, setModalShow] = useState(false);
    const [fontGroupForm, setFontGroupForm] = useState(entity);
    const [editMode, setEditMode] = useState(false);

    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('');
    const [alertShow, setAlertShow] = useState(false);

    //#region Init

    useEffect(() => {
        getFontGroupList();
    }, [])

    //#endregion

    //#region Functions

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

    const add = async (form) => {
        let tmp_res = api.request('/api/font-group', 'POST', form)
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
        let tmp_res = api.request('/api/font-group/'+id, 'PUT', form)
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
        let tmp_res = api.request('/api/font-group/'+id, 'DELETE')
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
        setFontGroupForm(entity);
        triggerModalShow();
        setEditMode(false);
    }

    const handleEditClick = (id) => {
        for (let key in fontGroupList){
            if (fontGroupList[key]['id']==id){
                setFontGroupForm(fontGroupList[key]);
            }
        }
        triggerModalShow();
        setEditMode(true);
    }

    const handleDeleteClick = (id) => {
        fdelete(id).then(function(res){
            if (res['status']=='ok'){
                let tmpArray = fontGroupList;
                for (let key in tmpArray){
                    if (tmpArray[key]['id']==id){
                        tmpArray.splice(key, 1);
                    }
                }
                setFontGroupList(tmpArray);
                triggerAlertShow('success', 'Successfuly deleted');
            }else{
                triggerAlertShow('success', 'Error');
            }
        });
    }

    const handleFormChange = (e) => {
        const { value, name } = e.target;
        setFontGroupForm({  ...fontGroupForm, [name]: value });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editMode){
            edit(fontGroupForm['id'], fontGroupForm).then(function(res){
                if (res['status'] == 'ok'){
                    let tmpArray = fontGroupList;
                    for (let key in tmpArray){
                        if (res.data['id']==tmpArray[key]['id']){
                            tmpArray[key] = res.data;
                        }
                    }
                    setFontGroupList(tmpArray);
                    triggerModalHide();
                    triggerAlertShow('success', 'Successfuly updated');
                }else{
                    triggerAlertShow('danger', res['data']);
                }
            });
        }else{
            add(fontGroupForm).then(function(res){
                if (res['status'] == 'ok'){
                    setFontGroupList([ res['data'], ...fontGroupList ]);
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
            {fontGroupList, setFontGroupList}
        }>
            <ContextCrud.Provider value={
                {modalShow, fontGroupForm, triggerModalHide, handleAddClick, handleEditClick, handleDeleteClick, handleFormChange, handleFormSubmit, alertMsg, alertType, alertShow, setAlertShow}
            }>
                <Collect MainContent={FontGroupPage} />
            </ContextCrud.Provider>
        </ContextData.Provider>
    )
}

export default FontGroup;
import React, { useEffect, useState } from "react";

import Api from '../../../services/Api';
import { ContextData } from "../../../contexts/ContextData";
import { ContextCrud } from '../../../contexts/ContextCrud';
import Collect from "../../common/Collect";

import PdfOffsetPage from "./PdfOffsetPage";

const PdfOffset = () => {
    const api = new Api();
    const [pdfOffsetList, setPdfOffsetList] = useState([]);

    // CRUD
    const entity = {
        'page': '',
        'start_offset': '',
        'end_offset': ''
    };
    const [modalShow, setModalShow] = useState(false);
    const [pdfOffsetForm, setPdfOffsetForm] = useState(entity);
    const [editMode, setEditMode] = useState(false);

    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('');
    const [alertShow, setAlertShow] = useState(false);

    //#region Init

    useEffect(() => {
        getPdfOffsetList();
    }, [])

    //#endregion

    //#region Functions

    const getPdfOffsetList = () => {
        api.request('/api/transaction-page', 'GET')
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        setPdfOffsetList(res.data.data);
                        break;
                }
            });
    }

    const add = async (form) => {
        let tmp_res = api.request('/api/transaction-page', 'POST', form)
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
        let tmp_res = api.request('/api/transaction-page/'+id, 'PUT', form)
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
        let tmp_res = api.request('/api/transaction-page/'+id, 'DELETE')
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
        setPdfOffsetForm(entity);
        triggerModalShow();
        setEditMode(false);
    }

    const handleEditClick = (id) => {
        for (let key in pdfOffsetList){
            if (pdfOffsetList[key]['id']==id){
                setPdfOffsetForm(pdfOffsetList[key]);
            }
        }
        triggerModalShow();
        setEditMode(true);
    }

    const handleDeleteClick = (id) => {
        fdelete(id).then(function(res){
            if (res['status']=='ok'){
                let tmpArray = pdfOffsetList;
                for (let key in tmpArray){
                    if (tmpArray[key]['id']==id){
                        tmpArray.splice(key, 1);
                    }
                }
                setPdfOffsetList(tmpArray);
                triggerAlertShow('success', 'Successfuly deleted');
            }else{
                triggerAlertShow('success', 'Error');
            }
        });
    }

    const handleFormChange = (e) => {
        const { value, name } = e.target;
        setPdfOffsetForm({  ...pdfOffsetForm, [name]: value });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editMode){
            edit(pdfOffsetForm['id'], pdfOffsetForm).then(function(res){
                if (res['status'] == 'ok'){
                    let tmpArray = pdfOffsetList;
                    for (let key in tmpArray){
                        if (res.data['id']==tmpArray[key]['id']){
                            tmpArray[key] = res.data;
                        }
                    }
                    setPdfOffsetList(tmpArray);
                    triggerModalHide();
                    triggerAlertShow('success', 'Successfuly updated');
                }else{
                    triggerAlertShow('danger', res['data']);
                }
            });
        }else{
            add(pdfOffsetForm).then(function(res){
                if (res['status'] == 'ok'){
                    setPdfOffsetList([ ...pdfOffsetList, res['data'] ]);
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
            {pdfOffsetList, setPdfOffsetList}
        }>
            <ContextCrud.Provider value={
                {modalShow, pdfOffsetForm, triggerModalHide, handleAddClick, handleEditClick, handleDeleteClick, handleFormChange, handleFormSubmit, alertMsg, alertType, alertShow, setAlertShow}
            }>
                <Collect MainContent={PdfOffsetPage} />
            </ContextCrud.Provider>
        </ContextData.Provider>
    )
}

export default PdfOffset;
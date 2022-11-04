import React, { useEffect, useState } from "react";

import Api from '../../../services/Api';
import { ContextData } from "../../../contexts/ContextData";
import { ContextCrud } from "../../../contexts/ContextCrud";
import Collect from "../../common/Collect";

import PdfImagePage from "./PdfImagePage";
import Loading from "../../common/loading/Loading";

const PdfImage = () => {
    const api = new Api();
    const [list, setList] = useState([]);

    // CRUD
    const entity = {
        'period': ''
    };
    const [modalShow, setModalShow] = useState(false);
    const [form, setForm] = useState(entity);
    const [editMode, setEditMode] = useState(false);

    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('');
    const [alertShow, setAlertShow] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Pdf Image';

        getList();
    }, [])

    const getList = () => {
        setLoading(true);
        api.request('/api/pdf-image', 'GET')
            .then(res => {
                if (res.status===200||res.status===201){
                    setList(res.data.data);
                }
                setLoading(false);
            });
    }

    const add = async (form) => {
        setLoading(true);
        let tmp_res = api.request('/api/pdf-image', 'POST', form)
            .then(res => {
                if (res.status===200||res.status===201){
                    tmp_res = {'status': 'ok', 'data': res.data.data};
                }else {
                    tmp_res = {'status': 'error', 'data': 'Error'};
                }
                setLoading(false);
                return tmp_res;
            });
        return tmp_res;
    }

    const edit = async (id, form) => {
        setLoading(true);
        let tmp_res = api.request('/api/pdf-image/'+id, 'PUT', form)
            .then(res => {
                if (res.status===200||res.status===201){
                    tmp_res = {'status': 'ok', 'data': res.data.data};
                }else {
                    tmp_res = {'status': 'error', 'data': 'Error'};
                }
                setLoading(false);
                return tmp_res;
            });
        return tmp_res;
    }

    const fdelete = async (id) => {
        setLoading(true);
        let tmp_res = api.request('/api/pdf-image/'+id, 'DELETE')
            .then(res => {
                if (res.status===200||res.status===201){
                    tmp_res = {'status': 'ok', 'data': true};
                }else {
                    tmp_res = {'status': 'error', 'data': 'Error'};
                }
                setLoading(false);
                return tmp_res;
            });
        return tmp_res;
    }

    const handleAddClick = () => {
        setForm(entity);
        triggerModalShow();
        setEditMode(false);
    }

    const handleEditClick = (id) => {
        for (let key in list){
            if (list[key]['id']==id){
                setForm(list[key]);
            }
        }
        triggerModalShow();
        setEditMode(true);
    }

    const handleDeleteClick = (id) => {
        fdelete(id).then(function(res){
            if (res['status']=='ok'){
                let tmpArray = list;
                for (let key in tmpArray){
                    if (tmpArray[key]['id']==id){
                        tmpArray.splice(key, 1);
                    }
                }
                setList(tmpArray);
                triggerAlertShow('success', 'Successfuly deleted');
            }else{
                triggerAlertShow('success', 'Error');
            }
        });
    }

    const handleFormChange = (e) => {
        const { value, name } = e.target;
        setForm({  ...form, [name]: value });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editMode){
            edit(form['id'], form).then(function(res){
                if (res['status'] == 'ok'){
                    let tmpArray = list;
                    for (let key in tmpArray){
                        if (res.data['id']==tmpArray[key]['id']){
                            tmpArray[key] = res.data;
                        }
                    }
                    setList(tmpArray);
                    triggerModalHide();
                    triggerAlertShow('success', 'Successfuly updated');
                }else{
                    triggerAlertShow('danger', res['data']);
                }
            });
        }else{
            add(form).then(function(res){
                if (res['status'] == 'ok'){
                    setList([ res['data'], ...list ]);
                    triggerModalHide();
                    triggerAlertShow('success', 'Successfuly added');
                }else{
                    triggerAlertShow('danger', res['data']);
                }
            });
        }
        
    }

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

    return (
        <>
            <ContextData.Provider value={
                {list, setList}
            }>
                <ContextCrud.Provider value={
                    {modalShow, form, triggerModalHide, handleAddClick, handleEditClick, handleDeleteClick, handleFormChange, handleFormSubmit, alertMsg, alertType, alertShow, setAlertShow}
                }>
                    <Collect MainContent={PdfImagePage} />
                </ContextCrud.Provider>
            </ContextData.Provider>
            {   loading &&
                <Loading />
            }
        </>
    )
}

export default PdfImage;
import React, { useEffect, useState } from "react";

import Api from '../../../services/Api';
import { ContextData } from "../../../contexts/ContextData";
import { ContextCrud } from '../../../contexts/ContextCrud';
import Collect from "../../common/Collect";

import SenderPage from "./SenderPage";

import Loading from '../../common/loading/Loading';

const Sender = () => {
    const api = new Api();
    const [senderList, setSenderList] = useState([]);
    const [senderListOrg, setSenderListOrg] = useState([]);
    const [filter, setFilter] = useState({'search': ''});
    const [firstIn, setFirstIn] = useState(false);

    // CRUD
    const entity = {
        'name': '',
        'it_id': ''
    };
    const [modalShow, setModalShow] = useState(false);
    const [senderForm, setSenderForm] = useState(entity);
    const [editMode, setEditMode] = useState(false);

    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('');
    const [alertShow, setAlertShow] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Senders';

        getSenderList();
    }, [])

    const getSenderList = (page = '', search = '') => {
        setLoading(true);

        if (search!=''){ 
            search = '-search/' + search;
        }else if (filter['search']!=''){
            search = '-search/' + filter['search'];
        }

        api.request('/api/sender' + search + page, 'GET')
            .then(res => {
                if (res.status===200||res.status===201){
                    setSenderList(res.data.data);

                    if (!firstIn){
                        setSenderListOrg(res.data.data);
                        setFirstIn(true);
                    }
                }
                setLoading(false);
            });
    }

    const add = async (form) => {
        setLoading(true);
        let tmp_res = api.request('/api/sender', 'POST', form)
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
        let tmp_res = api.request('/api/sender/'+id, 'PUT', form)
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
        let tmp_res = api.request('/api/sender/'+id, 'DELETE')
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

    const handleSearch = (search) => {
        const {value} = search.target;
        setFilter({ ...filter, 'search': value });
        if (value.length>2){
            getSenderList('', value);
        }else{
            setSenderList(senderListOrg);
        }
    }

    const handleAddClick = () => {
        setSenderForm(entity);
        triggerModalShow();
        setEditMode(false);
    }

    const handleEditClick = (id) => {
        for (let key in senderList){
            if (senderList[key]['id']==id){
                setSenderForm(senderList[key]);
            }
        }
        triggerModalShow();
        setEditMode(true);
    }

    const handleDeleteClick = (id) => {
        fdelete(id).then(function(res){
            if (res['status']=='ok'){
                let tmpArray = senderList;
                for (let key in tmpArray){
                    if (tmpArray[key]['id']==id){
                        tmpArray.splice(key, 1);
                    }
                }
                setSenderList(tmpArray);
                triggerAlertShow('success', 'Successfuly deleted');
            }else{
                triggerAlertShow('success', 'Error');
            }
        });
    }

    const handleFormChange = (e) => {
        const { value, name } = e.target;
        setSenderForm({  ...senderForm, [name]: value });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editMode){
            edit(senderForm['id'], senderForm).then(function(res){
                if (res['status'] == 'ok'){
                    let tmpArray = senderList;
                    for (let key in tmpArray){
                        if (res.data['id']==tmpArray[key]['id']){
                            tmpArray[key] = res.data;
                        }
                    }
                    setSenderList(tmpArray);
                    triggerModalHide();
                    triggerAlertShow('success', 'Successfuly updated');
                }else{
                    triggerAlertShow('danger', res['data']);
                }
            });
        }else{
            add(senderForm).then(function(res){
                if (res['status'] == 'ok'){
                    setSenderList([ res['data'], ...senderList ]);
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
                {senderList, setSenderList}
            }>
                <ContextCrud.Provider value={
                    {modalShow, senderForm, triggerModalHide, handleAddClick, handleEditClick, handleDeleteClick, handleFormChange, handleFormSubmit, handleSearch, alertMsg, alertType, alertShow, setAlertShow}
                }>
                    <Collect MainContent={SenderPage} />
                </ContextCrud.Provider>
            </ContextData.Provider>
            {   loading &&
                <Loading />
            }
        </>
    )
}

export default Sender;
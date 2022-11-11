import React, { useEffect, useState } from "react";

import Api from '../../../services/Api';
import { ContextData } from "../../../contexts/ContextData";
import { ContextCrud } from '../../../contexts/ContextCrud';
import Collect from "../../common/Collect";

import CompanyPage from "./CompanyPage";

import Loading from '../../common/loading/Loading';

const Company = () => {
    const api = new Api();
    const [companyList, setCompanyList] = useState([]);
    const [companyListOrg, setCompanyListOrg] = useState([]);
    const [filter, setFilter] = useState({'search': ''});
    const [firstIn, setFirstIn] = useState(false);

    // CRUD
    const entity = {
        'name': '',
        'address': { 
            'address_line1': '',
            'address_line2': '',
            'state_id': '',
            'city': '',
            'postal': '',
        },
    };
    const [modalShow, setModalShow] = useState(false);
    const [companyForm, setCompanyForm] = useState(entity);
    const [editMode, setEditMode] = useState(false);

    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('');
    const [alertShow, setAlertShow] = useState(false);

    const [states, setStates] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Companies';

        getCompanyList();
        getStates();
    }, [])

    const getStates = () => {
        api.request('/api/state', 'GET')
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        setStates(res.data.data);
                        break;
                }
            });
    }

    const getCompanyList = (page = '', search = '') => {
        setLoading(true);

        if (search!=''){ 
            search = '-search/' + search;
        }else if (filter['search']!=''){
            search = '-search/' + filter['search'];
        }

        api.request('/api/company' + search + page, 'GET')
            .then(res => {
                if (res.status===200||res.status===201){
                    setCompanyList(res.data.data);

                    if (!firstIn){
                        setCompanyListOrg(res.data.data);
                        setFirstIn(true);
                    }
                }
                setLoading(false);
            });
    }

    const add = async (form) => {
        setLoading(true);
        let tmp_res = api.request('/api/company', 'POST', form)
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
        let tmp_res = api.request('/api/company/'+id, 'PUT', form)
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
        let tmp_res = api.request('/api/company/'+id, 'DELETE')
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
            getCompanyList('', value);
        }else{
            setCompanyList(companyListOrg);
        }
    }

    const handleAddClick = () => {
        setCompanyForm(entity);
        triggerModalShow();
        setEditMode(false);
    }

    const handleEditClick = (id) => {
        for (let key in companyList){
            if (companyList[key]['id']==id){
                setCompanyForm(companyList[key]);
            }
        }
        triggerModalShow();
        setEditMode(true);
    }

    const handleDeleteClick = (id) => {
        fdelete(id).then(function(res){
            if (res['status']=='ok'){
                let tmpArray = companyList;
                for (let key in tmpArray){
                    if (tmpArray[key]['id']==id){
                        tmpArray.splice(key, 1);
                    }
                }
                setCompanyList(tmpArray);
                triggerAlertShow('success', 'Successfuly deleted');
            }else{
                triggerAlertShow('success', 'Error');
            }
        });
    }

    const handleFormChange = (e, child1 = '') => {
        const { value, name } = e.target;
        // child set
        if (child1!=''){
            setCompanyForm({  ...companyForm, [child1]: { ...companyForm[child1], [name]: value } });
        }else{
            setCompanyForm({  ...companyForm, [name]: value });
        }
        
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editMode){
            edit(companyForm['id'], companyForm).then(function(res){
                if (res['status'] == 'ok'){
                    let tmpArray = companyList;
                    for (let key in tmpArray){
                        if (res.data['id']==tmpArray[key]['id']){
                            tmpArray[key] = res.data;
                        }
                    }
                    setCompanyList(tmpArray);
                    triggerModalHide();
                    triggerAlertShow('success', 'Successfuly updated');
                }else{
                    triggerAlertShow('danger', res['data']);
                }
            });
        }else{
            add(companyForm).then(function(res){
                if (res['status'] == 'ok'){
                    setCompanyList([ res['data'], ...companyList ]);
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
                {companyList, setCompanyList, states}
            }>
                <ContextCrud.Provider value={
                    {modalShow, companyForm, triggerModalHide, handleAddClick, handleEditClick, handleDeleteClick, handleFormChange, handleFormSubmit, handleSearch, alertMsg, alertType, alertShow, setAlertShow}
                }>
                    <Collect MainContent={CompanyPage} />
                </ContextCrud.Provider>
            </ContextData.Provider>
            {   loading &&
                <Loading />
            }
        </>
    )
}

export default Company;
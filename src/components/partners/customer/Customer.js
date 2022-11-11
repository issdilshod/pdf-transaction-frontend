import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Api from '../../../services/Api';
import { ContextData } from "../../../contexts/ContextData";
import { ContextCrud } from '../../../contexts/ContextCrud';
import Collect from "../../common/Collect";

import CustomerPage from "./CustomerPage";

import Papa from "papaparse";

import Loading from '../../common/loading/Loading';

const Customer = () => {
    const api = new Api();
    const nav = useNavigate();
    const [customerList, setCustomerList] = useState([]);
    const [customerListOrg, setCustomerListOrg] = useState([]);
    const [filter, setFilter] = useState({'company_id': '', 'search': ''});
    const [firstIn, setFirstIn] = useState(false);

    const { page } = useParams()

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

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Customers';

        let tmpPage = '';
        if (page){
            tmpPage = '?page=' + page;
            setCurentPage(page);
        }
        getCustomerList(tmpPage);
    }, [])

    const getCustomerList = (page = '', search = '') => {
        setLoading(true);

        if (search!=''){ 
            search = '-search/' + search;
        }else if(filter['search']!=''){
            search = '-search/' + filter['search']; 
        }

        api.request('/api/customer' + search + page, 'GET')
            .then(res => {
                if (res.status===200||res.status===201){
                    setCustomerList(res.data.data);
                    
                    if (!firstIn){
                        setCustomerListOrg(res.data.data);
                        setFromItenOrg(res.data.meta['from']);
                        setTotalPageOrg(res.data.meta['last_page']);
                        setFirstIn(true);
                    }
                    
                    setTotalPage(res.data.meta['last_page']);
                    setFromItem(res.data.meta['from']);
                }
                setLoading(false);
            });
    }

    const add = async (form) => {
        setLoading(true);
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
                setLoading(false);
                return tmp_res;
            });
        return tmp_res;
    }

    const edit = async (id, form) => {
        setLoading(true);
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
                setLoading(false);
                return tmp_res;
            });
        return tmp_res;
    }

    const fdelete = async (id) => {
        setLoading(true);
        let tmp_res = api.request('/api/customer/'+id, 'DELETE')
            .then(res => {
                if (res.status===200||res.status===201){
                    tmp_res = {'status': 'ok', 'data': true};
                }else{
                    tmp_res = {'status': 'error', 'data': 'Error'};
                }
                setLoading(false);
                return tmp_res;
            });
        return tmp_res;
    }

    const fimport = async (data) => {
        setLoading(true);
        let tmp_res = api.request('/api/customer-import', 'POST', data)
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

    const handleSearch = (search) => {
        const {value} = search.target;
        setFilter({ ...filter, 'search': value });
        if (value.length>2){
            getCustomerList('', value);
        }else{
            setCustomerList(customerListOrg); 
            setTotalPage(totalPageOrg);
            setFromItem(fromItemOrg);
            setCurentPage(1);
        }
    }

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
                triggerAlertShow('danger', 'Error');
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

    const [importModalShow, setImportModalShow] = useState(false);
    const [importedCustomers, setImportedCustomers] = useState([]);
    const [importedHeaders, setImportedHeaders] = useState([]);
    const [importMap, setImportMap] = useState({'name': 0});

    const handleImportClick = () => {
        setImportModalShow(true);
    }

    const handleImportChange = (e) => {
        if (typeof(e.target.files[0])!='undefined'){
            Papa.parse(e.target.files[0], {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    const rowsArray = [];
                    const valuesArray = [];

                    // Iterating data to get column name and their values
                    results.data.map((d) => {
                        rowsArray.push(Object.keys(d));
                        valuesArray.push(Object.values(d));
                    });

                    setImportedHeaders(rowsArray[0]);
                    setImportedCustomers(valuesArray);
                },
            });
        }else{
            setImportedHeaders([]);
            setImportedCustomers([]);
        }
    }

    const handleImportedChange = (header, body) => {
        setImportedHeaders(header);
        setImportedCustomers(body);
    }

    const handleImportMapChange = (e) => {
        const { name, value } = e.target;
        setImportMap({ ...importMap, [name]: value });
    }

    const handleImportSubmit = (e) => {
        e.preventDefault();
        fimport({'mapping': importMap, 'data': importedCustomers}).then(function(res){
            if (res['status'] == 'ok'){
                getCustomerList()
                triggerModalHide();
                triggerAlertShow('success', 'Successfuly added');
            }else{
                triggerAlertShow('danger', res['data']);
            }
        });
    }

    const triggerModalShow = () => {
        setModalShow(true);
    }

    const triggerModalHide = () => {
        setModalShow(false);
        setImportModalShow(false);

        setImportedCustomers([]);
        setImportedHeaders([]);
        setImportMap({'name': 0});
    }

    const triggerAlertShow = (typ, msg) => {
        setAlertType(typ);
        setAlertMsg(msg);
        setAlertShow(true);
    }

    const [currentPage, setCurentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [totalPageOrg, setTotalPageOrg] = useState(1);
    const [fromItem, setFromItem] = useState(0);
    const [fromItemOrg, setFromItenOrg] = useState(0);

    const handlePaginationClick = (index) => {
        setCurentPage(index);
        getCustomerList('?page='+index);
        nav(process.env.REACT_APP_FRONTEND_PREFIX + '/customers/page/'+index);
    }

    return (
        <>
            <ContextData.Provider value={
                {
                    customerList, setCustomerList,
                    handlePaginationClick, currentPage, totalPage, fromItem
                }
            }>
                <ContextCrud.Provider value={
                    {modalShow, importModalShow, customerForm, triggerModalHide, handleAddClick, handleEditClick, handleDeleteClick, handleFormChange, handleFormSubmit, handleImportClick, handleImportChange, handleImportSubmit, alertMsg, alertType, alertShow, setAlertShow, importedHeaders, importedCustomers, handleImportedChange, importMap, handleImportMapChange, handleSearch }
                }>
                    <Collect MainContent={CustomerPage} />
                </ContextCrud.Provider>
            </ContextData.Provider>
            {   loading &&
                <Loading />
            }
        </>
    )
}

export default Customer;
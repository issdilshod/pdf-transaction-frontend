import React, { useEffect, useState } from "react";

import Api from '../../../services/Api';
import RulesFunction from "./rules/functions/RulesFunction";

import { ContextData } from "../../../contexts/ContextData";
import { ContextCrud } from "../../../contexts/ContextCrud";
import Collect from "../../common/Collect";

import DescriptionPage from "./DescriptionPage";

const Description = () => {
    const api = new Api();
    const rulesFunction = new RulesFunction();
    const [descriptionList, setDescriptionList] = useState([]);
    const [descriptionRuleList, setDescriptionRuleList] = useState([]);

    // CRUD
    const entity = {
        'name': '',
        'description': '',
        'split': 0,
        'rules': []
    };
    const [modalShow, setModalShow] = useState(false);
    const [descriptionForm, setDescriptionForm] = useState(entity);
    const [editMode, setEditMode] = useState(false);

    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('');
    const [alertShow, setAlertShow] = useState(false);

    //#region Init

    useEffect(() => {
        getDescriptionList();
        getDescriptionRuleList();
    }, [])

    //#endregion

    //#region Functions

    const getDescriptionRuleList = () => {
        api.request('/api/description-rule', 'GET')
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        setDescriptionRuleList(res.data.data);
                        break;
                }
            });
    }

    const getDescriptionList = () => {
        api.request('/api/description', 'GET')
            .then(res => {
                switch (res.status){
                    case 200:
                    case 201:
                        setDescriptionList(res.data.data);
                        break;
                }
            });
    }

    const add = async (form) => {
        let tmp_res = api.request('/api/description', 'POST', form)
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
        let tmp_res = api.request('/api/description/'+id, 'PUT', form)
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
        let tmp_res = api.request('/api/description/'+id, 'DELETE')
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
        setDescriptionForm(entity);
        triggerModalShow();
        setEditMode(false);
    }

    const handleEditClick = (id) => {
        for (let key in descriptionList){
            if (descriptionList[key]['id']==id){
                setDescriptionForm(descriptionList[key]);
            }
        }
        triggerModalShow();
        setEditMode(true);
    }

    const handleDeleteClick = (id) => {
        fdelete(id).then(function(res){
            if (res['status']=='ok'){
                let tmpArray = descriptionList;
                for (let key in tmpArray){
                    if (tmpArray[key]['id']==id){
                        tmpArray.splice(key, 1);
                    }
                }
                setDescriptionList(tmpArray);
                triggerAlertShow('success', 'Successfuly deleted');
            }else{
                triggerAlertShow('success', 'Error');
            }
        });
    }

    const handleFormChange = (e) => {
        const { value, name } = e.target;
        setDescriptionForm({  ...descriptionForm, [name]: value });
    }

    const handleRuleRemove = (index) => {
        let tmpArray = {...descriptionForm};
        tmpArray['rules'].splice(index, 1);
        setDescriptionForm(tmpArray);
    }

    const handleRuleChoose = (id) => {
        let tmpArray = {...descriptionForm};
        let rule = rulesFunction.getRule(id, descriptionRuleList);
        // TODO: check type and create value object
        tmpArray['rules'].push({ 'id': id, 'description_rule': rule, 'value': '' });
        setDescriptionForm(tmpArray);
        console.log(tmpArray);
    }

    const handleRuleChange = (e) => {

    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (editMode){
            edit(descriptionForm['id'], descriptionForm).then(function(res){
                if (res['status'] == 'ok'){
                    let tmpArray = descriptionList;
                    for (let key in tmpArray){
                        if (res.data['id']==tmpArray[key]['id']){
                            tmpArray[key] = res.data;
                        }
                    }
                    setDescriptionList(tmpArray);
                    triggerModalHide();
                    triggerAlertShow('success', 'Successfuly updated');
                }else{
                    triggerAlertShow('danger', res['data']);
                }
            });
        }else{
            add(descriptionForm).then(function(res){
                if (res['status'] == 'ok'){
                    setDescriptionList([ res['data'], ...descriptionList ]);
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
            {descriptionList, setDescriptionList, descriptionRuleList, setDescriptionRuleList}
        }>
            <ContextCrud.Provider value={
                {
                    modalShow, descriptionForm, triggerModalHide, handleAddClick, handleEditClick, handleDeleteClick, 
                    handleFormChange, handleFormSubmit, handleRuleRemove, handleRuleChoose, handleRuleChange,
                    alertMsg, alertType, alertShow, setAlertShow
                }
            }>
                <Collect MainContent={DescriptionPage} />
            </ContextCrud.Provider>
        </ContextData.Provider>
    )
}

export default Description;
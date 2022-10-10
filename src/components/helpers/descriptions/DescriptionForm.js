import { useContext, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ContextCrud } from "../../../contexts/ContextCrud";
import { ContextData } from "../../../contexts/ContextData";

import * as DESCRIPTIONRULE_CONST from '../../../consts/DescriptionRuleConsts';

import OnOff from '../../common/on-off/OnOff';
import SelectType from './rules/SelectType';
import TypeType from './rules/TypeType';
import TextType from './rules/TextType';
import MinMaxType from './rules/MinMaxType';
import ValueCutType from './rules/ValueCutType';

const DescriptionForm = () => {
    const { descriptionForm, modalShow, triggerModalHide, handleFormChange, handleFormSubmit, handleRuleRemove, handleRuleChoose, handleRuleChange } = useContext(ContextCrud);
    const { descriptionRuleList } = useContext(ContextData);

    const handleLocalChange = (obj) => {
        setSplitInputShow(obj['target']['value']);
        if (!obj['target']['value']){
            handleFormChange({'target': {'name': 'split', 'value': 0}});
        }
    }

    useEffect(() => {
        setSplitInputShow(Boolean(descriptionForm['split']));
    }, [modalShow])

    const [splitInputShow, setSplitInputShow] = useState(Boolean(descriptionForm['split']));

    const handleRuleRemoveLocal = (e, index) => {
        e.preventDefault();
        handleRuleRemove(index);
    }

    const handleRuleChooseLocal = (e, id) => {
        e.preventDefault();
        handleRuleChoose(id);
    }

    const handleRuleChangeLocal = (e) => {

    }

    return (
        <div className='c-form'>
            <div className='c-form-head d-flex'>
                <div className='mr-auto'>Description</div>
                <div className='c-times' onClick={ () => { triggerModalHide() } }>
                    <i><FaTimes /></i>
                </div>
            </div>
            <div className='c-form-body'>
                <form className='row' onSubmit={ (e) => { handleFormSubmit(e) } }>
                    <div className='col-12 form-group'>
                        <label>Description Name</label>
                        <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Description Name' 
                            name='name'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={descriptionForm['name']}
                        /> 
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Description</label>
                        <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Description' 
                            name='description'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={descriptionForm['description']}
                        /> 
                    </div>
                    <div className='col-12 col-sm-6 form-group'>
                        <label>Split</label>
                        <div className="row">
                            <div className="col-6">
                                <OnOff
                                    Name='split'
                                    State={splitInputShow} 
                                    onChange={handleLocalChange} 
                                />
                            </div>
                            <div className="col-6">
                                { splitInputShow &&
                                    <input 
                                        className='form-control' 
                                        type='text' 
                                        placeholder='Split' 
                                        name='split'
                                        onChange={ (e) => { handleFormChange(e) }}
                                        value={descriptionForm['split']}
                                    /> 
                                }
                            </div>
                        </div>
                    </div>

                    <div className='col-12 mt-4'>
                        <h6 className='mb-2'>Rules</h6>
                        <div className='row'>
                            {
                                descriptionForm['rules'].map((value, index) => {
                                    return(
                                        <div key={index} className='col-12 col-sm-6 mb-2'>
                                            <div className='c-badge c-badge-primary d-flex'>
                                                <div className='mr-auto'>
                                                    {index+1}. {value['description_rule']['value']}

                                                    { DESCRIPTIONRULE_CONST.SELECT===value['description_rule']['type'] && // SELECT
                                                        <SelectType />
                                                    }

                                                    { DESCRIPTIONRULE_CONST.TYPE===value['description_rule']['type'] && // TYPING...
                                                        <TypeType />
                                                    }

                                                    { DESCRIPTIONRULE_CONST.TEXT===value['description_rule']['type'] && // TEXT...
                                                        <TextType />
                                                    }

                                                    { DESCRIPTIONRULE_CONST.RANDOM===value['description_rule']['type'] && // MIN&MAX
                                                        <MinMaxType />
                                                    }

                                                    { DESCRIPTIONRULE_CONST.VALUE_CUT===value['description_rule']['type'] && // VALUE&CUT
                                                        <ValueCutType />
                                                    }

                                                </div>
                                                <div>
                                                    <button 
                                                        className='c-btn c-btn-danger'
                                                        onClick={ (e) => { handleRuleRemoveLocal(e, index) } }
                                                    >
                                                        <i>
                                                            <FaTimes />
                                                        </i>
                                                    </button>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='c-line pt-4'></div>
                    </div>

                    <div className='col-12 mt-4'>
                        {
                            descriptionRuleList.map((value, index) => {
                                return (
                                    <button 
                                        key={index}
                                        className={`c-btn c-btn-${ DESCRIPTIONRULE_CONST.CONST===value['type']?'info':'primary' } mr-2 mb-2`}
                                        onClick={ (e) => { handleRuleChooseLocal(e, value['id']) } }
                                    >
                                        {value['value']}
                                    </button>
                                )
                            })
                        }
                    </div>



                    <div className='col-12 mt-4 text-right'>
                        <button className='c-btn c-btn-primary'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DescriptionForm;
import { useContext, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { ContextCrud } from "../../../contexts/ContextCrud";
import { ContextData } from "../../../contexts/ContextData";

import OnOff from '../../common/on-off/OnOff';

const DescriptionForm = () => {
    const { descriptionForm, modalShow, triggerModalHide, handleFormChange, handleFormSubmit } = useContext(ContextCrud);
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

    return (
        <div className='c-form'>
            <div className='c-form-head d-flex'>
                <div className='mr-auto'>Description</div>
                <div class='c-times' onClick={ () => { triggerModalHide() } }>
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
                    <div className='col-12 mt-4 text-right'>
                        <button className='c-btn c-btn-primary'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DescriptionForm;
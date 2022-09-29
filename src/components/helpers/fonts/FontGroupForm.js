import { useContext, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { ContextCrud } from "../../../contexts/ContextCrud";
import Font from "./font/Font";

const FontGroupForm = () => {
    const { fontGroupForm, triggerModalHide, handleFormChange, handleFormSubmit } = useContext(ContextCrud);

    const onAdd = () => {
        let tmpArr = fontGroupForm['fonts'];
        tmpArr.push({'ascii': '', 'unicode': '', 'hex': ''});
        handleFormChange({'target': { 'name': 'fonts', 'value':  tmpArr} });
    }

    const onChange = (index, name, value) => {
        let tmpArr = fontGroupForm['fonts'];
        tmpArr[index][name] = value;
        handleFormChange({'target': { 'name': 'fonts', 'value':  tmpArr} });
    }

    const onDelete = (index) => {
        let tmpArr = fontGroupForm['fonts'];
        tmpArr.splice(index, 1);
        handleFormChange({'target': { 'name': 'fonts', 'value':  tmpArr} });
    }

    return (
        <div className='c-form'>
            <div className='c-form-head d-flex'>
                <div className='mr-auto'>Font Group</div>
                <div className='c-times' onClick={ () => { triggerModalHide() } }>
                    <i><FaTimes /></i>
                </div>
            </div>
            <div className='c-form-body'>
                <form className='row' onSubmit={ (e) => { handleFormSubmit(e) } }>
                    <div className='col-12 form-group'>
                        <label>Font Group Name</label>
                        <input 
                            className='form-control' 
                            type='text' 
                            placeholder='Font Group Name' 
                            name='name'
                            onChange={ (e) => { handleFormChange(e) }}
                            value={fontGroupForm['name']}
                        /> 
                    </div>
                    <div className='col-12 form-group'>
                        <label>Fonts</label>
                        <Font 
                            Fonts={fontGroupForm['fonts']}
                            onAdd={onAdd}
                            onChange={onChange}
                            onDelete={onDelete}
                        />
                    </div>
                    <div className='col-12 mt-4 text-right'>
                        <button className='c-btn c-btn-primary'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FontGroupForm;
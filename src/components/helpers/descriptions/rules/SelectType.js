import { FaPlus, FaTrash } from "react-icons/fa";


const SelectType = ({ index, ovalue, onChange }) => {

    const onChangeLocal = (e) => {
        const { name, value } = e.target;
        ovalue['value'][name] = value;
        recordToMain(ovalue);
    }

    const handleAddClick = (e) => { 
        e.preventDefault();
        ovalue['value'].push('');
        recordToMain(ovalue);
    }

    const handleRemoveLocal = (e, index) => {
        e.preventDefault();
        ovalue['value'].splice(index, 1);
        recordToMain(ovalue);
    }

    const recordToMain = (e) => {
        onChange({ 'index': index, 'selector': 'value', 'value': e['value'] });
    }

    return (
        <div className='mt-2'>
            
            <div className='form-group'>
                <label>Select variant</label>
                {
                    ovalue['value'].map((value1, index1) => {
                        return (
                            <div className='d-flex mb-2'>
                                <input 
                                    key={index1}
                                    className='form-control w-100 mr-2'
                                    placeholder={`Type your ${index1+1} variant here...`}
                                    value={ value1 }
                                    type='text'
                                    name={ index1 }
                                    onChange={ (e) => { onChangeLocal(e) } }
                                />
                                <button 
                                    className='c-btn c-btn-danger'
                                    onClick={ (e) => { handleRemoveLocal(e, index1) } }
                                >
                                    <i>
                                        <FaTrash />
                                    </i>
                                </button>
                            </div>
                            
                        )
                    })
                }
            </div>
                    
            
            <div className='text-right'>
                <button 
                    className='c-btn c-btn-primary'
                    onClick={ (e) => { handleAddClick(e) } }
                >
                    <i>
                        <FaPlus />
                    </i>
                </button>
            </div>
            
        </div>
    )
}

export default SelectType;
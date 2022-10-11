

const TextType = ({index, value, onChange}) => {


    const onChangeLocal = (e) => {
        const { value } = e.target;
        onChange({ 'index': index, 'selector': 'value', 'value': value });
    }

    return (
        <div className='form-group'>
            <label>Your Text</label>
            <input 
                className='form-control w-100'
                placeholder='Type your text...'
                value={ value['value'] }
                type='text'
                onChange={ (e) => { onChangeLocal(e) } }
            />
        </div>
    )
}

export default TextType;
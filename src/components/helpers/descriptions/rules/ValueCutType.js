

const ValueCutType = ({index, value, onChange}) => {

    const onChangeLocal = (e) => {
        const { value } = e.target;
        onChange({ 'index': index, 'selector': 'value', 'value': value });
    }

    return (
        <div className='form-group'>
            <label>Max symbol</label>
            <input 
                className='form-control w-100'
                placeholder='Max symbol number'
                value={ value['value'] }
                type='number'
                onChange={ (e) => { onChangeLocal(e) } }
            />
        </div>
    )
}

export default ValueCutType;
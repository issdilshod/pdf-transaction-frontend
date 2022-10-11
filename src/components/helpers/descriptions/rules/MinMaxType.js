

const MinMaxType = ({ index, value, onChange }) => {

    const onChangeLocal = (e) => {
        const { name, value } = e.target;
        onChange({ 'index': index, 'selector': name, 'value': value });
    }

    return (
        <>
            <div className='form-group'>
                <label>Min</label>
                <input 
                    className='form-control w-100'
                    placeholder='Min'
                    name='min'
                    value={ value['min'] }
                    type='number'
                    step='.01'
                    max={ value['max'] }
                    onChange={ (e) => { onChangeLocal(e) } }
                />
            </div>
            <div className='form-group'>
                <label>Max</label>
                <input 
                    className='form-control w-100'
                    placeholder='Max'
                    name='max'
                    value={ value['max'] }
                    type='number'
                    step='.01'
                    min={ value['min'] }
                    onChange={ (e) => { onChangeLocal(e) } }
                />
            </div>
        </>
        
    )
}

export default MinMaxType;
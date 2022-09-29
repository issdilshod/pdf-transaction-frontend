
import { useEffect, useState } from 'react';
import './OnOff.scss';

const OnOff = ({ Name, State, onChange }) => {

    const [curState, setCurState] = useState(Boolean(State));

    useEffect(() => {
        setCurState(State);
    }, [State]);

    const handleLocalClick = (state) => {
        onChange({'target':{'name': Name, 'value': state}});
        setCurState(state);
    }

    return (
        <div 
            className={`on-off ${curState?'on-off-active':''}`}
            onClick={ () => { handleLocalClick(!curState) } }
        >
            <div className='d-flex'><div className='mr-auto'>ON</div><div>OFF</div></div>
        </div>
    )
}

export default OnOff;

import { useEffect, useState } from 'react';
import './OnOff.scss';

const OnOff = ({ name = '', currentState = false, changeState = () => {} }) => {

    const [thisState, setThisState] = useState(Boolean(currentState));

    useEffect(() => {
        setThisState(currentState);
    }, [currentState]);

    const handleLocalClick = (state) => {
        changeState({'name': name, 'value': state});
        setThisState(state);
    }

    return (
        <div 
            className={`on-off ${thisState?'on-off-active':''}`}
            onClick={ () => { handleLocalClick(!thisState) } }
        >
            <div className='d-flex'><div className='mr-auto'>ON</div><div>OFF</div></div>
        </div>
    )
}

export default OnOff;
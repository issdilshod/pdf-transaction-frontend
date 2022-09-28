import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const Notification = ({ Type, Msg, Show, SetShow }) => {

    useEffect(() => {
        setTimeout(() => {
            SetShow(false);
          }, 5000);
    }, [Show]);

    return (
        <div className={`c-notification c-notification-${Type} ${ Show?'':'c-notification-hide'} d-flex`}>
            <div className='mr-auto'>
                {Msg}
            </div>
            <div className='c-times' onClick={ () => { SetShow(false) } }>
                <i><FaTimes /></i>
            </div>
        </div>
    )
}

export default Notification;
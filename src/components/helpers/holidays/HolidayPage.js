
import HolidayList from'./HolidayList';

import './Holiday.module.scss';

const HolidayPage = () => {

    return (
        <div className='container-fluid'>
            <div className='page-block'>
                <HolidayList />
            </div>
        </div>
    )
} 

export default HolidayPage;
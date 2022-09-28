
import UserList from'./UserList';

import './User.module.scss';

const UserPage = () => {

    return (
        <div className='container-fluid'>
            <div className='page-block'>
                <UserList />
            </div>
        </div>
    )
} 

export default UserPage;
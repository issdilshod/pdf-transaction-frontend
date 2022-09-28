
import TransactionTypeList from'./TransactionTypeList';

import './TransactionType.module.scss';

const TransactionTypePage = () => {

    return (
        <div className='container-fluid'>
            <div className='page-block'>
                <TransactionTypeList />
            </div>
        </div>
    )
} 

export default TransactionTypePage;

import TransactionPageList from'./transaction-page/TransactionPageList';
import TransactionCategoryList from'./transaction-category/TransactionCategoryList';

import './PdfOffset.module.scss';

const PdfOffsetPage = () => {

    return (
        <div className='container-fluid'>
            <div className='page-block'>
                <div className='row'>
                    <div className='col-12 col-xl-6'>
                        <TransactionCategoryList />
                    </div>
                    <div className='col-12 col-xl-6'>
                        <TransactionPageList />
                    </div>
                </div>
                
            </div>
        </div>
    )
} 

export default PdfOffsetPage;
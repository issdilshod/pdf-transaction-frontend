import { useState } from "react";
import PdfContent from "./functions/PdfContent";



const TransactionsBlock = ({statement, period, page, types, blockIndex}) => {

    const pdfContent = new PdfContent();

    const [blockShow, setBlockShow] = useState(false);

    return (
        <div className='c-card mt-2'>
            <div className='c-card-head t-cursor-pointer' onClick={ () => { setBlockShow(!blockShow) } }>Page {blockIndex+3} (Transactions)</div>
            <div className='c-card-body'>
                {   blockShow &&
                    <div className='c-white-space'>
                        {pdfContent.get_transactions(statement, period, page, types)}
                    </div>
                }
                
            </div>
        </div>
    )

}

export default TransactionsBlock;
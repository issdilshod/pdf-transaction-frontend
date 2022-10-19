import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import PdfContent from "./pages/functions/PdfContent";
import DateFunction from "./transaction/functions/DateFunction";


const Pages = ({statement, setStatement}) => {

    const dateFunction = new DateFunction();
    const pdfContent = new PdfContent()

    const [accountSummaryContent, setAccountSummaryContent] = useState(false);
    const [importantInformationContent, setImportantInformationContent] = useState(false);
    const [serviceFeesContent, setServiceFeesContent] = useState(false);

    const [dailyBalancesContent, setDailyBalancesContent] = useState(false);
    const [blankPageContent, setBlankPageContent] = useState(false);

    return (
        <>
            {
                <Tabs     
                    defaultActiveKey='0'
                >
                    {
                        statement['periods'].map((value, index) => {
                            return (
                                <Tab
                                    key={index}
                                    eventKey={index}
                                    title={ dateFunction.beautifulDate(value['period']) }
                                >
                                    
                                    <div id='account_summary' className='c-card mt-2'>
                                        <div className='c-card-head'>Page 1 (Account Summary)</div>
                                        <div className='c-card-body'>
                                            <p>Company name: <b>{statement['company']['name']}</b></p>
                                            <p>Company address: <b>{statement['company']['address']['address_line1']}, {statement['company']['address']['address_line2']}, {statement['company']['address']['city']}, {statement['company']['address']['state']['short_name']}</b></p>

                                            <p className='d-flex'>
                                                <div className='mr-2'>
                                                    Account number:
                                                </div>
                                                <div className='w-25'>
                                                    <input 
                                                        className='form-control'
                                                        name='account_number'
                                                        type='text'
                                                        placeholder='Account number'
                                                    />
                                                </div>
                                            </p>

                                            <p>Begining balance on <b></b></p>
                                            <p>Deposits and other credits: <b></b></p>
                                            <p>Withdrawals and other debits: <b></b></p>
                                            <p>Checks: <b>-0.00</b></p>
                                            <p>Service fees: <b>-0.00</b></p>
                                            <p>Ending balance on <b></b></p>

                                            <p># of deposits/credits: <b></b></p>
                                            <p># of withdrawals/debits: <b></b></p>
                                            <p className='d-flex'>
                                                <div className='mr-2'># of items-previous cycle¹:</div> 
                                                <div className='w-25'>
                                                    <input 
                                                        className='form-control'
                                                        name='items_previous_cycle'
                                                        type='text'
                                                        placeholder='# of items-previous cycle¹'
                                                    />
                                                </div>
                                            </p>
                                            <p># of days in cycle: <b></b></p>
                                            <p>Average ledger balance: <b></b></p>

                                            <div className='c-card'>
                                                <div className='c-card-head t-cursor-pointer' onClick={() => {setAccountSummaryContent(!accountSummaryContent)}}>PDF content</div>
                                                <div className='c-card-body'>
                                                    {   accountSummaryContent &&
                                                        <div className='c-white-space'>
                                                            {pdfContent.get_account_summary()}
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id='important_information' className='c-card mt-2'>
                                        <div className='c-card-head'>Page 2 (IMPORTANT INFORMATION)</div>
                                        <div className='c-card-body'>
                                            <div className='c-card'>
                                                <div className='c-card-head t-cursor-pointer' onClick={() => {setImportantInformationContent(!importantInformationContent)}}>PDF content</div>
                                                <div className='c-card-body'>
                                                    {   importantInformationContent &&
                                                        <div className='c-white-space'>
                                                            {pdfContent.get_importatnt_information()}
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        value['pages'].map((value1, index1) => {
                                            return (
                                                <div key={index1} className='c-card mt-2'>
                                                    <div className='c-card-head'>Page {index1+3} (Transactions)</div>
                                                    <div className='c-card-body'>
                                                        transactions
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                    <div id='service_fees' className='c-card mt-2'>
                                        <div className='c-card-head'>Page {value['pages'].length+3} (Service fees)</div>
                                        <div className='c-card-body'>
                                            <div className='c-card'>
                                                <div className='c-card-head t-cursor-pointer' onClick={() => {setServiceFeesContent(!serviceFeesContent)}}>PDF content</div>
                                                <div className='c-card-body'>
                                                    {   serviceFeesContent &&
                                                        <div className='c-white-space'>
                                                            {pdfContent.get_service_fees()}
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id='daily_balances' className='c-card mt-2'>
                                        <div className='c-card-head'>Page {value['pages'].length+4} (Daily Balances)</div>
                                        <div className='c-card-body'>

                                            <div className='c-card'>
                                                <div className='c-card-head t-cursor-pointer' onClick={() => {setDailyBalancesContent(!dailyBalancesContent)}}>PDF content</div>
                                                <div className='c-card-body'>
                                                    {   dailyBalancesContent &&
                                                        <div className='c-white-space'>
                                                            {pdfContent.get_daily_balances()}
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id='blank_page' className='c-card mt-2'>
                                        <div className='c-card-head'>Page {value['pages'].length+5} (Blank page)</div>
                                        <div className='c-card-body'>
                                            <div className='c-card'>
                                                <div className='c-card-head t-cursor-pointer' onClick={() => {setBlankPageContent(!blankPageContent)}}>PDF content</div>
                                                <div className='c-card-body'>
                                                    {   blankPageContent &&
                                                        <div className='c-white-space'>
                                                            {pdfContent.get_blank_page()}
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </Tab>
                            )
                        })
                    }
                </Tabs>
                
            }
        </>
    )
}

export default Pages;
import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import PdfContent from "./pages/functions/PdfContent";
import DateFunction from "./transaction/functions/DateFunction";
import DateFormatFunction from './pages/functions/DateFormatFunction';
import NumberFunction from "./transaction/functions/NumberFunction";
import TypeFunction from './pages/functions/TypeFunction';

const Replacements = ({statement, setStatement, types}) => {

    const dateFunction = new DateFunction();
    const pdfContent = new PdfContent();
    const numberFunction = new NumberFunction();
    const typeFunction = new TypeFunction();

    const [accountSummary, setAccountSummary] = useState(false);
    const [accountSummaryContent, setAccountSummaryContent] = useState(false);
    const [importantInformation, setImportantInformation] = useState(false);
    const [serviceFees, setServiceFees] = useState(false);

    const [dailyBalancesContent, setDailyBalancesContent] = useState(false);
    const [dailyBalances, setDailyBalances] = useState(false);
    const [blankPage, setBlankPage] = useState(false);

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
                                        <div className='c-card-head t-cursor-pointer' onClick={ () => { setAccountSummary(!accountSummary) } }>Page 1 (Account Summary)</div>
                                        <div className='c-card-body'>
                                            1
                                        </div>
                                    </div>

                                    <div id='important_information' className='c-card mt-2'>
                                        <div className='c-card-head t-cursor-pointer' onClick={ () => { setImportantInformation(!importantInformation) } }>Page 2 (IMPORTANT INFORMATION)</div>
                                        <div className='c-card-body'>
                                            2
                                        </div>
                                    </div>

                                    {
                                        value['pages'].map((value1, index1) => {
                                            return (
                                                <div key={index1} className='c-card mt-2'>
                                                    <div className='c-card-head'>Page {index1+3} (Transactions)</div>
                                                    <div className='c-card-body'>
                                                        {index1+3}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                    <div id='service_fees' className='c-card mt-2'>
                                        <div className='c-card-head t-cursor-pointer' onClick={ () => { setServiceFees(!serviceFees) } }>Page {value['pages'].length+3} (Service fees)</div>
                                        <div className='c-card-body'>
                                            {value['pages'].length+3}
                                        </div>
                                    </div>

                                    <div id='daily_balances' className='c-card mt-2'>
                                        <div className='c-card-head t-cursor-pointer' onClick={ () => { setDailyBalances(!dailyBalances) } }>Page {value['pages'].length+4} (Daily Balances)</div>
                                        <div className='c-card-body'>
                                            {value['pages'].length+4}
                                        </div>
                                    </div>

                                    {   (value['pages']%2!=0) &&
                                    <div id='blank_page' className='c-card mt-2'>
                                        <div className='c-card-head t-cursor-pointer' onClick={ () => { setBlankPage(!blankPage) } }>Page {value['pages'].length+5} (Blank page)</div>
                                        <div className='c-card-body'>
                                            {value['pages'].length+5}
                                        </div>
                                    </div>
                                    }

                                </Tab>
                            )
                        })
                    }
                </Tabs>
                
            }
        </>
    )
}

export default Replacements;
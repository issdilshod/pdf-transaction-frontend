import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import PdfContent from "./pages/functions/PdfContent";
import DateFunction from "./transaction/functions/DateFunction";
import DateFormatFunction from './pages/functions/DateFormatFunction';
import NumberFunction from "./transaction/functions/NumberFunction";
import TypeFunction from './pages/functions/TypeFunction';
import TransactionsBlock from "./pages/TransactionsBlock";

const Pages = ({statement, setStatement, types}) => {

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
    
    const handleChange = (e, periodIndex) => {
        const {value, name} = e.target;
        let tmpArray = {...statement};
        tmpArray['periods'][periodIndex][name] = value;
        setStatement(tmpArray);
    }

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
                                        {   accountSummary &&
                                        <>
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
                                                        value={value['account_number']}
                                                        onChange={ (e) => { handleChange(e, index) } }
                                                    />
                                                </div>
                                            </p>

                                            <p>Begining balance on { DateFormatFunction.start_period(value['period']) }: <b>{ numberFunction.to_currency(value['begining_balance']) }</b></p>
                                            <p>Deposits and other credits: <b>{ numberFunction.to_currency(typeFunction.get_deposits_value(value)) }</b></p>
                                            <p>Withdrawals and other debits: <b>{ numberFunction.to_currency(typeFunction.get_withdrawals_value(value)) }</b></p>
                                            <p>Checks: <b>-0.00</b></p>
                                            <p>Service fees: <b>-0.00</b></p>
                                            <p>Ending balance on { DateFormatFunction.end_period(value['period']) }: <b>{ numberFunction.to_currency(value['ending_balance']) }</b></p>

                                            <p># of deposits/credits: <b>{ typeFunction.get_deposits_count(value, types) }</b></p>
                                            <p># of withdrawals/debits: <b>{ typeFunction.get_withdrawals_count(value, types) }</b></p>
                                            <p className='d-flex'>
                                                <div className='mr-2'># of items-previous cycle¹:</div> 
                                                <div className='w-25'>
                                                    <input 
                                                        className='form-control'
                                                        name='items_previous_cycle'
                                                        type='text'
                                                        placeholder='# of items-previous cycle¹'
                                                        value={value['items_previous_cycle']}
                                                        onChange={ (e) => { handleChange(e, index) } }
                                                    />
                                                </div>
                                            </p>
                                            <p># of days in cycle: <b>{ typeFunction.get_days_in_cycle(value['period']) }</b></p>
                                            <p>Average ledger balance: <b>{ numberFunction.to_currency(typeFunction.get_average_balance(value, types)) }</b></p>

                                            <div className='c-card'>
                                                <div className='c-card-head t-cursor-pointer' onClick={() => {setAccountSummaryContent(!accountSummaryContent)}}>PDF content</div>
                                                <div className='c-card-body'>
                                                    {   accountSummaryContent &&
                                                        <div className='c-white-space'>
                                                            {pdfContent.get_account_summary(statement, value, types)}
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </>
                                        }
                                        </div>
                                    </div>

                                    <div id='important_information' className='c-card mt-2'>
                                        <div className='c-card-head t-cursor-pointer' onClick={ () => { setImportantInformation(!importantInformation) } }>Page 2 (IMPORTANT INFORMATION)</div>
                                        <div className='c-card-body'>
                                            {   importantInformation &&
                                            <div className='c-white-space'>
                                                {pdfContent.get_importatnt_information(statement, value)}
                                            </div>
                                            }
                                        </div>
                                    </div>

                                    {
                                        value['pages'].map((value1, index1) => {
                                            return (
                                                <TransactionsBlock 
                                                    key={index1}
                                                    blockIndex={index1}
                                                    statement={statement}
                                                    period={value}
                                                    page={value1}
                                                    types={types}
                                                />
                                            )
                                        })
                                    }

                                    <div id='service_fees' className='c-card mt-2'>
                                        <div className='c-card-head t-cursor-pointer' onClick={ () => { setServiceFees(!serviceFees) } }>Page {value['pages'].length+3} (Service fees)</div>
                                        <div className='c-card-body'>
                                            {   serviceFees &&
                                            <div className='c-white-space'>
                                                {pdfContent.get_service_fees(statement, value, value['pages'].length+3)}
                                            </div>
                                            }
                                        </div>
                                    </div>

                                    <div id='daily_balances' className='c-card mt-2'>
                                        <div className='c-card-head t-cursor-pointer' onClick={ () => { setDailyBalances(!dailyBalances) } }>Page {value['pages'].length+4} (Daily Balances)</div>
                                        <div className='c-card-body'>
                                            {   dailyBalances &&

                                            <>

                                                <table className='c-table mt-2 mb-2'>
                                                    <thead>
                                                        <tr>
                                                            <th>Date</th>
                                                            <th>Begining balance</th>
                                                            <th>Deposits and other credits</th>
                                                            <th>Withdrawals and other debits</th>
                                                            <th>Ending balance</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            typeFunction.get_table_daily_balance(value, types).map((value1, index1) => {
                                                                return (
                                                                    <tr key={index1}>
                                                                        <td>{value1['date']}</td>
                                                                        <td>{ numberFunction.to_currency(value1['begining_balance']) }</td>
                                                                        <td>
                                                                            {
                                                                                value1['types'].map((value2, index2) => {
                                                                                    return (
                                                                                        <span key={index2}>
                                                                                            { (typeFunction.Deposits==value2['type']['name']) &&
                                                                                                numberFunction.to_currency(value2['value'])
                                                                                            }
                                                                                        </span> 
                                                                                    )
                                                                                })
                                                                            }
                                                                        </td>
                                                                        <td>
                                                                            {
                                                                                value1['types'].map((value2, index2) => {
                                                                                    return (
                                                                                        <span key={index2}>
                                                                                            { (typeFunction.Withdrawals==value2['type']['name']) &&
                                                                                                numberFunction.to_currency(value2['value'])
                                                                                            }
                                                                                        </span> 
                                                                                    )
                                                                                })
                                                                            }
                                                                        </td>
                                                                        <td>{ numberFunction.to_currency(value1['ending_balance']) }</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                                

                                                <div className='c-card'>
                                                    <div className='c-card-head t-cursor-pointer' onClick={() => {setDailyBalancesContent(!dailyBalancesContent)}}>PDF content</div>
                                                    <div className='c-card-body'>
                                                        {   dailyBalancesContent &&
                                                            <div className='c-white-space'>
                                                                {pdfContent.get_daily_balances(statement, value)}
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </>

                                            
                                            }
                                        </div>
                                    </div>

                                    {   (value['pages']%2!=0) &&
                                    <div id='blank_page' className='c-card mt-2'>
                                        <div className='c-card-head t-cursor-pointer' onClick={ () => { setBlankPage(!blankPage) } }>Page {value['pages'].length+5} (Blank page)</div>
                                        <div className='c-card-body'>
                                            {   blankPage &&
                                            <div className='c-white-space'>
                                                {pdfContent.get_blank_page(statement, value, value['pages'].length+5)}
                                            </div>
                                            }
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

export default Pages;
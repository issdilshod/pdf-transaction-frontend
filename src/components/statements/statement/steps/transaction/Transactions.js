import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import DateFunction from './functions/DateFunction';
import Periods from './Periods';

const Transactions = ({statement, setStatement, types, pages, categories, holidays, senders, customers}) => {

    const dateFunction = new DateFunction();

    return (
        <>
            <h5>Periods:</h5>
            {   statement['periods'].length >0 &&
            
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
                                        <Periods 
                                            periodIndex={index}
                                            statement={statement} setStatement={setStatement} 
                                            transactions={statement['periods'][index]['transactions']} 
                                            types={types} pages={pages} categories={categories} holidays={holidays} 
                                            senders={senders} customers={customers} />
                                    </Tab>
                            )
                        })
                    }
                </Tabs>
            }
        </>
    )

}

export default Transactions;
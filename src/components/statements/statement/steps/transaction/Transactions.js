import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Periods from './Periods';

const Transactions = ({statement, setStatement, types}) => {

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
                                        title={value['period']}
                                    >
                                        <Periods statement={statement} setStatement={setStatement} transactions={statement['periods'][index]['transactions']} types={types} periodIndex={index} />
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
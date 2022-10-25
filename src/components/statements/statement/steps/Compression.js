import { Tab, Tabs } from "react-bootstrap"
import PagesBlock from "./compression/PagesBlock";
import DateFunction from "./transaction/functions/DateFunction"

const Compression = ({statement, setStatement, types, fonts}) => {

    const dateFunction = new DateFunction();

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

                                    {
                                        value['replacement'].map((value1, index1) => {
                                            return (
                                                <PagesBlock key={index1} blockIndex={index1} block={value1} />
                                            )
                                        })
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

export default Compression;
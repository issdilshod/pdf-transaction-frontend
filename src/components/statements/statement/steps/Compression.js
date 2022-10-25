import { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap"
import PagesBlock from "./compression/PagesBlock";
import DateFunction from "./transaction/functions/DateFunction"

const Compression = ({statement, setStatement, types, fonts}) => {

    const dateFunction = new DateFunction();

    useEffect(() => {
        firstInit();
    }, [])

    const firstInit = () => {
        let tmpArray = { ...statement };

        // all periods
        for (let key in tmpArray['periods']){

            // all pages
            for (let key1 in tmpArray['periods'][key]['replacement']){
                
                // change content
                for (let key2 in tmpArray['periods'][key]['replacement'][key1]['font']){
                    for (let key3 in tmpArray['periods'][key]['replacement'][key1]['font'][key2]['content']){
                        let tmpContent = tmpArray['periods'][key]['replacement'][key1]['content'];
                        let tmpSearchVal = tmpArray['periods'][key]['replacement'][key1]['font'][key2]['content'][key3]['text'];
                        let tmpReplaceVal = tmpArray['periods'][key]['replacement'][key1]['font'][key2]['content'][key3]['ascii'];
                        let tmpPosition = tmpArray['periods'][key]['replacement'][key1]['font'][key2]['content'][key3]['pos_on_content'];
                        // change
                        //tmpArray['periods'][key]['replacement'][key1]['content'] = content.replace(tmpSearchVal, tmpReplaceVal,)
                    }
                }
            }
        }
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
import { useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap"
import Api from "../../../../services/Api";
import PagesBlock from "./compression/PagesBlock";
import DateFunction from "./transaction/functions/DateFunction"

const Compression = ({statement, setStatement, types, fonts}) => {

    const dateFunction = new DateFunction();
    const api = new Api();

    useEffect(() => {
        firstInit();
    }, [])

    const firstInit = () => {
        let tmpArray = { ...statement };

        // all periods
        for (let key in tmpArray['periods']){
            gzipPeriod(tmpArray, key);
        }
    }

    const gzipPeriod = (tmpStatement, periodIndex) => {
        api.request('/api/gzip/period', 'POST', { 'compression': tmpStatement['periods'][periodIndex]['replacement'] })
            .then(res => {
                if (res.status===200||res.status===201){
                    tmpStatement['periods'][periodIndex]['compression'] = res.data.data;
                    setStatement(tmpStatement);
                }
            })
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
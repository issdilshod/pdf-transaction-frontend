import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Api from "../../../../services/Api";
import ReplacementContent from "./replacements/functions/ReplacementContent";
import DateFunction from "./transaction/functions/DateFunction";

import PagesBlock from "./replacements/PagesBlock";

const Replacements = ({statement, setStatement, types, fonts}) => {

    const api = new Api();
    const dateFunction = new DateFunction();
    const replacementContent = new ReplacementContent();

    const [accountSummary, setAccountSummary] = useState(false);
    const [importantInformation, setImportantInformation] = useState(false);
    const [serviceFees, setServiceFees] = useState(false);

    const [dailyBalances, setDailyBalances] = useState(false);
    const [blankPage, setBlankPage] = useState(false);

    useEffect(() => {
        let tmpArray = {...statement};
        for (let key in tmpArray['periods']){

            // get content
            let tmpAccountSummary = replacementContent.get_account_summary(statement, tmpArray['periods'][key], types);
            tmpAccountSummary = replacementContent.get_replacement_content(tmpAccountSummary, tmpArray['periods'][key]['replacement'][0]);

            let tmpImportantInformation = replacementContent.get_important_information(statement, tmpArray['periods'][key]);
            tmpImportantInformation = replacementContent.get_replacement_content(tmpImportantInformation, tmpArray['periods'][key]['replacement'][0]);

            let tmpTransactions = [];
            for (let key1 in tmpArray['periods'][key]['pages']){
                tmpTransactions.push(replacementContent.get_transactions(statement, tmpArray['periods'][key], tmpArray['periods'][key]['pages'][key1], types));
                tmpTransactions[key1] = replacementContent.get_replacement_content(tmpTransactions[key1], tmpArray['periods'][key]['replacement'][key1]);
            }
            let tmpServiceFees = replacementContent.get_service_fees(statement, tmpArray['periods'][key], tmpArray['periods'][key]['pages'].length+3);
            tmpServiceFees = replacementContent.get_replacement_content(tmpServiceFees, tmpArray['periods'][key]['replacement'][tmpArray['periods'][key]['pages'].length+3]);

            let tmpDailyBalances = replacementContent.get_daily_balances(statement, tmpArray['periods'][key], tmpArray['periods'][key]['pages'].length+4);
            tmpDailyBalances = replacementContent.get_replacement_content(tmpDailyBalances, tmpArray['periods'][key]['replacement'][tmpArray['periods'][key]['pages'].length+4]);

            let tmpBlankPage = [];
            if (tmpArray['periods'][key]['pages'].length%2!=0){
                tmpBlankPage = replacementContent.get_blank_page(statement, tmpArray['periods'][key], tmpArray['periods'][key]['pages'].length+5);
                tmpBlankPage = replacementContent.get_replacement_content(tmpBlankPage, tmpArray['periods'][key]['replacement'][tmpArray['periods'][key]['pages'].length+5]);
            }

            // set replacement
            tmpArray['periods'][key]['replacement'] = [];
            tmpArray['periods'][key]['replacement'].push(tmpAccountSummary);
            tmpArray['periods'][key]['replacement'].push(tmpImportantInformation);
            for (let key1 in tmpTransactions){
                tmpArray['periods'][key]['replacement'].push(tmpTransactions[key1]);
            }
            tmpArray['periods'][key]['replacement'].push(tmpServiceFees);
            tmpArray['periods'][key]['replacement'].push(tmpDailyBalances);
            if (tmpArray['periods'][key]['pages'].length%2!=0){
                tmpArray['periods'][key]['replacement'].push(tmpBlankPage);
            }

        }

        setStatement(tmpArray);
    }, [])

    const handleFontSelect = (e, periodIndex, pageIndex, selectorIndex) => {
        let tmpArray = { ...statement };
        tmpArray['periods'][periodIndex]['replacement'][pageIndex]['font'][selectorIndex]['font_id'] = e.target.value;
        
        tmpArray = char2HexFunction(tmpArray, periodIndex, pageIndex);

        hex2AsciiFunction(tmpArray, periodIndex, pageIndex);
    }

    const char2HexFunction = (tmpStatement, periodIndex, pageIndex) => {
        tmpStatement['periods'][periodIndex]['replacement'][pageIndex] = replacementContent.char_2_hex(tmpStatement['periods'][periodIndex]['replacement'][pageIndex], fonts);

        return tmpStatement;
    }

    const hex2AsciiFunction = (tmpStatement, periodIndex, pageIndex) => {
        api.request('/api/hex2ascii', 'POST', tmpStatement['periods'][periodIndex]['replacement'][pageIndex])
            .then(res => {
                if (res.status===200||res.status===201){
                    tmpStatement['periods'][periodIndex]['replacement'][pageIndex]['font'] = res.data.data.font;
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
                                                <PagesBlock key={index1} periodIndex={index} blockIndex={index1} handleFontSelect={handleFontSelect} block={value1} fonts={fonts} />
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

export default Replacements;
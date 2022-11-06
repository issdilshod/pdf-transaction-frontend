import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import Api from "../../../../services/Api";
import DateFunction from "./transaction/functions/DateFunction";


const Pdf = ({statement, setStatement, pdfTemplate}) => {

    const dateFunction = new DateFunction();
    const api = new Api();

    const [pdfTable, setPdfTable] = useState([]);
    const [downloadFileName, setDownloadFileName] = useState('');
    const [activePeriod, setActivePeriod] = useState(0);

    const handleFileChoose = (e, periodIndex) => {
        setActivePeriod(activePeriod);
        api.request('/api/upload/template', 'POST', {'template': e.target.files}, true)
            .then(res => {
                if (res.status===200||res.status===201){
                    let periodPage = 4;
                    periodPage += parseInt(statement['periods'][periodIndex]['pages'].length);
                    periodPage += (statement['periods'][periodIndex]['pages'].length%2!=0?1:0);
                    if (periodPage==res.data.data.pdfTable.length){
                        setPdfTable(res.data.data.pdfTable);

                        api.request('/api/pdf/change', 'POST', {'filename': res.data.data.filename, 'pdf': res.data.data.pdfTable, 'compression': statement['periods'][periodIndex]['compression']})
                            .then(res => {
                                if (res.status===200||res.status===201){
                                    setDownloadFileName(res.data);
                                }
                            })
                    }else{
                        alert('Wrong Pdf Template file. Pages is not equal to period pages.');
                    }
                }
            })
    }

    const handleTemplateClick = (id, periodIndex) => {
        setActivePeriod(activePeriod);
        api.request('/api/use/template/' + id, 'GET')
            .then(res => {
                if (res.status===200||res.status===201){
                    let periodPage = 4;
                    periodPage += parseInt(statement['periods'][periodIndex]['pages'].length);
                    periodPage += (statement['periods'][periodIndex]['pages'].length%2!=0?1:0);
                    if (periodPage==res.data.data.pdfTable.length){
                        setPdfTable(res.data.data.pdfTable);

                        api.request('/api/pdf/change', 'POST', {'filename': res.data.data.filename, 'pdf': res.data.data.pdfTable, 'compression': statement['periods'][periodIndex]['compression']})
                            .then(res => {
                                if (res.status===200||res.status===201){
                                    setDownloadFileName(res.data);
                                }
                            })
                    }else{
                        alert('Wrong Pdf Template file. Pages is not equal to period pages.');
                    }
                }
            })
    }

    const handleDownload = (e) => {
        e.preventDefault();

        let el = document.createElement('a');
        let filename = 'eStmt_' + statement['periods'][activePeriod]['period'] + '.pdf';
        el.setAttribute('href', process.env.REACT_APP_BACKEND_ENDPOINT + '/' + downloadFileName);
        el.setAttribute('download', filename);
        el.setAttribute('target', '_blank');
        el.click();
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

                                    <div className='form-group'>
                                        <label>Choose Pdf file of template</label>
                                        <input
                                            className='form-control'
                                            type='file'
                                            onChange={ (e) => { handleFileChoose(e, index) } }
                                        />
                                    </div>

                                    <div className='form-group mt-2 mb-2'>
                                        {
                                            pdfTemplate.map((value1, index1) => {
                                                return (
                                                    <>
                                                        { value1['period']==value['period'] && 
                                                            <button 
                                                                key={index1} 
                                                                className='c-btn c-btn-primary mr-2'
                                                                title='Use this tepmlate'
                                                                onClick={ () => { handleTemplateClick(value1['id'], index) } }
                                                            >
                                                                {value1['file_name']} ({value1['name']})
                                                            </button>
                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                    </div>

                                    { (pdfTable.length>0) && 
                                        <>
                                            <div className='form-group'>
                                                <b>Pdf Template pages</b>
                                                <table className='c-table'>
                                                    <thead>
                                                        <tr>
                                                            <th>Page Name</th>
                                                            <th>Object Number</th>
                                                            <th>Object Old Length</th>
                                                            <th>Object New Length</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            pdfTable.map((value1, index1) => {
                                                                return (
                                                                    <tr key={index1}>
                                                                        <td>{statement['periods'][activePeriod]['replacement'][index1]['page_name']}</td>
                                                                        <td>{value1['object_name']}</td>
                                                                        <td>{value1['old_length']}</td>
                                                                        <td>{window.atob(statement['periods'][activePeriod]['compression'][index1]).length}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className='form-group mt-4 text-right'>
                                                <button className='c-btn c-btn-primary' onClick={ (e) => { handleDownload(e) } }>
                                                    <i className='mr-2'>
                                                        <FaDownload />
                                                    </i>
                                                    Download File
                                                </button>
                                            </div>

                                        </>
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

export default Pdf;
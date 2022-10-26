import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { FaDownload } from "react-icons/fa";
import Api from "../../../../services/Api";
import DateFunction from "./transaction/functions/DateFunction";


const Pdf = ({statement, setStatement}) => {

    const dateFunction = new DateFunction();
    const api = new Api();

    const [pdfTable, setPdfTable] = useState([]);
    const [downloadFileName, setDownloadFileName] = useState('');

    const handleFileChoose = (e, periodIndex) => {
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
                                                                        <td>{value1['page_name']}</td>
                                                                        <td>{value1['object_name']}</td>
                                                                        <td>{value1['old_length']}</td>
                                                                        <td>{value1['new_length']}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div className='form-group mt-4 text-right'>
                                                <button className='c-btn c-btn-primary'>
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
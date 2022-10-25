import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const PagesBlock = ({periodIndex, blockIndex, handleFontSelect, block, fonts}) => {

    const [blockShow, setBlockShow] = useState(false);

    return (
        
        <div className='c-card mt-2'>
            <div className='c-card-head t-cursor-pointer' onClick={ () => { setBlockShow(!blockShow) } }>Page {blockIndex+1}</div>
            <div className='c-card-body c-white-space'>
                { blockShow &&
                <>
                    <table className='c-table'>
                        <thead>
                            <tr>
                                <th>Font</th>
                                <th>Select</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                block['font'].map((value2, index2) => {
                                    return (
                                        <tr key={index2}>
                                            <td>{value2['selector']}</td>
                                            <td>
                                                <select 
                                                    className='form-control'
                                                    value={value2['font_id']}
                                                    onChange={ (e) => { handleFontSelect(e, periodIndex, blockIndex, index2) } }
                                                >
                                                    <option value=''>-</option>
                                                    { 
                                                        fonts.map((value3, index3) => {
                                                            return (
                                                                <option 
                                                                    key={index3} 
                                                                    value={value3['id']}
                                                                >
                                                                    {value3['name']}
                                                                </option>
                                                            )
                                                        }) 
                                                    }
                                                </select>
                                            </td>
                                        </tr>
                                    )
                                }) 
                            }
                        </tbody>
                    </table>

                    <div className='mt-4'>
                        {
                            block['font'].map((value2, index2) => {
                                return (
                                    <div key={index2}>
                                        <b>{value2['selector']}<br /></b>
                                        {
                                            value2['content'].map((value3, index3) => {
                                                return (
                                                    <div className='c-break-word' key={index3}>
                                                        { (value3['hex']!='' && value3['hex']!=null) && 
                                                            <>
                                                                <b>Original: </b> { value3['text'] }<br />
                                                                <b>Hex: </b> { value3['hex'] }<br />
                                                                <b>Ascii (base64)*: </b> { value3['ascii'] }
                                                                <span className='c-text-success ml-2'>
                                                                    <FaCheck />
                                                                </span>
                                                                <br />
                                                            </>
                                                        }
                                                        { (value3['hex']=='' || value3['hex']==null) && 
                                                            value3['text']
                                                        }
                                                        <br />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </>
                }
            </div>
        </div>
    )

}

export default PagesBlock;
import { useContext, useEffect, useState } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";
import { ContextCrud } from "../../../contexts/ContextCrud";

const ImportForm = () => {
    const { triggerModalHide, handleImportChange, handleImportSubmit, importedHeaders, importedCustomers, handleImportedChange, importMap, handleImportMapChange } = useContext(ContextCrud);

    const [localImportedHeaders, setLocalImportedHeaders] = useState([]);
    const [localImportedCustomers, setLocalImportedCustomers] = useState([]);
    const [localImportMap, setLocalImportMap] = useState(importMap);

    useEffect(() => {
        setLocalImportedHeaders(importedHeaders);
    }, [importedHeaders])

    useEffect(() => {
        setLocalImportedCustomers(importedCustomers); 
    }, [importedCustomers])

    useEffect(() => {
        setLocalImportMap(importMap);
    }, [importMap])

    const handleReset = (e) => {
        e.target.value = null;
        handleImportedChange([], []);
        handleImportMapChange({'target': {'name': 'name', 'value': 0}});
    }

    const deleteRow = (e, index) => {
        e.preventDefault();
        let tmpArray = [...importedCustomers];
        tmpArray.splice(index, 1);
        handleImportedChange(localImportedHeaders, tmpArray);
    }

    return (
        <div className='c-form'>
            <div className='c-form-head d-flex'>
                <div className='mr-auto'>Import Customer</div>
                <div className='c-times' onClick={ () => { triggerModalHide() } }>
                    <i><FaTimes /></i>
                </div>
            </div>
            <div className='c-form-body'>
                <form 
                    className='row' 
                    onSubmit={ (e) => { handleImportSubmit(e) } }
                >
                    <div className='col-12 form-group'>
                        <label>Import File</label>
                        <input 
                            className='form-control' 
                            type='file' 
                            placeholder='import' 
                            name='name'
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            onChange={ (e) => { handleImportChange(e) }}
                            onClick={ (e) => { handleReset(e) } }
                        /> 
                    </div>
                    { localImportedCustomers.length>0 &&
                        <>
                            <div className="col-12 form-group mt-2">
                                <label>Mapping</label>
                                <div className="row">
                                    <div className="col-6">
                                        <h4>Customer name: </h4>
                                    </div>
                                    <div className="col-6">
                                        <select 
                                            className="form-control"
                                            name='name'
                                            onChange={ (e) => { handleImportMapChange(e) } }
                                            value={ localImportMap['name'] }
                                        >
                                            {
                                                localImportedHeaders.map((value, index) => {
                                                    return (
                                                        <option key={index} value={index}>{value}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 form-group mt-4">
                                <label>
                                    Imported File 
                                    <span className="c-badge c-badge-sm c-badge-success ml-2">count rows <b>{localImportedCustomers.length}</b></span>
                                </label>
                                <table className="c-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            {
                                                localImportedHeaders.map((value, index) => {
                                                    return (
                                                        <th key={index}>{value}</th>
                                                    )
                                                })
                                            }
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            localImportedCustomers.map((value, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index+1}</td>
                                                        {
                                                            value.map((value1, index1) => {
                                                                return (
                                                                    <td key={index1}>{value1}</td>
                                                                )
                                                            })
                                                        }
                                                        <td>
                                                            <button 
                                                                className="c-btn c-btn-danger"
                                                                onClick={ (e) => { deleteRow(e, index) } }
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-12 mt-4 text-right'>
                                <button className='c-btn c-btn-primary'>Save</button>
                            </div>
                        </>
                    }
                </form>
            </div>
        </div>
    )
}

export default ImportForm;
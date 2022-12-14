import React, { useContext } from "react";
import { FaPencilAlt, FaPlus, FaTrash, FaUpload } from "react-icons/fa";

import { ContextData } from "../../../contexts/ContextData";
import { ContextCrud } from "../../../contexts/ContextCrud";

const CustomerList = () => {
    const { customerList, fromItem } = useContext(ContextData);
    const { handleAddClick, handleEditClick, handleDeleteClick, handleImportClick, handleSearch } = useContext(ContextCrud);

    return (
        <>
            <div className="page-head d-flex">
                <div className="page-title mr-auto">Customers</div>
                <div className='mr-2 w-25'>
                    <input 
                        type='text'
                        className='form-control'
                        placeholder='Search...'
                        onChange={ (e) => { handleSearch(e) } }
                    />
                </div>
                <div>
                    <button 
                        className="c-btn c-btn-info mr-2"
                        onClick={ () => { handleImportClick() } }
                    >
                        <i><FaUpload /></i>
                    </button>
                    <button 
                        className="c-btn c-btn-primary"
                        onClick={ () => { handleAddClick() } }
                    >
                        <i><FaPlus /></i>
                    </button>
                </div>
            </div>
            <div className="page-content">
                <table className="c-table mt-4">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Customer Name</th>
                            <th>Company</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customerList.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{fromItem+index}</td>
                                        <td>{value['name']}</td>
                                        <td>
                                            { 
                                                value['use'].map((value1, index1) => {
                                                    return (
                                                        <span className='c-badge c-badge-primary mr-2' key={index1}>{value1['company_name']}</span>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td>
                                            <button 
                                                className="c-btn c-btn-primary mr-2"
                                                onClick={ () => { handleEditClick(value['id']) } }
                                            >
                                                <i><FaPencilAlt /></i>
                                            </button>
                                            <button 
                                                className="c-btn c-btn-danger"
                                                onClick={ () => { handleDeleteClick(value['id']) } }
                                            >
                                                <i><FaTrash /></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
} 

export default CustomerList;
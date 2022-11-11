import React, { useContext } from "react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";

import { ContextData } from "../../../contexts/ContextData";
import { ContextCrud } from "../../../contexts/ContextCrud";

const CompanyList = () => {
    const { companyList } = useContext(ContextData);
    const { handleAddClick, handleEditClick, handleDeleteClick, handleSearch } = useContext(ContextCrud);

    return (
        <>
            <div className="page-head d-flex">
                <div className="page-title mr-auto">Companies</div>
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
                            <th>Company Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            companyList.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{value['name']}</td>
                                        <td>
                                            <div className="c-list">
                                                <p><span>Address Line 1:</span> {value['address']['address_line1']}</p>
                                                <p><span>Address Line 2:</span> {value['address']['address_line2']}</p>
                                                <p>
                                                    <span>State:</span> 
                                                    { (value['address']['state']!=null) && 
                                                        <>
                                                            { value['address']['state']['full_name'] + '(' + value['address']['state']['short_name'] + ')' }
                                                        </>
                                                    }
                                                </p>
                                                <p><span>City:</span> {value['address']['city']}</p>
                                                <p><span>Zip Code:</span> {value['address']['postal']}</p>
                                            </div>
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

export default CompanyList;
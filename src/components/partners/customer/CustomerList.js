import React, { useContext } from "react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";

import { ContextData } from "../../../contexts/ContextData";
import { ContextCrud } from "../../../contexts/ContextCrud";

const CustomerList = () => {
    const { customerList } = useContext(ContextData);
    const { handleAddClick, handleEditClick, handleDeleteClick } = useContext(ContextCrud);

    return (
        <>
            <div className="page-head d-flex">
                <div className="page-title mr-auto">Customers</div>
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
                            <th>Customer Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customerList.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{value['name']}</td>
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
import React, { useContext } from "react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";

import { ContextData } from "../../../contexts/ContextData";
import { ContextCrud } from "../../../contexts/ContextCrud";
import DateFunction from "../statement/steps/transaction/functions/DateFunction";

const StatementsList = () => {

    const dateFunction = new DateFunction();

    const { statementsList } = useContext(ContextData);
    const { handleAddClick, handleEditClick, handleDeleteClick } = useContext(ContextCrud);

    return (
        <>
            <div className="page-head d-flex">
                <div className="page-title mr-auto">Statements</div>
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
                            <th>Created At</th>
                            <th>Periods</th>
                            <th>Company</th>
                            <th>Organization</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            statementsList.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{ dateFunction.formatDate(new Date(value['created_at']))}</td>
                                        <td>
                                            {
                                                value['periods'].map((value1, index1) => {
                                                    return (
                                                        <span key={index1} className="c-badge c-badge-sm c-badge-warning mr-2">{value1['period']}</span>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td>
                                            {value['company']['name']}
                                        </td>
                                        <td>
                                            {value['organization']['name']}
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

export default StatementsList;
import React, { useContext } from "react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";

import { ContextData } from "../../../contexts/ContextData";

const TransactionTypeList = () => {
    const { transactionTypeList } = useContext(ContextData);

    return (
        <>
            <div className="page-head d-flex">
                <div className="page-title mr-auto">Transaction's Types</div>
                <div>
                    <button className="c-btn c-btn-primary">
                        <i><FaPlus /></i>
                    </button>
                </div>
            </div>
            <div className="page-content">
                <table className="c-table mt-4">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Transaction Type Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactionTypeList.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{value['name']}</td>
                                        <td>
                                            <button className="c-btn c-btn-primary mr-2">
                                                <i><FaPencilAlt /></i>
                                            </button>
                                            <button className="c-btn c-btn-danger">
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

export default TransactionTypeList;
import React, { useContext } from "react";
import { FaInfo, FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";

import { ContextData } from "../../../../contexts/ContextData";

const TransactionCategoryList = () => {
    const { transactionCategoryList } = useContext(ContextData);

    return (
        <>
            <div className="page-head d-flex">
                <div className="page-title mr-auto">Transaction's Categories</div>
                <div>
                    <button className="c-btn c-btn-info mr-2">
                        <i><FaInfo /></i>
                    </button>
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
                            <th>Type</th>
                            <th>Category Name</th>
                            <th>Offset</th>
                            <th>Customer</th>
                            <th>Sender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactionCategoryList.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{value['transaction_type']['name']}</td>
                                        <td>{value['name']}</td>
                                        <td>{value['offset']}</td>
                                        <td>{value['customer']}</td>
                                        <td>{value['sender']}</td>
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

export default TransactionCategoryList;
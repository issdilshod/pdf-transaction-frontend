import React, { useContext } from "react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";

import { ContextData } from "../../../../contexts/ContextData";

const TransactionPageList = () => {
    const { transactionPageList } = useContext(ContextData);

    return (
        <>
            <div className="page-head d-flex">
                <div className="page-title mr-auto">Transaction's Pages</div>
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
                            <th>Page</th>
                            <th>Start Offset</th>
                            <th>End Offset</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactionPageList.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{value['page']}</td>
                                        <td>{value['start_offset']}</td>
                                        <td>{value['end_offset']}</td>
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

export default TransactionPageList;
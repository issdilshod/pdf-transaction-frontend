import React, { useContext } from "react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";

import { ContextData } from "../../../contexts/ContextData";

const SenderList = () => {
    const { senderList } = useContext(ContextData);

    return (
        <>
            <div className="page-head d-flex">
                <div className="page-title mr-auto">Senders</div>
                <div>
                    <button className="c-btn c-btn-primary">
                        <i><FaPlus /></i>
                    </button>
                </div>
            </div>
            <div className="page-content">
                <table className="c-table mt-4">
                    <tr>
                        <th>#</th>
                        <th>Sender Name</th>
                        <th>Sender ID</th>
                        <th>Actions</th>
                    </tr>
                    {
                        senderList.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{value['name']}</td>
                                    <td>{value['it_id']}</td>
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
                </table>
            </div>
        </>
    )
} 

export default SenderList;
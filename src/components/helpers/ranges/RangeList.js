import React, { useContext } from "react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";

import { ContextData } from "../../../contexts/ContextData";

const RangeList = () => {
    const { rangeList } = useContext(ContextData);

    return (
        <>
            <div className="page-head d-flex">
                <div className="page-title mr-auto">Ranges</div>
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
                        <th>Start</th>
                        <th>End</th>
                        <th>Actions</th>
                    </tr>
                    {
                        rangeList.map((value, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{value['start']}</td>
                                    <td>{value['end']}</td>
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

export default RangeList;
import React, { useContext } from "react";
import { FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";

import { ContextData } from "../../../contexts/ContextData";
import { ContextCrud } from "../../../contexts/ContextCrud";

const DescriptionList = () => {
    const { descriptionList } = useContext(ContextData);
    const { handleAddClick, handleEditClick, handleDeleteClick } = useContext(ContextCrud);

    return (
        <>
            <div className="page-head d-flex">
                <div className="page-title mr-auto">Description</div>
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
                            <th>Description Name</th>
                            <th>Rule</th>
                            <th>Split</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            descriptionList.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{value['name']}</td>
                                        <td>
                                            {
                                                value['description_rules'].map((value1, index1) => {
                                                    return (
                                                        <span 
                                                            key={index1}
                                                            className="c-badge c-badge-sm c-badge-primary mr-2"
                                                        >
                                                            {value1['description_rule']['value']}
                                                            {   value1['value'] &&
                                                                <span>{value1['value']}</span>
                                                            }
                                                        </span>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td>
                                            { Boolean(value['split']) &&
                                                <span className="c-badge c-badge-success">ON {value['split']}</span>
                                            }
                                            { !Boolean(value['split']) &&
                                                <span className="c-badge c-badge-danger">NO SPLIT</span>
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

export default DescriptionList;
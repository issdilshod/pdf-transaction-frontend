import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";


const Font = ({ Fonts, onAdd, onDelete, onChange }) => {

    const [localFont, setLocalFont] = useState(Fonts);

    useEffect(() => {
        setLocalFont(Fonts);
    }, [Fonts])

    const handleAdd = (e) => {
        e.preventDefault();
        onAdd();
    }

    const handleDelete = (index, e) => {
        e.preventDefault();
        onDelete(index);
    }

    const handleChange = (index, name, value) => {
        onChange(index, name, value);
    }

    return (
        <table className="c-table">
            <thead>
                <tr>
                    <th>ASCII</th>
                    <th>Unicode</th>
                    <th>HEX</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    localFont.map((value, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    <input
                                        className="form-control" 
                                        placeholder="ASCII"
                                        value={value['ascii']}
                                        onChange={ (e) => { handleChange(index, 'ascii', e.target.value) }}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-control" 
                                        placeholder="Unicode"
                                        value={value['unicode']}
                                        onChange={ (e) => { handleChange(index, 'unicode', e.target.value) }}
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-control" 
                                        placeholder="HEX"
                                        value={value['hex']}
                                        onChange={ (e) => { handleChange(index, 'hex', e.target.value) }}
                                    />
                                </td>
                                <td className="text-right">
                                    <button 
                                        className="c-btn c-btn-danger"
                                        onClick={ (e) => { handleDelete(index, e) } }
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="text-right">
                        <button 
                            className="c-btn c-btn-primary"
                            onClick={ (e) => { handleAdd(e) }}
                        >
                            <FaPlus />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Font;
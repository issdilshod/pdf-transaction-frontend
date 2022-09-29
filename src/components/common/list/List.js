import { useEffect, useState } from 'react';
import { FaPlus, FaTimes, FaTrash } from 'react-icons/fa';

import './List.scss';

const List = ({ Name, AllItems, Items, Selected, onAdd, onDelete}) => {
    const [allItems, setAllItems] = useState(AllItems);
    const [items, setItems] = useState(Items);
    const [selected, setSeleted] = useState(Selected);
    const [removedItems, setRemovedItems] = useState();

    useEffect(() => {
        setAllItems(AllItems);
    }, [AllItems])

    useEffect(() => {
        setItems(Items);
    }, [Items])

    useEffect(() => {
        setSeleted(Selected);
    }, [Selected])

    const handleAdd = (id) => {
        onAdd(id, Name);
    }

    const handleDelete = (id) => {
        onDelete(id, Name);
    }

    return (
        <div className='c-list-block row'>
            <div className='col-12 col-sm-6'>
                <div className='c-list'>
                    <div className='c-list-head'>
                        Items
                    </div>
                    <div className='c-list-body'>
                        {
                            allItems.map((value, index) => {
                                return (
                                    <div 
                                        key={index} 
                                        className='c-list-item d-flex'
                                    >
                                        <div className='mr-auto'>
                                            {value['name']}
                                        </div>
                                        <div onClick={ () => { handleAdd(value['id']) } }>
                                            <i><FaPlus /></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='col-12 col-sm-6'>
                <div className='c-list'>
                    <div className='c-list-head'>
                        Selected
                    </div>
                    <div className='c-list-body'>
                        <>
                            {   // already selected
                                items.map((value, index) => {
                                    return (
                                        <div 
                                            key={index} 
                                            className='c-list-item d-flex'
                                        >
                                            <div className='mr-auto'>
                                                {value['name']}
                                            </div>
                                            <div onClick={ () => { handleDelete(value['id']) } }>
                                                <i><FaTrash /></i>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List;
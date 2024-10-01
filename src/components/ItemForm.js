import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createItems, updateItems } from '../features/itemsSlice';

const ItemForm = ({ currentItems, setCurrentItems }) => {

    const dispatch = useDispatch();

    const [itemsData, setItemsData] = useState({ name: '', price: '', description: '' });

    console.log("ssss", itemsData, currentItems);

    useEffect(() => {
        if (currentItems) {
            setItemsData(currentItems)
        }
        else {
            setItemsData({ name: '', price: '', description: '' })
        }
    }, [currentItems]);


    const handaleSubmit = (e) => {
        e.preventDefault();
        if (currentItems) {
            dispatch(updateItems({ ...itemsData, id: currentItems._id }));

        } else {
            dispatch(createItems(itemsData))
            console.log("else data", itemsData);
            setItemsData({ name: '', price: '', description: '' })
        }

        setCurrentItems(null)
    }

    return (
        <div>
            <form onSubmit={handaleSubmit} className='mb-5'>
                <input
                    type='text'
                    value={itemsData?.name}
                    onChange={(e) => setItemsData({ ...itemsData, name: e.target.value })}
                    placeholder="Inter Items Name"
                    className='border p-2 w-full mb-2'
                    required
                />

                <input type='number'
                    value={itemsData?.price}
                    onChange={(e) => setItemsData({ ...itemsData, price: e.target.value })}
                    placeholder='Input Price'
                    className='border p-2 w-full mb-2'
                    required
                />
                <textarea
                    value={itemsData?.description}
                    onChange={(e) => setItemsData({ ...itemsData, description: e.target.value })}
                    placeholder="description"
                    className="border p-2 w-full mb-2"
                    required
                />
                <button className='bg-orange-600 text-white p-2'>
                    {currentItems ? "Update" : "Create"} Items
                </button>
            </form>
        </div>
    );
};

export default ItemForm;
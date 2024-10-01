import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemForm from './ItemForm';
import { deleteItems, fetchItems } from '../features/itemsSlice';

const ItemsList = () => {

    const dispatch = useDispatch();
    const items = useSelector((state) => state.items.items);
    const [currentItems, setCurrentItems] = useState(null);


    useEffect(() => {
        dispatch(fetchItems())
    }, [dispatch]);


    const handlaeDelete = async (id) => {
        const response = await dispatch(deleteItems(id));
        if (response.meta.requestStatus === "fulfilled") {
            alert("delete success")
        }
        else {
            alert("somthing is wrong")
        }
    }


    return (
        <div>
            <ItemForm currentItems={currentItems} setCurrentItems={setCurrentItems} />
            <h2 className="text-2xl mb-4">Items</h2>
            <ul>
                {items.map((item) => (
                    <li key={item._id} className="flex justify-between mb-2">
                        <div>
                            <h3 className="font-bold">{item.name}</h3>
                            <p>{item.description}</p>
                            <p>${item.price}</p>
                        </div>
                        <div>
                            <button onClick={() => setCurrentItems(item)} className="bg-yellow-500 text-white px-2 mr-2">
                                Edit
                            </button>
                            <button onClick={() => handlaeDelete(item._id)} className="bg-red-500 text-white px-2">
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemsList;
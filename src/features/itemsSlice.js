import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: "idle",
    error: null
};

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
    const response = await axios.get('http://localhost:5000/api/items');
    return response.data;
});

export const createItems = createAsyncThunk('items/createItems', async (items) => {
    const response = await axios.post('http://localhost:5000/api/items', items);
    return response.data;
});

export const updateItems = createAsyncThunk('items/updateItems', async (items) => {
    const response = await axios.put(`http://localhost:5000/api/items/${items.id}`, items);
    return response.data;
});

export const deleteItems = createAsyncThunk('items/deleteItems', async (id) => {
    await axios.delete(`http://localhost:5000/api/items/${id}`);
    return id;
});


const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(createItems.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })

            .addCase(updateItems.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item._id === action.payload);
                state.items[index] = action.payload;
            })
            .addCase(deleteItems.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item._id === action.payload);
                state.items.splice(index, 1);
            })
    }
});

export default itemsSlice.reducer;
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { sortType } from "./filterSlice";
import { getPagesCount } from "../../utils/pages";
import { setTotalPages } from "./filterSlice";

type Pizza = {
    id: number;
    imageUrl: string;
    name: string;
    price: number;
    rating: number;
    sizes: number[];
    types: number[];
    priceAll: number[];
};

interface pizzaSliceState {
    items: Pizza[];
    status: string;
}

const initialState: pizzaSliceState = {
    items: [],
    status: "loading",
};

type fetchType = {
    activeCategory: number | null;
    activeSort: sortType;
    searchValue: string;
    currentPage: number;
    limit: number;
};
export const fetchPizzas = createAsyncThunk<Pizza[], fetchType>(
    "pizza/fetchPizzas",
    async (
        { activeCategory, activeSort, searchValue, currentPage, limit },
        { dispatch }
    ) => {
        const category =
            activeCategory === null ? "" : `category=${activeCategory}&`;
        const sort = `sortBy=${activeSort.field}&order=${activeSort.order}`;
        const res = await axios.get<Pizza[]>(
            `https://63f9de3e897af748dcc4cb3c.mockapi.io/items?${category}${sort}&search=${searchValue}&page=${currentPage}&limit=${limit}`
        );
        const count = activeCategory === null ? 10 : 4;
        dispatch(setTotalPages(getPagesCount(count, limit)));
        if (searchValue) dispatch(setTotalPages(1));

        return res.data;
    }
);

const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setItems: (state, action: PayloadAction<Pizza[]>) => {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPizzas.fulfilled, (state, action) => {
            state.status = "success";
            state.items = action.payload;
        });
    },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;

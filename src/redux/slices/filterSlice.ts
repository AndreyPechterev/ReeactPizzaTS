import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type sortType = { name: string; field: string; order: string };

interface filterSliceState {
    searchValue: string;
    activeCategory: number | null;
    activeSort: sortType;
    currentPage: number;
    totalPages: number;
}

const initialState: filterSliceState = {
    searchValue: "",
    activeCategory: null,
    activeSort: { name: "популярности 🠕", field: "rating", order: "asc" },
    currentPage: 1,
    totalPages: 1,
};

const fliterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        setSearchValue: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload;
        },
        setCategory: (state, action: PayloadAction<null | number>) => {
            state.activeCategory = action.payload;
        },
        setSort: (state, action: PayloadAction<sortType>) => {
            state.activeSort = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
        setFilters: (state, action: PayloadAction<filterSliceState>) => {
            state.currentPage = Number(action.payload.currentPage);
            state.activeCategory = action.payload.activeCategory;
            state.activeSort = action.payload.activeSort;
        },
    },
});

export const {
    setSearchValue,
    setCategory,
    setSort,
    setCurrentPage,
    setTotalPages,
    setFilters,
} = fliterSlice.actions;
export default fliterSlice.reducer;

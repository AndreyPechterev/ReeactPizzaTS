import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    id: number;
    imageUrl: string;
    price: number;
    type: string;
    size: number;
    totalCount: number;
    totalPrice: number;
    name: string;
    unique: string;
};

interface cartSliceState {
    totalPrice: number;
    totalCount: number;
    items: CartItem[];
}

const initialState: cartSliceState = {
    items: [],
    totalPrice: 0,
    totalCount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addPizza: (state, action: PayloadAction<CartItem>) => {
            const findItem = state.items.find(
                (obj) =>
                    obj.unique ==
                    `${action.payload.size}${action.payload.type}${action.payload.id}`
            );

            if (findItem) {
                findItem.totalCount++;
                findItem.totalPrice =
                    findItem.totalPrice + action.payload.price;
            } else {
                state.items.push({
                    ...action.payload,
                    totalCount: 1,
                    totalPrice: action.payload.price,
                    unique: `${action.payload.size}${action.payload.type}${action.payload.id}`,
                });
            }
            state.totalCount++;
            state.totalPrice = state.totalPrice + action.payload.price;
        },
        removePizza: (state, action: PayloadAction<CartItem>) => {
            const findItem = state.items.find(
                (obj) =>
                    obj.unique ===
                    `${action.payload.size}${action.payload.type}${action.payload.id}`
            );
            if (findItem) {
                findItem.totalCount--;
                findItem.totalPrice -= action.payload.price;
            }
            state.totalPrice -= action.payload.price;
            state.totalCount -= 1;
        },
        clearCart: (state) => {
            state.items = [];
            state.totalCount = 0;
            state.totalPrice = 0;
        },
        removePizzaBlock: (state, action: PayloadAction<CartItem>) => {
            state.items = state.items.filter(
                (obj) =>
                    obj.unique !==
                    `${action.payload.size}${action.payload.type}${action.payload.id}`
            );
            state.totalPrice = state.totalPrice - action.payload.totalPrice;
            state.totalCount = state.totalCount - action.payload.totalCount;
        },
    },
});

export const { addPizza, clearCart, removePizza, removePizzaBlock } =
    cartSlice.actions;
export default cartSlice.reducer;

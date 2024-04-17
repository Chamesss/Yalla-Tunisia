import { createSlice } from "@reduxjs/toolkit";

type initialState = {
    productsIds: string[]
}

const initialState: initialState = {
    productsIds: [""]
}



const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToCart(state, action) {
            const cartId = action.payload;
            state.productsIds = [...state.productsIds, cartId];
        },
        removeProductFromCart(state, action) {
            const cartId = action.payload;
            state.productsIds = state.productsIds.filter((id) => id !== cartId);
        }
    },
});

export const { addProductToCart, removeProductFromCart } = cartSlice.actions;
export const cartState = (state: { cart: initialState; }) => state.cart
export default cartSlice.reducer;
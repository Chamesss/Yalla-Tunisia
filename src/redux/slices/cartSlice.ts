import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartProduct = {
    productId: string;
    categoryName: string;
};

type InitialState = {
    products: CartProduct[];
};

const initialState: InitialState = {
    products: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToCart(state, action: PayloadAction<CartProduct>) {
            state.products.push(action.payload);
        },
        removeProductFromCart(state, action: PayloadAction<string>) {
            const cartId = action.payload;
            state.products = state.products.filter(product => product.productId !== cartId);
        },
    },
});

export const { addProductToCart, removeProductFromCart } = cartSlice.actions;

export const cartState = (state: { cart: InitialState }) => state.cart;

export default cartSlice.reducer;
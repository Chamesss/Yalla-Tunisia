import { createSlice } from "@reduxjs/toolkit";

type initialState = {
    productsIds: string[]
}

const initialState: initialState = {
    productsIds: [""]
}



const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addProductToFavorites(state, action) {
            const productId = action.payload;
            state.productsIds = [...state.productsIds, productId];
        },
        removeProductFromFavorites(state, action) {
            const productId = action.payload;
            state.productsIds = state.productsIds.filter((id) => id !== productId);
        },
        getFavorites(state, action) {
            const { favorites }: { favorites: Favorites } = action.payload
            state.productsIds = [...favorites.favorites]
        }
    },
});

export const { addProductToFavorites, removeProductFromFavorites, getFavorites } = favoritesSlice.actions;
export const favoritesState = (state: { favorites: initialState; }) => state.favorites
export default favoritesSlice.reducer;
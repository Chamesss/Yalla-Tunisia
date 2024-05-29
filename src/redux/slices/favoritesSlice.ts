import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ProductId = {
    id: string,
    ref: string
}

type initialState = {
    productsIds: ProductId[],
    userId: null | string
}

const initialState: initialState = {
    productsIds: [],
    userId: null
}



const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addProductToFavorites(state, action: PayloadAction<{ productId: string; categoryName: string }>) {
            const { productId, categoryName } = action.payload;
            state.productsIds.push({ id: productId, ref: categoryName });
        },
        removeProductFromFavorites(state, action: PayloadAction<string>) {
            const productIdToRemove = action.payload;
            state.productsIds = state.productsIds.filter(product => product.id !== productIdToRemove);
        },
        getFavorites(state, action) {
            const { favorites }: { favorites: Favorites | undefined } = action.payload
            if (favorites && favorites.favorites) {
                state.productsIds = [...favorites.favorites]
                state.userId = favorites.userId
            }
        },
        cleanFavoritesState(state) {
            state.productsIds = []
            state.userId = null
        },
    },
});

export const { addProductToFavorites, removeProductFromFavorites, getFavorites, cleanFavoritesState } = favoritesSlice.actions;
export const favoritesState = (state: { favorites: initialState; }) => state.favorites
export default favoritesSlice.reducer;
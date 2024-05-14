import { combineReducers } from 'redux';
import userSlice from './slices/userSlice';
import cartSlice from './slices/cartSlice';
import favoritesSlice from './slices/favoritesSlice';

const rootReducer = combineReducers({
    user: userSlice,
    cart: cartSlice,
    favorites: favoritesSlice,
});

export default rootReducer;
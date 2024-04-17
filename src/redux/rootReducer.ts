import { combineReducers } from 'redux';
import userSlice from './slices/userSlice';
import cartSlice from './slices/cartSlice';

const rootReducer = combineReducers({
    user: userSlice,
    cart: cartSlice
});

export default rootReducer;
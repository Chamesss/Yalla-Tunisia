import { configureStore } from '@reduxjs/toolkit';
import {
    TypedUseSelectorHook,
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
} from 'react-redux';
import rootReducer from './rootReducer';
// import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false,
        }),
});

const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
const useDispatch = () => useAppDispatch<AppDispatch>();
export { store, persistor, useDispatch };



// ----------------------------------------------------------------------

// // Define the root state type using the ReturnType utility of TypeScript
// export type RootState = ReturnType<typeof rootReducer>;

// // Define the type for dispatching actions from the store
// export type AppDispatch = typeof store.dispatch;

// Extract the dispatch function from the store for convenience
//const { dispatch } = store;

// const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

// // Create a custom useDispatch hook with typed dispatch

// Export the Redux store, dispatch, useSelector, and useDispatch for use in components

//export {dispatch, useSelector, useDisptach}
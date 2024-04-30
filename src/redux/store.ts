import { configureStore } from '@reduxjs/toolkit';
import {
    TypedUseSelectorHook,
    useDispatch as useAppDispatch,
    useSelector as useAppSelector,
} from 'react-redux';
import rootReducer from './rootReducer';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

export function createPersistStore() {
    const isServer = typeof window === "undefined";
    if (isServer) {
        return {
            getItem() {
                return Promise.resolve(null);
            },
            setItem() {
                return Promise.resolve();
            },
            removeItem() {
                return Promise.resolve();
            },
        };
    }
    return createWebStorage("local");
}

const storage = typeof window !== "undefined"
    ? createWebStorage("local")
    : createPersistStore();
const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            immutableCheck: false,
        }),
});

const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
const useDispatch = () => useAppDispatch<AppDispatch>();
export { store, persistor, useDispatch };
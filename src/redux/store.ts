import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./features/userSlicer.ts";
import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    user: userReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk],
});

export default store;
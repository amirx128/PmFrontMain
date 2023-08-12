import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./features/userSlicer.ts";
import definitionReducer from "./features/definitionSlicer.ts";
import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    user: userReducer,
    definition: definitionReducer
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export default store;
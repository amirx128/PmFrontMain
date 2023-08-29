import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlicer.ts";
import definitionReducer from "./features/definitionSlicer.ts";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import administrationSlicer from "./features/administrationSlicer.ts";
import purchaseSlicer from "./features/purchaseSlicer.ts";
import supplierSlicer from "./features/supplierSlicer.ts";
import warehouseSlicer from "./features/warehouseSlicer.ts";
const reducers = combineReducers({
  user: userReducer,
  definition: definitionReducer,
  administrations: administrationSlicer,
  purchase: purchaseSlicer,
  supplier: supplierSlicer,
  warehouse: warehouseSlicer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;

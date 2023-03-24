import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./product";

const rootReducer = combineReducers({
  product: productReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

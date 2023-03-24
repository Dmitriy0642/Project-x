import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./changeProduct";

const rootReducer = combineReducers({
  product: productReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

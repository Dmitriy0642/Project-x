import { combineReducers, configureStore } from "@reduxjs/toolkit";
import changeProductReducer from "./changeProduct";
import productReducer from "./product";

const rootReducer = combineReducers({
  changeProduct: changeProductReducer,
  product: productReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

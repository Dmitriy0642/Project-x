import { combineReducers, configureStore } from "@reduxjs/toolkit";
import changeProductReducer from "./changeProduct";
import productReducer from "./product";
import categoryReducer from "./categoryOfProduct";

const rootReducer = combineReducers({
  changeProduct: changeProductReducer,
  product: productReducer,
  category: categoryReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

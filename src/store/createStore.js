import { combineReducers, configureStore } from "@reduxjs/toolkit";
import changeProductReducer from "./changeProduct";
import productReducer from "./product";
import categoryReducer from "./categoryOfProduct";
import updateQuantityReducer from "./updateProductQuan";

const rootReducer = combineReducers({
  changeProduct: changeProductReducer,
  product: productReducer,
  category: categoryReducer,
  updateProducts: updateQuantityReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

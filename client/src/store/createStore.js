import { combineReducers, configureStore } from "@reduxjs/toolkit";
import changeProductReducer from "./changeProduct";
import productReducer from "./product";
import categoryReducer from "./categoryOfProduct";
import usersReducer from "./users";
import purchasedReducer from "./purchasedProduct";

const rootReducer = combineReducers({
  changeProduct: changeProductReducer,
  product: productReducer,
  category: categoryReducer,
  users: usersReducer,
  purchasedProduct: purchasedReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

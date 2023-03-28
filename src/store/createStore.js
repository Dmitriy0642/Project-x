import { combineReducers, configureStore } from "@reduxjs/toolkit";
import changeProductReducer from "./changeProduct";
import productReducer from "./product";
import categoryReducer from "./categoryOfProduct";
import usersReducer from "./users";

const rootReducer = combineReducers({
  changeProduct: changeProductReducer,
  product: productReducer,
  category: categoryReducer,
  users: usersReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

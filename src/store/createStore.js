import { combineReducers, configureStore } from "@reduxjs/toolkit";
import changeProductReducer from "./changeProduct";

const rootReducer = combineReducers({
  changeProduct: changeProductReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

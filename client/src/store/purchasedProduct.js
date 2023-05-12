import { createSlice } from "@reduxjs/toolkit";
import http from "../services/http.service";

const purchasedSlice = createSlice({
  name: "purchasedProduct",
  initialState: {
    isLoading: true,
    error: null,
    entities: null,
  },
  reducers: {
    purchasedRequested: (state) => {
      state.isLoading = true;
    },
    purchasedReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    purchasedRequestFailed: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer: purchasedReducer, actions } = purchasedSlice;
const { purchasedRequested, purchasedReceved, purchasedRequestFailed } =
  actions;
export default purchasedReducer;

export const loadListPurchased = () => async (dispatch) => {
  dispatch(purchasedRequested());
  try {
    const { data } = await http.get("salesProduct");
    const foramtDataToArr = Object.keys(data).map((item) => data[item]);

    dispatch(purchasedReceved(foramtDataToArr));
  } catch (error) {
    dispatch(purchasedRequestFailed(error.message));
  }
};

export const getPurchased = () => (state) => state.purchasedProduct.entities;

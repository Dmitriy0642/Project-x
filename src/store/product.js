import { createSlice } from "@reduxjs/toolkit";
import httpService from "../services/http.service";
import { getAccesToken } from "../services/localStorage.service";

const productSlice = createSlice({
  name: "product",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    productRequested: (state) => {
      state.isLoading = true;
    },
    productReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    productRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: productReducer, actions } = productSlice;
const { productRequested, productReceved, productRequestFailed } = actions;
export const loadProductList = () => async (dispatch) => {
  dispatch(productRequested());
  try {
    const { data } = await httpService.get(
      "product" + `.json?auth=${getAccesToken()}`
    );
    const arr = [];
    Object.keys(data).forEach((item) => arr.push(data[item]));
    dispatch(productReceved(arr));
  } catch (error) {
    dispatch(productRequestFailed(error.message));
  }
};
export default productReducer;

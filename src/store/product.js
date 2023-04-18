import { createSlice } from "@reduxjs/toolkit";
import httpService from "../services/http.service";
import { getAccesToken } from "../services/localStorage.service";
const productSlice = createSlice({
  name: "product",
  initialState: {
    entities: null,
    error: null,
    isLoading: true,
  },
  reducers: {
    productRequested: (state) => {
      state.isLoading = true;
    },
    productReceved: (state, aciton) => {
      state.entities = aciton.payload;
      state.isLoading = false;
    },
    productRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addedNewProduct: (state, action) => {
      state.entities.push(action.payload);
    },
  },
});

const { reducer: productReducer, actions } = productSlice;
const {
  productRequested,
  productReceved,
  productRequestFailed,
  addedNewProduct,
} = actions;

export const loadProductList = () => async (dispatch) => {
  dispatch(productRequested());
  try {
    const initiArr = [];
    const { data } = await httpService.get(
      "product" + `.json?auth=${getAccesToken()}`
    );
    Object.keys(data).forEach((item) => initiArr.push(data[item]));
    dispatch(productReceved(initiArr));
  } catch (error) {
    dispatch(productRequestFailed(error.message));
  }
};

export const loadNewProduct = (product) => (dispatch) => {
  dispatch(productRequested());
  try {
    dispatch(addedNewProduct(product));
  } catch (error) {
    dispatch(productRequestFailed(error.message));
  }
};
export const getProduct = () => (state) => state.product.entities;

export default productReducer;

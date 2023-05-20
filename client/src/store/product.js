import { createSlice } from "@reduxjs/toolkit";
import http from "../services/http.service";
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
    removeProduct: (state, aciton) => {
      const index = state.entities.findIndex(
        (el) => el._id === aciton.payload.product
      );
      if (index !== -1) {
        state.entities.splice(index, 1);
      }
    },
  },
});

const { reducer: productReducer, actions } = productSlice;
const {
  productRequested,
  productReceved,
  productRequestFailed,
  addedNewProduct,
  removeProduct,
} = actions;

export const loadProductList = () => async (dispatch) => {
  dispatch(productRequested());
  try {
    const initiArr = [];
    const { data } = await http.get("product");
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

export const removingProduct = (product) => (dispatch) => {
  dispatch(productRequested());
  try {
    dispatch(removeProduct(product));
  } catch (error) {
    dispatch(productRequestFailed(error.message));
  }
};

export const getProduct = () => (state) => state.product.entities;

export default productReducer;

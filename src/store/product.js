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
  },
});

const { reducer: reducserProduct, actions } = productSlice;
const { productRequested, productReceved, productRequestFailed } = actions;

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

export default reducserProduct;

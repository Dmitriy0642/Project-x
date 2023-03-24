import { createSlice } from "@reduxjs/toolkit";
import httpService from "../services/http.service";
import { getAccesToken } from "../services/localStorage.service";

const changeProductSlice = createSlice({
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

const { reducer: productReducer, actions } = changeProductSlice;
const { productRequested, productReceved, productRequestFailed } = actions;
export const loadChangeProductList = () => async (dispatch) => {
  dispatch(productRequested());
  try {
    const { data } = await httpService.get(
      "product" + `.json?auth=${getAccesToken()}`
    );
    const arrInitValues = [];
    Object.keys(data).forEach((item) => arrInitValues.push(data[item]));
    const allSizes = arrInitValues.map((item) => (item = item.quantity));
    const remakeSizes = allSizes.map((obj) => {
      const remakeValues = obj.map((item) => {
        return (item = { size: item.size, value: 0 });
      });
      return (obj = remakeValues);
    });
    const pushNullSizesToArr = arrInitValues.map((item, i) => {
      return (item = { ...item, quantity: remakeSizes[i] });
    });
    dispatch(productReceved(pushNullSizesToArr));
  } catch (error) {
    dispatch(productRequestFailed(error.message));
  }
};
export default productReducer;

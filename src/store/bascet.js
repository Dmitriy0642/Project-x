import { createSlice } from "@reduxjs/toolkit";
import orderService from "../services/orders.service";

const bascetSlice = createSlice({
  name: "bascet",
  initialState: {
    entities: null,
    error: null,
    isLoading: true,
  },
  reducers: {
    bascetReqested: (state) => {
      state.isLoading = false;
    },
    bascetReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    bascetReqesteFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: bascetReducer, actions } = bascetSlice;
const { bascetReqested, bascetReceved, bascetReqesteFailed } = actions;

export const getBascetProduct = () => async (dispatch) => {
  dispatch(bascetReqested());
  try {
    const data = await orderService.getBascetPurchases().then((res) => {
      const fromObjToArr = Object.keys(res).map((item) => res[item]);
      dispatch(bascetReceved(fromObjToArr));
    });
  } catch (error) {
    console.log(error.message);
    dispatch(bascetReqesteFailed(error.message));
  }
};

export const getBascetProd = () => (state) => state.bascet.entities;
export default bascetReducer;

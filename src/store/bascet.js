import { createSlice } from "@reduxjs/toolkit";

const bascetSlice = createSlice({
  name: "bascet",
  initialState: { isLoading: true, error: null, entities: [] },
  reducers: {
    bascetReqested: (state) => {
      state.isLoading = true;
    },
    bascetReceved: (state, action) => {
      state.entities = [...state.entities, action.payload];
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

export const getBascetProduct = (data) => (dispatch) => {
  dispatch(bascetReqested());
  try {
    dispatch(bascetReceved(data));
  } catch (error) {
    dispatch(bascetReqesteFailed(error.message));
  }
};

export const getBascetProd = () => (state) => state.bascet.entities;
export const getBascetError = () => (state) => state.bascet.isLoading;
export default bascetReducer;

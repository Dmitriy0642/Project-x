import { createSlice } from "@reduxjs/toolkit";
import http from "../services/http.service";
import { getAccesToken } from "../services/localStorage.service";
const categorySlice = createSlice({
  name: "category",
  initialState: {
    entities: null,
    isLoading: true,
  },
  reducers: {
    categoryRequested: (state) => {
      state.isLoading = true;
    },
    categoryReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    categoryRequestFailed: (state, action) => {
      state.isLoading = false;
    },
  },
});

const { reducer: categoryReducer, actions } = categorySlice;
const { categoryRequested, categoryReceved, categoryRequestFailed } = actions;

export const loadListCategory = () => async (dispatch) => {
  dispatch(categoryRequested());
  try {
    const initiArr = [];
    const { data } = await http.get(
      "category" + `.json?auth=${getAccesToken()}`
    );
    Object.keys(data).forEach((item) => initiArr.push(data[item]));
    dispatch(categoryReceved(initiArr));
  } catch (error) {
    dispatch(categoryRequestFailed(error.message));
  }
};

export const getCategory = () => (state) => state.category.entities;

export default categoryReducer;

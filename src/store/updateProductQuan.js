import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const updatedProductsSlice = createSlice({
  name: "updateProducts",
  initialState,
  reducers: {
    updateProductQuantity: (state, action) => {
      const index = state.products.findIndex(
        (item) => item._id === action.payload._id
      );
      state.products[index] = action.payload;
    },
  },
});

const { reducer: updateQuantityReducer, actions } = updatedProductsSlice;
export const { updateProductQuantity } = actions;
export default updateQuantityReducer;

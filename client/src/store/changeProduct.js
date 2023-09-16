import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import bascetService from "../services/bascet.service";
import http from "../services/http.service";

const changeProductSlice = createSlice({
  name: "changeProduct",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    changeProductRequested: (state) => {
      state.isLoading = true;
    },
    changeProductReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    changeProductRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: changeProductReducer, actions } = changeProductSlice;
const {
  changeProductRequested,
  changeProductReceved,
  changeProductRequestFailed,
} = actions;
export const loadChangeProductList = () => async (dispatch) => {
  dispatch(changeProductRequested());
  try {
    const { data } = await http.get("/product");
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
    dispatch(changeProductReceved(pushNullSizesToArr));
  } catch (error) {
    dispatch(changeProductRequestFailed(error.message));
  }
};

export const changeProductQuantity =
  (changeProduct, selectedProduct, selectedSize) => async (dispatch) => {
    const filtradeSingleData = changeProduct.filter(
      (item) => item._id === selectedProduct[0]._id
    );

    ///obj data
    const objData = filtradeSingleData[0];
    ///filterInitialQuantity
    const initialyQuantityFromObj = selectedProduct[0].quantity.filter(
      (item) => `${item.size}` === `${selectedSize}`
    );
    ///filterQuantityFromZeroValues
    const secondQuantityFromObj = objData.quantity.filter(
      (item) => `${item.size}` === `${selectedSize}`
    );

    if (secondQuantityFromObj[0].value < initialyQuantityFromObj[0].value) {
      const updatedQuantity = objData.quantity.map((item) => {
        if (`${item.size}` === `${selectedSize}`) {
          return { ...item, value: item.value + 1 };
        }
        return item;
      });
      const updatedObjData = { ...objData, quantity: updatedQuantity };
      toast.success("Product added to basket");
      const newData = changeProduct.map((item) => {
        if (item._id === updatedObjData._id) {
          return updatedObjData;
        }
        return item;
      });
      dispatch(changeProductReceved(newData));
      await bascetService.createAndPushToBascet(updatedObjData);
    } else if (
      secondQuantityFromObj[0].value === initialyQuantityFromObj[0].value
    ) {
      toast.error("In availability, not have size ");
    }
  };

export const getProductNullVal = () => (state) => state.changeProduct.entities;
export default changeProductReducer;

import React, { useState } from "react";
import config from "../config.json";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useApi } from "./useApi";
const ProductContex = React.createContext();
export const useProduct = () => {
  return useContext(ProductContex);
};
export const ProductProvider = ({ children }) => {
  const { prod } = useApi();
  const [produ, setProduct] = useState();

  const arrayObject = Object.keys(prod).map((item) => prod[item]);
  const allSizes = arrayObject.map((item) => (item = item.quantity));
  const remakeSizes = allSizes.map((obj) => {
    const remakeValues = obj.map((item) => {
      return (item = { size: item.size, value: 0 });
    });
    return (obj = remakeValues);
  });
  const pushNullSizesToArr = arrayObject.map((item, i) => {
    return (item = { ...item, quantity: remakeSizes[i] });
  });
  return produ !== null ? (
    <ProductContex.Provider value={{ pushNullSizesToArr }}>
      {children}
    </ProductContex.Provider>
  ) : (
    <h1>Loading</h1>
  );
};

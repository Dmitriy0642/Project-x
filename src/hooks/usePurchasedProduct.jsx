import React, { useContext } from "react";
import orderService from "../services/orders.service";

const PurchasedContext = React.createContext();

export const usePurchased = () => {
  return useContext(PurchasedContext);
};

const PurchasedProvider = ({ children }) => {
  async function createOrder(payload) {
    try {
      const { data } = await orderService.create(payload, {
        payload,
      });
      return data;
    } catch (error) {
      console.log("Error");
    }
  }

  async function getPurchasedProduct() {
    try {
      const data = orderService.getPurchasedProd();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function createPurchasedProduct(prod) {
    try {
      const { data } = orderService.createPurchasedProd({
        prod,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  async function getItemFromBascet() {
    try {
      const data = orderService.getBascetPurchases();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PurchasedContext.Provider
      value={{
        createOrder,
        getPurchasedProduct,
        createPurchasedProduct,
        getItemFromBascet,
      }}
    >
      {children}
    </PurchasedContext.Provider>
  );
};

export default PurchasedProvider;

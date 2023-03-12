import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import config from "../config.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import httpService from "../services/http.service";
const ApiContext = React.createContext();

export const useApi = () => {
  return useContext(ApiContext);
};

export const ApiProvider = ({ children }) => {
  const [prod, setProd] = useState(null);
  const [firmCategory, setFirmCategory] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await httpService.get(
          `${config.ApiEndPOint}` + `.json`
        );
        const { category, product } = data;
        setFirmCategory(Object.keys(category).map((item) => category[item]));
        setProd(Object.keys(product).map((item) => product[item]));
      } catch (error) {
        console.log(error);
        toast.error("Включите Впн");
      }
    };
    getData();
  }, []);
  return prod !== null || firmCategory !== null ? (
    <ApiContext.Provider value={{ prod: prod, firmCategory: firmCategory }}>
      {children}
    </ApiContext.Provider>
  ) : (
    <h1></h1>
  );
};

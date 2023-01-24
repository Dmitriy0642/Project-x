import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import config from "../config.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApiContext = React.createContext();

export const ApiProv = () => {
  return useContext(ApiContext);
};

const UseApi = () => {
  const [prod, setProd] = useState(null);
  const [categ, setCateg] = useState(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${config.ApiEndPOint}` + `.json`);
        const { category, product } = data;
        setCateg(Object.keys(category).map((item) => category[item]));
        setProd(Object.keys(product).map((item) => product[item]));
      } catch {
        toast.error("Включите Впн");
      }
    };
    getData();
  }, []);
  return (
    <ApiContext.Provider
      value={{ product: prod, category: categ }}
    ></ApiContext.Provider>
  );
};

export default UseApi;

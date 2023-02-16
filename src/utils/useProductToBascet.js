import config from "../config.json";
import axios from "axios";
import { useEffect } from "react";

const useProductbascet = () => {
  useEffect(() => {
    const getAllData = async () => {
      const { data } = await axios.get(`${config.ApiEndPOint}` + `.json`);
      const { product } = data;
      const arrayObject = Object.keys(product).map((item) => product[item]);
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
      const dataToFormat = JSON.stringify(pushNullSizesToArr);
      const dataSizes = JSON.stringify(remakeSizes);
      const initialSizesFromDb = JSON.stringify(allSizes);
      if (localStorage.length === 0) {
        localStorage.setItem("InitialSizes", initialSizesFromDb);
        localStorage.setItem("AllData", dataToFormat);
        localStorage.setItem("AllSizes", dataSizes);
      }
    };
    getAllData();
  }, []);
};

export default useProductbascet;
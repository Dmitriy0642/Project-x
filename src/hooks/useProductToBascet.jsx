import config from "../config.json";
import axios from "axios";
import { useEffect, useState } from "react";

const useProductbascet = () => {
  const [dataWithNullValue, setDataNullValue] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [primarySizess, setRemakeSizes] = useState(null);
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

      if (
        localStorage.getItem("AllData") === null ||
        JSON.parse(localStorage.getItem("AllData").length === 0)
      ) {
        const formatingRemakeData = JSON.stringify(pushNullSizesToArr);
        localStorage.setItem("AllData", formatingRemakeData);
      }
      if (localStorage.getItem("InitialSizes") === null) {
        const initialSizes = JSON.stringify(allSizes);
        localStorage.setItem("InitialSizes", initialSizes);
      }
      if (localStorage.getItem("RemakeSizes") === null) {
        const sizesCountValueZero = JSON.stringify(remakeSizes);
        localStorage.setItem("RemakeSizes", sizesCountValueZero);
      }
    };
    getAllData();
  }, []);
};

export default useProductbascet;

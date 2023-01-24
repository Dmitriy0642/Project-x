import axios from "axios";
import { useEffect } from "react";
import config from "../config.json";

const UseApi = () => {
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`${config.ApiEndPOint}` + `.json`);
        const { category, product } = data;
      } catch {}
    };
    getData();
  }, []);
};

export default UseApi;

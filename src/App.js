import React, { useEffect } from "react";
import Header from "./ui/header";
import Catalog from "./ui/catalog";
import { ToastContainer } from "react-toastify";
import { ApiProvider, useApi } from "./hooks/useApi";
import { Switch, Route } from "react-router-dom";
import ReviewFormCatalog from "./common/reviewFormCatalog";
import ReviewCardProduct from "./common/reviewCardProduct";
import config from "../src/config.json";
import axios, { all } from "axios";
function App() {
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
      localStorage.setItem("AllData", dataToFormat);
    };
    getAllData();
  }, []);
  return (
    <div>
      <Header />
      <ApiProvider>
        <Switch>
          <Route path="/:name/:postId" component={ReviewCardProduct} />
          <Route path="/" exact component={Catalog} />
          <Route path="/:name" component={ReviewFormCatalog} />
        </Switch>
      </ApiProvider>
      <ToastContainer />
    </div>
  );
}

export default App;

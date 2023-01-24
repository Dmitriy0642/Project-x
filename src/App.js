import { Switch } from "react-router-dom";
import React from "react";
import Header from "./ui/header";
import Catalog from "./ui/catalog";
import UseApi from "./hooks/useApi";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <Header />
      <Catalog />
      <UseApi />
      <ToastContainer />
    </div>
  );
}

export default App;

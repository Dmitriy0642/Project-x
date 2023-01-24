import { Switch } from "react-router-dom";
import React from "react";
import Header from "./ui/header";
import Catalog from "./ui/catalog";
import { ToastContainer } from "react-toastify";
import { ApiProvider } from "./hooks/useApi";
function App() {
  return (
    <div>
      <Header />
      <ApiProvider>
        <Catalog />
      </ApiProvider>
      <ToastContainer />
    </div>
  );
}

export default App;

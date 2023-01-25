import React from "react";
import Header from "./ui/header";
import Catalog from "./ui/catalog";
import { ToastContainer } from "react-toastify";
import { ApiProvider } from "./hooks/useApi";
import { Switch, Route } from "react-router-dom";
import ReviewFormCatalog from "./common/reviewFormCatalog";
function App() {
  return (
    <div>
      <Header />
      <ApiProvider>
        <Switch>
          <Route path="/" exact component={Catalog} />
          <Route path="/:name" component={ReviewFormCatalog} />
        </Switch>
      </ApiProvider>
      <ToastContainer />
    </div>
  );
}

export default App;

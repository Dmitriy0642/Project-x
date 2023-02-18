import React from "react";
import Header from "./ui/header";
import Catalog from "./ui/catalog";
import { ToastContainer } from "react-toastify";
import { ApiProvider } from "./hooks/useApi";
import { Switch, Route } from "react-router-dom";
import ReviewFormCatalog from "./common/reviewFormCatalog";
import ReviewCardProduct from "./common/reviewCardProduct";
import useProductbascet from "./functions/useProductToBascet";
import Bascet from "./layouts/bascet";
import LoginForm from "./forms/loginForm";
function App() {
  useProductbascet();
  return (
    <div>
      <Header />
      <ApiProvider>
        <Switch>
          <Route path="/:name/:postId" component={ReviewCardProduct} />
          <Route path="/login" component={LoginForm} />
          <Route path="/basket" component={Bascet} />
          <Route path="/" exact component={Catalog} />
          <Route path="/:name" component={ReviewFormCatalog} />
        </Switch>
      </ApiProvider>
      <ToastContainer />
    </div>
  );
}

export default App;

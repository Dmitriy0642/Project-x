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
import Login from "./layouts/login";
import Order from "./layouts/order";
import AuthProvider from "./hooks/useAuth";

function App() {
  useProductbascet();
  return (
    <div>
      <AuthProvider>
        <Header />
        <ApiProvider>
          <Switch>
            <Route path="/basket" component={Bascet} />
            <Route path="/order" component={Order} />
            <Route path="/:name/:postId" component={ReviewCardProduct} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/:name" component={ReviewFormCatalog} />
            <Route path="/" component={Catalog} />
          </Switch>
        </ApiProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  );
}

export default App;

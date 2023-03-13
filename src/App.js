import React from "react";
import Header from "./ui/header";
import Catalog from "./ui/catalog";
import { ToastContainer } from "react-toastify";
import { ApiProvider } from "./hooks/useApi";
import { Switch, Route } from "react-router-dom";
import ReviewFormCatalog from "./common/reviewFormCatalog";
import ReviewCardProduct from "./common/reviewCardProduct";
import Bascet from "./layouts/bascet";
import Login from "./layouts/login";
import Order from "./layouts/order";
import AuthProvider from "./hooks/useAuth";
import LogOut from "./layouts/logOut";
import PersonalArea from "./ui/personalArea";
import PurchasedProvider from "./hooks/usePurchasedProduct";

function App() {
  return (
    <div>
      <PurchasedProvider>
        <AuthProvider>
          <Header />
          <ApiProvider>
            <Switch>
              <Route path="/logout" component={LogOut} />
              <Route path="/profile" component={PersonalArea} />
              <Route path="/basket" component={Bascet} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/:name/:postId" component={ReviewCardProduct} />
              <Route path="/order" component={Order} />
              <Route path="/:name" component={ReviewFormCatalog} />
              <Route path="/" component={Catalog} />
            </Switch>
          </ApiProvider>
        </AuthProvider>
        <ToastContainer />
      </PurchasedProvider>
    </div>
  );
}

export default App;

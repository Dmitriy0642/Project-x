import React, { useEffect } from "react";
import Header from "./ui/header";
import Catalog from "./ui/catalog";
import { ToastContainer } from "react-toastify";
import { Switch, Route } from "react-router-dom";
import ReviewFormCatalog from "./common/reviewFormCatalog";
import ReviewCardProduct from "./common/reviewCardProduct";
import Bascet from "./layouts/page/bascet";
import Login from "./layouts/page/login";
import Order from "./layouts/page/order";
import LogOut from "./ui/logOut";
import AdminPanel from "./layouts/page/adminPanel";
import { useDispatch } from "react-redux";
import { loadChangeProductList } from "./store/changeProduct";
import { loadProductList } from "./store/product";
import { loadListCategory } from "./store/categoryOfProduct";
import { loadUsersList } from "./store/users";
import { loadListPurchased } from "./store/purchasedProduct";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadChangeProductList());
    dispatch(loadProductList());
    dispatch(loadListCategory());
    dispatch(loadUsersList());
    dispatch(loadListPurchased());
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route path="/logout" component={LogOut} />
        <Route exact path="/adminPage/:other?" component={AdminPanel} />
        <Route path="/basket" component={Bascet} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/:name/:postId" component={ReviewCardProduct} />
        <Route path="/order" component={Order} />
        <Route path="/:name" component={ReviewFormCatalog} />
        <Route path="/" component={Catalog} />
      </Switch>
      <ToastContainer />
    </div>
  );
}

export default App;

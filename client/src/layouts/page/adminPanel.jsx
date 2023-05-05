import React from "react";
import styles from "../layouts.styles/personalArea.module.css";
import { Link, useParams } from "react-router-dom";
import AddNewProduct from "../adminPages/addNewProduct";
import PurchasedProduct from "../adminPages/purchasedProduct";
import DeleteProduct from "../adminPages/deleteProduct";
import ChangeProduct from "../adminPages/changeProduct";
import { getCurrentUsers } from "../../store/users";
import { useSelector } from "react-redux";
const AdminPanel = () => {
  const getCurrentUser = useSelector(getCurrentUsers());
  const { other } = useParams();
  function checkedSatus() {
    if (getCurrentUser !== null) {
      if (getCurrentUser.email === "test@example.ru") {
        return true;
      }
      return false;
    }
  }
  if (checkedSatus()) {
    if (other === "addNewProduct") {
      return <AddNewProduct />;
    }
    if (other === "purchasedItem") {
      return <PurchasedProduct />;
    }
    if (other === "delete") {
      return <DeleteProduct />;
    }
    if (other === "changeQuantity") {
      return <ChangeProduct />;
    }

    return (
      <div className={styles.container}>
        <div className={styles.first_under_block}>
          <Link to="/adminPage/addNewProduct">
            <div className={styles.added_new_product}>
              <h2 className={styles.title}>Добавить товар</h2>
            </div>
          </Link>
          <Link to="/adminPage/purchasedItem">
            <div className={styles.history_purchased}>
              <h2 className={styles.title}>История покупок</h2>
            </div>
          </Link>
        </div>
        <div className={styles.second_under_block}>
          <Link to="/adminPage/delete">
            <div className={styles.delete_procut}>
              <h2 className={styles.title}>Удаление товара</h2>
            </div>
          </Link>
          <Link to="/adminPage/changeQuantity">
            <div className={styles.chage_product}>
              <h2 className={styles.title}>Добавить размер</h2>
            </div>
          </Link>
        </div>
      </div>
    );
  }
};

export default AdminPanel;

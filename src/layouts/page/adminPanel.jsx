import React from "react";
import styles from "../layouts.styles/personalArea.module.css";
import { Link, useParams } from "react-router-dom";
const AdminPanel = () => {
  const other = useParams();
  console.log(other);
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
        <Link to="/adminPage/deleteProduct">
          <div className={styles.delete_procut}>
            <h2 className={styles.title}>Удаление товара</h2>
          </div>
        </Link>
        <Link to="/adminPage/changeProduct">
          <div className={styles.chage_product}>
            <h2 className={styles.title}>Редактировать товар</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminPanel;

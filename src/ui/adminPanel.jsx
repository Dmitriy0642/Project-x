import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUsers } from "../store/users";
import styles from "../ui.styles/personalArea.module.css";
const AdminPanel = () => {
  const currentUser = useSelector(getCurrentUsers());
  return (
    <div className={styles.container}>
      <h1 className={styles.logo_personalArea}>Панель Администратора</h1>
      <div className={styles.second_block}>
        <div className={styles.third_block}>
          <h1 className={styles.title_name}>Email</h1>
          <h2 className={styles.title_name}>{currentUser.email}</h2>
        </div>
        <div className={styles.third_block}>
          <h1 className={styles.title_name}>Ваше Имя</h1>
          <h2 className={styles.title_name}>{currentUser.fio}</h2>
        </div>
        <div className={styles.third_block}>
          <h2 className={styles.title_name}>Номер телефона</h2>
          <h2 className={styles.title_name}>{currentUser.numtel}</h2>
        </div>
        <div className={styles.third_block}>
          <h2 className={styles.title_name}>Купленно товаров</h2>
          <h2 className={styles.title_name}>{}</h2>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;

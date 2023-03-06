import React from "react";
import styles from "../ui.styles/notBascet.module.css";
const NotBascet = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title_notbascet}>
        На данный момент ,корзина пуста
      </h2>
    </div>
  );
};

export default NotBascet;

import React, { useEffect, useState } from "react";
import styles from "../layouts.styles/purchase.module.css";
import { useSelector } from "react-redux";
import { getPurchased } from "../../store/purchasedProduct";
const PurchasedProduct = () => {
  const [amount, setAmount] = useState(0);
  const data = useSelector(getPurchased());

  useEffect(() => {
    if (data !== null) {
      data.map((item) => {
        item.quantity.forEach((quan) => {
          setAmount(
            (prevState) => (prevState += Number(item.price) * quan.value)
          );
        });
      });
    }
  }, [data]);

  return data !== null ? (
    <div className={styles.container}>
      <h2 className={styles.countAmount}>
      Summ saled product : {amount}$
      </h2>
      <h2 className={styles.title}>Sales product</h2>
      <div className={styles.block}>
        {data.map((item) => (
          <div key={item._id} className={styles.item_block}>
            <img src={item.img[0]} className={styles.img} />
            <div className={styles.info_about_product}>
              <h2 className={styles.under_titile}>Name product</h2>
              <h2 className={styles.info_title}>{item.name}</h2>
            </div>
            <div className={styles.main_block_sizes}>
              <h2 className={styles.titile_sizes}>Saled sizes</h2>
              {item.quantity.map((quan) => (
                <div className={styles.block_sizes} key={quan.size}>
                  <button className={styles.button_sizes}>
                    {quan.size}({quan.value})
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <h2>Loading</h2>
  );
};

export default PurchasedProduct;

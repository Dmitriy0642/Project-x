import React, { useEffect, useState } from "react";
import productSerivce from "../../services/product.service";
import styles from "../layouts.styles/purchase.module.css";
import { useSelector } from "react-redux";
import { getPurchased } from "../../store/purchasedProduct";
const PurchasedProduct = () => {
  const [salesProduct, setSalesProduct] = useState();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    productSerivce
      .getSalesProduct()
      .then((res) => {
        setSalesProduct(res);
        res.map((item) => {
          item.quantity.forEach((quan) => {
            setAmount((prevState) => (prevState += item.price * quan.value));
          });
        });
      })
      .catch((error) => error.message);
  }, []);
  console.log(amount);
  return salesProduct !== undefined ? (
    <div className={styles.container}>
      <h2 className={styles.countAmount}>
        Общая сумма проданых товаров : {amount}$
      </h2>
      <h2 className={styles.title}>Проданные товары</h2>
      <div className={styles.block}>
        {salesProduct.map((item) => (
          <div key={item._id} className={styles.item_block}>
            <img src={item.img[0]} className={styles.img} />
            <div className={styles.info_about_product}>
              <h2 className={styles.under_titile}>Название товара</h2>
              <h2 className={styles.info_title}>{item.name}</h2>
            </div>
            <div className={styles.main_block_sizes}>
              <h2 className={styles.titile_sizes}>Купленные размеры</h2>
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
    <h1>Loading...</h1>
  );
};

export default PurchasedProduct;

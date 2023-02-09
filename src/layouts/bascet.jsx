import React, { useEffect, useState } from "react";
import styles from "./layouts.styles/bascet.module.css";
import Counter from "./counter";

const Bascet = () => {
  const [amount, setAmount] = useState(0);
  const getDataFromLs = localStorage.getItem("AllData");
  const parseDataToFormat = JSON.parse(getDataFromLs);
  const filterData = parseDataToFormat.filter((item) => {
    let cheked = false;
    item.quantity.forEach((elem) => {
      if (elem.value > 0) {
        cheked = true;
      }
    });
    if (cheked) {
      return item;
    }
  });
  useEffect(() => {
    filterData.map((item) => {
      item.quantity.forEach((quan) => {
        setAmount((prevState) => (prevState += item.price * quan.value));
      });
    });
  }, []);
  const handleDecrementAmount = (price) => {
    setAmount((prevState) => (prevState += price));
  };
  const handleIncrementAmount = (price) => {
    setAmount((prevState) => (prevState -= price));
  };

  return filterData.length <= 0 ? (
    <h2>Корзина Пуста</h2>
  ) : (
    <div className={styles.main_div}>
      <h2 className={styles.countAmount}>{amount}</h2>
      {filterData.map((item) => (
        <div className={styles.product_div} key={item._id}>
          <img src={item.img[0]} alt="" className={styles.img_product} />
          <div className={styles.first_div}>
            <h2 className={styles.title_product}>Имя продукта</h2>
            <h2 className={styles.title_review}>{item.name}</h2>
          </div>
          <div className={styles.second_div}>
            <h2 className={styles.title_product}>Цена товара</h2>
            <h2 className={styles.title_review}>{item.price}$</h2>
          </div>
          <div className={styles.third_block}>
            <h2 className={styles.title_product}>Размеры товара</h2>
            {
              <Counter
                data={item}
                quantity={item.quantity}
                key={item._id}
                handleDecrementAmount={handleDecrementAmount}
                handleIncrementAmount={handleIncrementAmount}
              />
            }
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bascet;

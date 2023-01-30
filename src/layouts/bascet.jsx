import React from "react";
import styles from "./layouts.styles/bascet.module.css";
const Bascet = () => {
  const getDataFromLs = localStorage.getItem("AllData");
  const parseDataToFormat = JSON.parse(getDataFromLs);
  const objData = parseDataToFormat.map((item) => {
    return item.quantity;
  });
  const filterData = [];
  objData.forEach((item, index) => {
    let checked = 0;
    item.forEach((item) => {
      if (item.value > 0) {
        checked += 1;
      }
    });
    if (checked > 0) {
      filterData.push(parseDataToFormat[index]);
    }
  });

  return (
    <div className={styles.main_div}>
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
            {item.quantity.map((quan) => (
              <div className={styles.button_block} key={quan.size}>
                <button className={styles.button_sizes}>
                  {quan.size}({quan.value})
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bascet;

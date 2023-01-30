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
  console.log(filterData);
  return (
    <div className={styles.main_div}>
      {filterData.map((item) => (
        <div className={styles.product_div} key={item._id}>
          <img src={item.img[0]} alt="" className={styles.img_product} />
        </div>
      ))}
    </div>
  );
};

export default Bascet;

import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./layouts.styles/bascet.module.css";

const Counter = ({ data, quantity }) => {
  const getDataWithLs = localStorage.getItem("AllData");
  const parseDataToFormat = JSON.parse(getDataWithLs);
  const [countDec, setCountDec] = useState();
  const [countInc, setCountInc] = useState();

  const handleDecrement = (e) => {
    const filtradeQuan = quantity.filter(
      (item) => `${item.size}` === `${e.target.id}`
    );

    const getObjQuan = filtradeQuan[0];
    setCountDec(getObjQuan);
    if (getObjQuan.value <= 0) {
      getObjQuan.value += 1;
      if (getObjQuan.value <= 1) {
        toast.error("Вы выбрали последний размер данного товара");
      }
    }

    const newData = {
      _id: data._id,
      firm: data.category,
      img: [data.img[0], data.img[1]],
      price: data.price,
      category: data.category,
      name: data.name,
      quantity: quantity,
    };
    const pushDataToLs = parseDataToFormat.map((item) => {
      if (item._id === newData._id) {
        return newData;
      }
      return item;
    });
    localStorage.setItem("AllData", JSON.stringify(pushDataToLs));
  };
  const handleIncrement = (e) => {
    const filtradeQuan = quantity.filter(
      (item) => `${item.size}` === `${e.target.id}`
    );

    const getObjQuan = filtradeQuan[0];
    setCountInc(getObjQuan);
    if (getObjQuan.value === 1) {
      getObjQuan.value -= 1;
      if (getObjQuan.value < 0) {
      }
    }

    const newData = {
      _id: data._id,
      firm: data.category,
      img: [data.img[0], data.img[1]],
      price: data.price,
      category: data.category,
      name: data.name,
      quantity: quantity,
    };
    console.log(newData);
    const pushDataToLs = parseDataToFormat.map((item) => {
      if (item._id === newData._id) {
        return newData;
      }
      return item;
    });
    localStorage.setItem("AllData", JSON.stringify(pushDataToLs));
  };
  return (
    <>
      {quantity.map((quan) => (
        <div className={styles.button_block} key={quan.size}>
          <button
            id={quan.size}
            className={styles.button_selected_value}
            onClick={handleDecrement}
          >
            +
          </button>

          <button className={styles.button_sizes}>
            {quan.size}({quan.value})
          </button>

          <button
            id={quan.size}
            className={styles.button_selected_value}
            onClick={handleIncrement}
          >
            -
          </button>
        </div>
      ))}
    </>
  );
};

export default Counter;

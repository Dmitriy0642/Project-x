import React, { useState } from "react";
import styles from "./layouts.styles/bascet.module.css";
import servicesBascet from "../utils/bascetServices";
import { logDOM } from "@testing-library/react";

const Counter = ({
  data,
  quantity,
  handleDecrementAmount,
  handleIncrementAmount,
}) => {
  const [countDec, setCountInc] = useState();
  const [countInc, setCountDec] = useState();

  const getDataLocalStorageDb = localStorage.getItem("InitialSizes");
  const toFormatDataFromLs = JSON.parse(getDataLocalStorageDb);
  const getDataLocalStorageAllData = localStorage.getItem("AllData");
  const toForamatDataFromLsProduct = JSON.parse(getDataLocalStorageAllData);

  const handleIncrement = (e) => {
    ///filtrade data from quantity
    const filtradeSelectedQuan = quantity.filter(
      (item) => `${item.size}` === `${e.target.id}`
    );

    ///Filtrade quantity from Db
    const filteredQuanFromDbArray = [];
    const filterSelectedProduct = toForamatDataFromLsProduct.map(
      (item, index) => {
        if (item._id === data._id) {
          filteredQuanFromDbArray.push(toFormatDataFromLs[index]);
        }
      }
    );

    const filteredQuan = filteredQuanFromDbArray[0].filter(
      (item) => `${item.size}` === `${e.target.id}`
    );

    if (filteredQuan[0].value > filtradeSelectedQuan[0].value) {
      handleIncrementAmount(data.price);
    }
    servicesBascet.increment(quantity, e, setCountInc, data);
  };

  const handleDecrement = (e) => {
    const filtradeSelectedQuan = quantity.filter(
      (item) => `${item.size}` === `${e.target.id}`
    );

    ///Filtrade quantity from Db
    const filteredQuanFromDbArray = [];
    const filterSelectedProduct = toForamatDataFromLsProduct.map(
      (item, index) => {
        if (item._id === data._id) {
          filteredQuanFromDbArray.push(toFormatDataFromLs[index]);
        }
      }
    );

    const filteredQuan = filteredQuanFromDbArray[0].filter(
      (item) => `${item.size}` === `${e.target.id}`
    );

    if (filteredQuan[0].value === filtradeSelectedQuan[0].value) {
      handleDecrementAmount(data.price);
    }

    servicesBascet.decrement(quantity, e, setCountDec, data);
  };

  return (
    <>
      {quantity.map((quan) => (
        <div className={styles.button_block} key={quan.size}>
          <button
            id={quan.size}
            className={styles.button_selected_value}
            onClick={handleIncrement}
          >
            +
          </button>

          <button className={styles.button_sizes}>
            {quan.size}({quan.value})
          </button>

          <button
            id={quan.size}
            className={styles.button_selected_value}
            onClick={handleDecrement}
          >
            -
          </button>
        </div>
      ))}
    </>
  );
};

export default Counter;

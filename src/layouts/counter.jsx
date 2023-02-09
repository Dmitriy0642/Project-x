import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./layouts.styles/bascet.module.css";
import servicesBascet from "../utils/bascetServices";

const Counter = ({ data, quantity }) => {
  const getDataWithLs = localStorage.getItem("AllData");
  const parseDataToFormat = JSON.parse(getDataWithLs);
  const [countDec, setCountInc] = useState();
  const [countInc, setCountDec] = useState();

  const handleIncrement = (e) => {
    servicesBascet.increment(quantity, e, setCountInc, data);
  };
  const handleDecrement = (e) => {
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

import React, { useState } from "react";

import styles from "./layouts.styles/bascet.module.css";
import servicesBascet from "../utils/bascetServices";

const Counter = ({
  data,
  quantity,
  handleDecrementAmount,
  handleIncrementAmount,
}) => {
  const [countDec, setCountInc] = useState();
  const [countInc, setCountDec] = useState();

  const handleIncrement = (e) => {
    servicesBascet.increment(quantity, e, setCountInc, data);
    handleDecrementAmount(data.price);
  };
  const handleDecrement = (e) => {
    servicesBascet.decrement(quantity, e, setCountDec, data);
    handleIncrementAmount(data.price);
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

import React, { useEffect, useState } from "react";
import config from "../config.json";
import styles from "./layouts.styles/bascet.module.css";
import servicesBascet from "../utils/bascetServices";
import axios from "axios";

const Counter = ({
  data,
  quantity,
  handleDecrementAmount,
  handleIncrementAmount,
}) => {
  const [countDec, setCountInc] = useState();
  const [countInc, setCountDec] = useState();
  useEffect(() => {
    const getDataQuantity = async () => {
      const quantityDataDb = await axios.get(
        `${config.ApiEndPOint}` + `product/${data._id}` + `/quantity` + `.json`
      );
      const { quantDb } = data;
    };
    getDataQuantity();
  }, []);
  const handleIncrement = (e) => {
    const { target } = e;
    servicesBascet.increment(quantity, e, setCountInc, data);
    const filterQuantity = data.quantity.filter(
      (item) => item.size === target.id
    );
    console.log(target.id);
    console.log(filterQuantity[0]);
    handleIncrementAmount(data.price);
  };
  const handleDecrement = (e) => {
    servicesBascet.decrement(quantity, e, setCountDec, data);
    const filtradeQuan = quantity.filter(
      (item) => `${item.size}` === `${e.target.id}`
    );

    handleDecrementAmount(data.price);
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

import React, { useState } from "react";
import styles from "../layouts.styles/bascet.module.css";
import servicesBascet from "../../utils/bascetServices";
import bascetService from "../../services/bascet.service";

const Counter = ({
  data,
  quantity,
  handleDecrementAmount,
  handleIncrementAmount,
  initProduct,
}) => {
  const [countDec, setCountInc] = useState();
  const [countInc, setCountDec] = useState();

  const handleDelete = async (e) => {
    await bascetService.deleteProductInBascet(e.target.id);
    window.location.reload();
  };

  const handleIncrement = (e) => {
    ///filtrade data from quantity
    const filterQuantityFromData = quantity.filter(
      (item) => `${item.size}` === `${e.target.id}`
    );
    ///getting data from database with db sizes and values

    const dataFromDb = initProduct.filter((item) => item._id === data._id);

    const getQuantityFromDb = dataFromDb[0].quantity.filter(
      (item) => `${item.size}` === `${e.target.id}`
    );
    if (filterQuantityFromData[0].value < getQuantityFromDb[0].value) {
      handleIncrementAmount(data.price);
    }

    servicesBascet.increment(quantity, e, setCountInc, data, initProduct);
  };

  const handleDecrement = (e) => {
    ///filtrade data from quantity
    const filterQuantityFromData = quantity.filter(
      (item) => `${item.size}` === `${e.target.id}`
    );
    ///getting data from database with db sizes and values

    const dataFromDb = initProduct.filter((item) => item._id === data._id);
    const getQuantityFromDb = dataFromDb[0].quantity.filter(
      (item) => `${item.size}` === `${e.target.id}`
    );

    if (
      filterQuantityFromData[0].value === getQuantityFromDb[0].value ||
      filterQuantityFromData[0].value < getQuantityFromDb[0].value
    ) {
      if (filterQuantityFromData[0].value > 0) {
        handleDecrementAmount(data.price);
      }
    }

    servicesBascet.decrement(quantity, e, setCountDec, data, initProduct);
  };

  return initProduct === undefined ? (
    <h2>Loading</h2>
  ) : (
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
      <div className={styles.button_delete_block}>
        <button
          className={styles.button_delete}
          onClick={handleDelete}
          id={data._id}
        >
          Удалить товар
        </button>
      </div>
    </>
  );
};

export default Counter;

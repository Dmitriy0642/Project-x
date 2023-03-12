import React, { useEffect, useState } from "react";
import styles from "./layouts.styles/bascet.module.css";
import servicesBascet from "../utils/bascetServices";
import { useApi } from "../hooks/useApi";
import orderService from "../services/orders.service";
const Counter = ({
  data,
  quantity,
  handleDecrementAmount,
  handleIncrementAmount,
}) => {
  const [countDec, setCountInc] = useState();
  const [countInc, setCountDec] = useState();
  const [initProduct, setInitProduct] = useState();
  const { prod } = useApi();
  const initialDataFromDb = orderService.getInitiProduct();

  useEffect(() => {
    initialDataFromDb.then((res) => {
      const dataFormat = Object.keys(res).map((item) => res[item]);
      setInitProduct(dataFormat);
    });
  }, []);

  const handleIncrement = (e) => {
    ///filtrade data from quantity
    const filtradeSelectedItem = quantity.filter(
      (item) => `${item.size}` === `${e.target.id}`
    );

    // new method
    const filteredProductArr = [];
    prod.map((item, index) => {
      if (item._id === data._id) {
        filteredProductArr.push(prod[index]);
      }
    });

    const quantitySelectedProd = filteredProductArr[0].quantity;

    const filteredSelectedQuan = quantitySelectedProd.filter(
      (item) => `${item.size}` === `${e.target.id}`
    );

    if (filteredSelectedQuan[0].value > filtradeSelectedItem[0].value) {
      handleIncrementAmount(data.price);
    }

    servicesBascet.increment(quantity, e, setCountInc, data, initProduct);
  };

  const handleDecrement = (e) => {
    const filtradeSelectedQuan = quantity.filter(
      (item) => `${item.size}` === `${e.target.id}`
    );

    ///Filtrade quantity from Db
    const filteredProductArr = [];
    prod.map((item, index) => {
      if (item._id === data._id) {
        filteredProductArr.push(prod[index]);
      }
    });
    const filterProdcut = filteredProductArr[0].quantity;
    const filteredQuan = filterProdcut.filter(
      (item) => `${item.size}` === `${e.target.id}`
    );

    if (filteredQuan[0].value === filtradeSelectedQuan[0].value) {
      handleDecrementAmount(data.price);
    }

    servicesBascet.decrement(quantity, e, setCountDec, data, initProduct);
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

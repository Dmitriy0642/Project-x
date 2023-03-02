import React, { useEffect, useState } from "react";
import styles from "./layouts.styles/bascet.module.css";
import Counter from "./counter";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import userService from "../services/user.service";
import axios from "axios";

const Bascet = () => {
  const { currentUser } = useAuth();
  const history = useHistory();
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
  const handleIncrementAmount = (price) => {
    setAmount((prevState) => (prevState += price));
  };
  const handleDecrementAmount = (price) => {
    setAmount((prevState) => (prevState -= price));
  };

  async function overWriting(balance) {
    try {
      const data = await userService.getRefreshUser(balance);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleClick = () => {
    if (currentUser === undefined || currentUser === null) {
      toast.error("Вам необходимо зарегестрироваться");
    } else if (currentUser.balance < amount) {
      toast.error("Сумма заказа превышает баланс");
    }

    if (currentUser.balance >= amount) {
      const remainingBalacne = currentUser.balance - amount;
      overWriting(remainingBalacne);
      history.push("/order");
    }
  };

  return filterData.length <= 0 ? (
    <h2>Корзина Пуста</h2>
  ) : (
    <div className={styles.main_div}>
      <h2 className={styles.countAmount}>
        Общая стоимость товара в корзине : {amount}$
      </h2>
      <h2 className={styles.balance_title}>
        Ваш Баланс : {currentUser.balance}$
      </h2>
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
      <div className={styles.block_finish_order}>
        <button
          className={styles.button_added_finish_order}
          onClick={handleClick}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export default Bascet;

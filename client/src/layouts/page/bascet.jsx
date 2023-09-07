import React, { useEffect, useState } from "react";
import styles from "../layouts.styles/bascet.module.css";
import Counter from "./counter";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import userService from "../../services/user.service";
import NotBascet from "../../ui/notBascet";
import { useSelector } from "react-redux";
import { getCurrentUsers } from "../../store/users";
import bascetService from "../../services/bascet.service";
import productSerivce from "../../services/product.service";

const Bascet = () => {
  const currentUser = useSelector(getCurrentUsers());
  const itemFrobBascet = bascetService.getBascetData();
  const history = useHistory();
  const [amount, setAmount] = useState(0);
  const [acceptDatafromBascet, setAcceptedData] = useState();
  const [initProduct, setInitProduct] = useState();
  const initialDataFromDb = productSerivce.getAllProduct();
  useEffect(() => {
    itemFrobBascet
      .then((res) => {
        const toFormat = Object.keys(res).map((item) => res[item]);
        setAcceptedData(toFormat);
        toFormat.map((item) => {
          item.quantity.forEach((quan) => {
            setAmount(
              (prevState) => (prevState += Number(item.price) * quan.value)
            );
          });
        });
      })
      .catch((error) => error.message);
    initialDataFromDb
      .then((res) => {
        const dataFormat = Object.keys(res).map((item) => res[item]);
        setInitProduct(dataFormat);
      })
      .catch((error) => error.message);
  }, []);

  const handleIncrementAmount = (price) => {
    setAmount((prevState) => (prevState += Number(price)));
  };
  const handleDecrementAmount = (price) => {
    setAmount((prevState) => (prevState -= Number(price)));
  };
  async function overWriting(balance) {
    try {
      const data = await userService.getRefreshUser(balance);
      return data;
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
  return acceptDatafromBascet === undefined ||
    initProduct === undefined ||
    acceptDatafromBascet.length === 0 ? (
    <NotBascet />
  ) : (
    <div className={styles.main_div}>
      <h2 className={styles.countAmount}>
      Price of products in basket : {amount}$
      </h2>
      <h2 className={styles.balance_title}>
        Your balance : {currentUser ? currentUser.balance : 0}$
      </h2>
      {acceptDatafromBascet.map((item) => (
        <div className={styles.product_div} key={item._id}>
          <img src={item.img[0]} alt="" className={styles.img_product} />
          <div className={styles.first_div}>
            <h2 className={styles.title_product}>Name product</h2>
            <h2 className={styles.title_review}>{item.name}</h2>
          </div>
          <div className={styles.second_div}>
            <h2 className={styles.title_product}>Price product</h2>
            <h2 className={styles.title_review}>{item.price}$</h2>
          </div>
          <div className={styles.third_block}>
            <h2 className={styles.title_product}>Sizes</h2>
            {
              <Counter
                initProduct={initProduct}
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
          Order products
        </button>
      </div>
    </div>
  );
};

export default Bascet;

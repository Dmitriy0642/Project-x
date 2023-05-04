import React, { useState } from "react";
import styles from "../common/styles.common/reviewCardForm.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  changeProductQuantity,
  getProductNullVal,
} from "../store/changeProduct";
import { getCurrentUsers } from "../store/users";

const ReviewCardForm = ({ name, price, _id, quantity, obj }) => {
  const currentUser = useSelector(getCurrentUsers());
  const changeProduct = useSelector(getProductNullVal());
  const dispatch = useDispatch();
  const [size, setSize] = useState(null);

  const handleClick = (e) => {
    setSize(e.target.innerText);
  };
  const isValid = currentUser !== null;

  if (isValid === false) {
    toast.error("Чтобы добавить товар вам необходимо зарегестрироваться");
  }

  const handleSelect = () => {
    if (size === null) {
      toast.error("Размер не выбран");
    } else if (size) {
      dispatch(changeProductQuantity(changeProduct, obj, size));
    }
  };

  return (
    <div className={styles.form}>
      <h2 className={styles.title_form}>Параметры Товара</h2>
      <h2 className={styles.form_category}>{`Имя товара : ${name}`}</h2>
      <h2 className={styles.form_category}>{`Цена товара : ${price}$`}</h2>
      <h2 className={styles.form_category}>{`Уникальный номер : ${_id}$`}</h2>
      <h2 className={styles.form_category_change_size}>Выберите размер</h2>
      <div className={styles.button_block}>
        {quantity.map((item) => (
          <button
            onClick={handleClick}
            key={item.size}
            className={
              size !== `${item.size}`
                ? styles.button_sizes_active
                : styles.button_sizes
            }
          >{`${item.size}`}</button>
        ))}
      </div>
      <button
        className={
          size === null ? styles.add_to_bascet : styles.add_to_bascet_disable
        }
        onClick={() => {
          handleSelect(obj[0]);
        }}
        disabled={!isValid}
      >
        Добавить в корзину
      </button>
    </div>
  );
};

export default ReviewCardForm;
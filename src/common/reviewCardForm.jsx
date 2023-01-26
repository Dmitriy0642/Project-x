import styles from "../common/styles.common/reviewCardForm.module.css";
const ReviewCardForm = ({ name, price, _id, quantity }) => {
  const handleClick = (e) => {
    const initSize = e.target.innerText;
  };
  return (
    <div className={styles.form}>
      <h2 className={styles.title_form}>Параметры Товара</h2>
      <h2 className={styles.form_category}>{`Имя товара:${name}`}</h2>
      <h2 className={styles.form_category}>{`Цена товара:${price}$`}</h2>
      <h2 className={styles.form_category}>{`Уникальный номер:${_id}$`}</h2>
      <div className={styles.button_block}>
        {quantity.map((item) => (
          <button
            onClick={handleClick}
            className={styles.button_sizes}
            key={item.size}
          >{`${item.size}`}</button>
        ))}
      </div>
    </div>
  );
};

export default ReviewCardForm;

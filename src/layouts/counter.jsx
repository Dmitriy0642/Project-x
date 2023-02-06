import styles from "./layouts.styles/bascet.module.css";

const Counter = ({ data, quantity }) => {
  const handleDecrement = (q) => {};

  const handleIncrement = () => {};
  return (
    <>
      {quantity.map((quan) => (
        <div className={styles.button_block} key={quan.size}>
          <button
            id={quan.size}
            className={styles.button_selected_value}
            onClick={handleDecrement}
          >
            +
          </button>

          <button className={styles.button_sizes}>
            {quan.size}({quan.value})
          </button>

          <button
            id={quan.size}
            className={styles.button_selected_value}
            onClick={() => {
              handleIncrement(quan.size);
            }}
          >
            -
          </button>
        </div>
      ))}
    </>
  );
};

export default Counter;

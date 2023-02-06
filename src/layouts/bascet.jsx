import React from "react";
import styles from "./layouts.styles/bascet.module.css";
const Bascet = () => {
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

  const handleDecrement = (e) => {
    console.log(e.target.id);
    // const newQuantity = dataObj.map((item) => {
    //   if (`${item.size}` === `${e.target.id}`) {
    //     return (item.value += 1);
    //   }
    //   return { size: item.size, value: item.value };
    // });
    // const pushDataToLs = parseDataToFormat.map((item) => {
    //   if (item._id === filterData[0]._id) {
    //     return filterData[0];
    //   }
    //   return item;
    // });
    // localStorage.setItem("AllData", JSON.stringify(pushDataToLs));
  };

  const handleIncrement = (_id) => {
    console.log(_id);
  };
  return (
    <div className={styles.main_div}>
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
          {console.log(item._id)}
          <div className={styles.third_block}>
            <h2 className={styles.title_product}>Размеры товара</h2>

            {item.quantity.map((quan) => (
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bascet;

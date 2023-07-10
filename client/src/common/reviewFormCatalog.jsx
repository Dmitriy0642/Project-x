import React from "react";
import { Link } from "react-router-dom";
import styles from "../common/styles.common/reviewFormCatalog.module.css";
import filterOnCategoryToProduct from "../functions/filterOnCategoryToProduct";
import { useSelector } from "react-redux";
import { getProduct } from "../store/product";
import { getCategory } from "../store/categoryOfProduct";

const ReviewFormCatalog = ({ match }) => {
  const url = match.url;
  const getNameCategory = match.params.name;
  const data = useSelector(getProduct());
  const firm = useSelector(getCategory());

  const filtradeData = filterOnCategoryToProduct(
    data,
    `${getNameCategory}`,
    firm
  );
  
  return filtradeData !== undefined ? (
    <div className={styles.wrapper}>
      {filtradeData.map((item) => (
        <div className={styles.card_product} key={item._id}>
          <Link to={`${url}/${item._id}`}>
            {<img src={item.img[0]} className={styles.card_img}></img>}
          </Link>
          <h2 className={styles.title_product}>{item.name}</h2>
        </div>
      ))}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default ReviewFormCatalog;

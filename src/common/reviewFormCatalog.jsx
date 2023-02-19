import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../common/styles.common/reviewFormCatalog.module.css";
import { useApi } from "../hooks/useApi";
import filterOnCategoryToProduct from "../functions/filterOnCategoryToProduct";

const ReviewFormCatalog = ({ match }) => {
  const url = match.url;
  const getNameCategory = match.params.name;
  const [filtradeData, setFiltradedata] = useState(null);
  const data = useApi();
  useEffect(() => {
    setFiltradedata(filterOnCategoryToProduct(data, `${getNameCategory}`));
  }, []);

  return filtradeData !== null ? (
    <div className={styles.wrapper}>
      {filtradeData.map((item) => (
        <div className={styles.card_product} key={item._id}>
          <Link to={`${url}/${item._id}`}>
            {<img src={item.img[0]} className={styles.card_img}></img>}
            <h2 className={styles.title_product}>{item.name}</h2>
          </Link>
        </div>
      ))}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
};

export default ReviewFormCatalog;

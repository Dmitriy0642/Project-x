import React from "react";
import logoSwetshirt from "../LogoCatalog/logoSwetshirt.jpg";
import { Link } from "react-router-dom";
import logoHoodies from "../LogoCatalog/logoHoodies.jpg";
import logoSocks from "../LogoCatalog/LogoSocks.jpg";
import logoTshirt from "../LogoCatalog/logoTshirt.jpg";
import logoShoes from "../LogoCatalog/logoShoes.jpg";
import styles from "../ui.styles/catalog.module.css";
import { useApi } from "../hooks/useApi";
import filterOnCategoryToProduct from "../functions/filterOnCategoryToProduct";
const Catalog = () => {
  const data = useApi();
  filterOnCategoryToProduct(data);
  return (
    <div className={styles.wrapper}>
      <Link to="/sweatshirt">
        <img src={logoSwetshirt} alt="" />
      </Link>
      <h2 className={styles.title}>Stone Island Swetshirt</h2>
      <div className={styles.second_block}>
        <div className={styles.block_Sneakers}>
          <Link to="/boots">
            <img src={logoShoes} alt="" className={styles.logo_img} />
          </Link>
          <h2 className={styles.title}>Sneakers</h2>
        </div>
        <div className={styles.block_hoodies}>
          <Link to="/hoodies">
            <img src={logoHoodies} alt="" className={styles.logo_img} />
          </Link>
          <h2 className={styles.title}>Hoodies</h2>
        </div>
      </div>
      <div className={styles.third_block}>
        <div className={styles.block_socks}>
          <Link to="/socks">
            <img src={logoSocks} alt="" className={styles.logo_img} />
          </Link>
          <h2 className={styles.title}>Socks</h2>
        </div>
        <div className={styles.block_tshorts}>
          <Link to="/t-shirt">
            <img src={logoTshirt} alt="" className={styles.logo_img} />
          </Link>
          <h2 className={styles.title}>T-shirts</h2>
        </div>
      </div>
    </div>
  );
};

export default Catalog;

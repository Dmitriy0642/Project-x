import icon_login from "../icons/login.png";
import icon_logo from "../icons/logo.png";
import icon_bascet from "../icons/bascet.png";
import icon_search from "../icons/search.png";
import styles from "../ui.styles/header.module.css";

import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className={styles.main_div}>
      <Link to="/">
        <img src={icon_logo} alt="" className={styles.img_logo} />
      </Link>
      <ul className={styles.ancor}>
        <Link to="/">Главная</Link>
        <Link to="/test">№</Link>
        <Link to="#">№</Link>
        <Link to="/aboutShop">О нас</Link>
      </ul>
      <div className={styles.icon_links}>
        <Link to="/login">
          <img src={icon_login} alt="" className={styles.img_nav_links} />
        </Link>
        <Link to="/filter">
          <img src={icon_search} alt="" className={styles.img_nav_links} />
        </Link>
        <Link to="/basket">
          <img src={icon_bascet} alt="" className={styles.img_nav_links} />
        </Link>
      </div>
    </div>
  );
};

export default Header;

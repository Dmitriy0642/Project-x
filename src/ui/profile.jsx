import React, { useEffect, useState } from "react";
import icon_login from "../icons/login.png";
import { Link, useHistory } from "react-router-dom";
import styles from "./ui.styles/header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUsers } from "../store/users";
const Profile = () => {
  const currentUser = useSelector(getCurrentUsers());
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className={styles.dropdown} onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <img src={icon_login} alt="" className="img-responsive" />
      </div>
      <div className={" dropdown-menu" + (isOpen ? " show" : "")}>
        <Link to="/logout" className="dropdown-item">
          Log Out
        </Link>
        {currentUser.email === "test@example.ru" ? (
          <Link to="/adminPage" className="dropdown-item">
            AdminPanel
          </Link>
        ) : (
          <Link to="/"></Link>
        )}
      </div>
    </div>
  );
};

export default Profile;

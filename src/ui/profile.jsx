import React, { useState } from "react";
import icon_login from "../icons/login.png";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import styles from "../ui.styles/header.module.css";
const Profile = () => {
  const { currentUser } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };
  console.log(currentUser);
  return (
    <div className={styles.dropdown} onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <img
          src={icon_login}
          alt=""
          className="img-responsive rounded-circle"
        />
      </div>
      <div className={" dropdown-menu" + (isOpen ? " show" : "")}>
        <Link to="logout" className="dropdown-item">
          LogOut
        </Link>
      </div>
    </div>
  );
};

export default Profile;

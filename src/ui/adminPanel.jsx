import React from "react";
import { useSelector } from "react-redux";
import { getCurrentUsers } from "../store/users";
import styles from "../ui.styles/personalArea.module.css";
const AdminPanel = () => {
  const currentUser = useSelector(getCurrentUsers());
  return <h1>SDada</h1>;
};

export default AdminPanel;

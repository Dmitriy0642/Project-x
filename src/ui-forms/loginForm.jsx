import React, { useState } from "react";
import TextField from "./textField";
import styles from "../ui-forms/ui-form.module.css";
const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <div className={styles.main_div}>
      <form className={styles.main_form} onSubmit={handleSubmit}>
        <h1 className={styles.title_login}>Login</h1>
        <TextField
          type="text"
          value={data.email}
          label="Email"
          onChange={handleChange}
          name="email"
        />
        <TextField
          type="password"
          value={data.password}
          label="Пароль"
          onChange={handleChange}
          name="password"
        />
        <button className={styles.button_submit}>Отправить</button>
      </form>
    </div>
  );
};

export default LoginForm;

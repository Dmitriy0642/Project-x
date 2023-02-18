import React, { useEffect, useState } from "react";
import TextField from "./textField";
import { validator } from "../utils/validator";
import styles from "./ui-form.module.css";
import validatorConfig from "../utils/validatorConfig";
const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
  };
  return (
    <div className={styles.main_div}>
      <form onSubmit={handleSubmit} className={styles.main_form}>
        <h1 className={styles.title_login}>Login</h1>
        <TextField
          type="text"
          value={data.email}
          label="Email"
          onChange={handleChange}
          name="email"
          error={errors.email}
        />
        <TextField
          type="password"
          value={data.password}
          label="Пароль"
          onChange={handleChange}
          name="password"
          error={errors.password}
        />
        <button disabled={!isValid} className={styles.button_submit}>
          Отправить
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

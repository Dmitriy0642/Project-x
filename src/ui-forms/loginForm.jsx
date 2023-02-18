import React, { useEffect, useState } from "react";
import TextField from "./textField";
import styles from "../ui-forms/ui-form.module.css";
import { validator } from "../utils/validator";
const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const validatorConfig = {
    email: {
      isRequired: { message: "Электронная почта ,обязательна для заполнения" },
      isEmail: { message: "Email введен не корректно" },
    },
    password: {
      isRequired: { message: "Пароль ,обязателен для заполнения" },
    },
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
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
        <button className={styles.button_submit}>Отправить</button>
      </form>
    </div>
  );
};

export default LoginForm;

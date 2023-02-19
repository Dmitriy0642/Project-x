import React, { useEffect, useState } from "react";
import TextField from "./textField";
import { validator } from "../utils/validator";
import styles from "./ui-form.module.css";
import validatorConfig from "../utils/validatorConfig";
const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    passwordagain: "",
    numtel: "",
    fio: "",
  });
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
    <form onSubmit={handleSubmit}>
      <TextField
        type="text"
        value={data.fio}
        label="Фио"
        onChange={handleChange}
        name="fio"
        error={errors.fio}
      />
      <TextField
        type="text"
        value={data.numtel}
        label="Номер Телефона"
        onChange={handleChange}
        name="numtel"
        error={errors.numtel}
      />
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
      <TextField
        type="password"
        value={data.passwordagain}
        label="Повторите пароль"
        onChange={handleChange}
        name="passwordAgain"
        error={errors.passwordagain}
      />

      <button disabled={!isValid} className={styles.button_submit}>
        Отправить
      </button>
    </form>
  );
};

export default RegisterForm;

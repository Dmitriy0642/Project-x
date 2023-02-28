import React, { useEffect, useState } from "react";
import TextField from "./textField";
import { validator } from "../utils/validator";
import validatorConfig from "../utils/validatorConfig";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const history = useHistory();
  const { logIn } = useAuth();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      await logIn(data);
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
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
      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Отправить
      </button>
    </form>
  );
};

export default LoginForm;

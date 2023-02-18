import React, { useState } from "react";
import TextField from "./textField";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  return (
    <form>
      <TextField
        type="text"
        value={data.email}
        label="Мыло"
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
    </form>
  );
};

export default LoginForm;

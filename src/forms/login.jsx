import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "./loginForm";
import styles from "./ui-form.module.css";
import RegisterForm from "./registerForm";
const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );
  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };
  return (
    <div className={styles.main_div}>
      <div className={styles.container_form}>
        {formType === "register" ? (
          <>
            <h1 className={styles.title_login}>Register</h1>
            <RegisterForm />
            <p className={styles.switch_form}>
              Already have account?
              <a
                role="button"
                onClick={toggleFormType}
                className={styles.link_switched_forms}
              >
                Sign In
              </a>
            </p>
          </>
        ) : (
          <>
            <h1 className={styles.title_login}>Login</h1>
            <LoginForm />
            <p className={styles.switch_form}>
              Dont have account?
              <a
                role="button"
                onClick={toggleFormType}
                className={styles.link_switched_forms}
              >
                Sign Up
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

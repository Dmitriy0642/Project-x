import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../forms/loginForm";
import styles from "../forms/ui-form.module.css";
import RegisterForm from "../forms/registerForm";
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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === "register" ? (
            <>
              <h1 className="mb-4">Register</h1>
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
              <h1 className="mb-4">Login</h1>
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
    </div>
  );
};

export default Login;

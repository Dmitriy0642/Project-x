import React, { useState } from "react";
import styles from "./ui-form.module.css";

const TextField = ({ label, type, name, onChange, value, error }) => {
  const [showPass, setShowPass] = useState(false);
  const getClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };
  const togglePass = () => {
    setShowPass((prevState) => !prevState);
  };
  return (
    <div className="mb-4">
      <label htmlFor={name} className={styles.label_name}>
        {label}
      </label>
      <div className="input-group has-validation">
        <input
          className={getClasses()}
          type={showPass ? "text" : type}
          id={name}
          value={value.name}
          onChange={onChange}
          name={name}
        />
        {type === "password" && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={togglePass}
          >
            {showPass === true ? "Hide" : "Show"}
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

export default TextField;

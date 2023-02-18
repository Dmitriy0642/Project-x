import React from "react";
import styles from "../ui-forms/ui-form.module.css";
const TextField = ({ label, type, name, onChange, value, error }) => {
  return (
    <div>
      <label htmlFor={name} className={styles.label_name}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        id={name}
        value={value.name}
        onChange={onChange}
        name={name}
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default TextField;

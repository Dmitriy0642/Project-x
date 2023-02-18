import React from "react";

const TextField = ({ label, type, name, onChange, value, error }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
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

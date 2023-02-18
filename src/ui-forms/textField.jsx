import React from "react";
const TextField = ({ label, type, name, onChange, value }) => {
  return (
    <div>
      <label htmlFor={name}> {label}</label>
      <input
        type={type}
        id={name}
        value={value.name}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default TextField;

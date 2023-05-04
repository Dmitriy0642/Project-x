import React from "react";

const RadioField = ({ options, name, label, onChange, value }) => {
  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      {options.map((option) => (
        <div
          key={option.name + "_" + option.value}
          className="form-check form-check-inline"
        >
          <input
            type="radio"
            className="form-check-input"
            id={option.name + "_" + option.value}
            value={option.value}
            checked={option.value === value}
            onChange={onChange}
            name={name}
          />
          <label
            className="form-check-label"
            htmlFor={option.name + "_" + option.value}
          >
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioField;

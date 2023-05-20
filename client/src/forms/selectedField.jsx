import React from "react";
const SelectedForm = ({
  label,
  data,
  onChange,
  defaultOption,
  error,
  value,
  name,
}) => {
  const getClasses = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };

  return data !== null ? (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <select
        value={value}
        name={name}
        onChange={onChange}
        className={getClasses()}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {data &&
          data.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  ) : (
    <h1>Loading</h1>
  );
};

export default SelectedForm;

import React from "react";
const SelectedForm = ({
  label,
  data,
  onChange,
  defaultOption,
  error,
  value,
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
        name="category"
        onChange={onChange}
        className={getClasses()}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {data &&
          data.map((categ) => (
            <option key={categ._id} value={categ._id}>
              {categ.name}
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

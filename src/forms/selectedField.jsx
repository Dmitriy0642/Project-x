import React from "react";

const SelectedForm = ({ label, arr, state }) => {
  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <select className="form-select" id="validationCustom04" required>
        <option selected={state === ""} disabled value="">
          Выбор...
        </option>
        {arr.map((item) => (
          <option key={item._id} value={item._id} selected={item._id === state}>
            {item.name}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">Please select a valid state.</div>
    </div>
  );
};

export default SelectedForm;

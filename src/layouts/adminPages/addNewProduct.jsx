import React, { useState, useEffect } from "react";
import TextField from "../../forms/textField";
import { validator } from "../../utils/validator";
import validatorConfig from "../../utils/validatorConfig";
import { useSelector } from "react-redux";
import { getCategory } from "../../store/categoryOfProduct";
const AddNewProduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    firm: "",
    img: "",
    price: "",
    quantity: "",
  });
  const categoryState = useSelector(getCategory());
  const [errors, setErrors] = useState({});
  const [category] = useState(categoryState);

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            {<h2>Добавить продукт</h2>}
            <TextField
              type="text"
              label="Название товара"
              onChange={handleChange}
              value={data.name}
              error={errors.name}
            />
            <TextField
              type="text"
              label="Фирма товара"
              onChange={handleChange}
              value={data.firm}
              error={errors.firm}
            />
            <TextField
              type="text"
              label="Цена товара"
              onChange={handleChange}
              value={data.price}
              error={errors.price}
            />
            <TextField
              type="text"
              label="Фото товара"
              onChange={handleChange}
              value={data.img}
              error={errors.img}
            />
            <div className="mb-4">
              <label htmlFor="validationCustom04" className="form-label">
                State
              </label>
              <select className="form-select" id="validationCustom04" required>
                <option selected={data.firm === ""} disabled value="">
                  Choose...
                </option>
                {category &&
                  category.map((item) => (
                    <option
                      key={item._id}
                      value={item._id}
                      selected={item._id === data.firm}
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
              <div className="invalid-feedback">
                Please select a valid state.
              </div>
            </div>
            <button
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;

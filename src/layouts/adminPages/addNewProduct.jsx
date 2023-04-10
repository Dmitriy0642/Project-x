import React, { useState, useEffect } from "react";
import TextField from "../../forms/textField";
import { validator } from "../../utils/validator";
import validatorConfig from "../../utils/validatorConfig";
import { useSelector } from "react-redux";
import { getCategory } from "../../store/categoryOfProduct";
import SelectedForm from "../../forms/selectedField";
const AddNewProduct = () => {
  const categoryState = useSelector(getCategory());
  const [categ, setCategory] = useState();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    name: "",
    firm: "",
    price: "",
    img: "",
    category: "",
  });

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setCategory(categoryState);
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
              name="name"
            />
            <TextField
              type="text"
              label="Фирма товара"
              onChange={handleChange}
              value={data.firm}
              error={errors.firm}
              name="firm"
            />
            <TextField
              type="text"
              label="Цена товара"
              onChange={handleChange}
              value={data.price}
              error={errors.price}
              name="price"
            />
            <TextField
              type="text"
              label="Фото товара"
              onChange={handleChange}
              value={data.img}
              error={errors.img}
              name="img"
            />

            <SelectedForm
              value={data.category}
              data={categ}
              label="Выберите категорию товара"
              onChange={handleChange}
              defaultOption="Выберите вариант"
              error={errors.category}
            />

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

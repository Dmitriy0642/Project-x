import React, { useState, useEffect } from "react";
import SelectedForm from "../../forms/selectedField";
import { validator } from "../../utils/validator";
import validatorConfig from "../../utils/validatorConfig";
import { useSelector } from "react-redux";
import { getProduct } from "../../store/product";
import TextField from "../../forms/textField";
import productSerivce from "../../services/product.service";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
const ChangeProduct = () => {
  const history = useHistory();
  const prod = useSelector(getProduct());
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    product: "",
    size: "",
    value: "",
    size1: "",
    value1: "",
    size2: "",
    value2: "",
    size3: "",
    value3: "",
  });
  const quantity = [
    { size: `${data.size}`, value: Number(`${data.value}`) },
    { size: `${data.size1}`, value: Number(`${data.value1}`) },
    { size: `${data.size2}`, value: Number(`${data.value2}`) },
    { size: `${data.size3}`, value: Number(`${data.value3}`) },
  ];

  useEffect(() => {
    validate();
  }, [data]);
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      await productSerivce.changeQuantity(data.product, quantity);
    } catch (error) {
      console.log(error.message);
    }
    history.push("/");
    toast.success("Размеры успешно добавленны");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return prod !== null ? (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            <SelectedForm
              name="product"
              data={prod}
              value={data.product}
              label="Выберите товар к которому необходимо добавить размеры"
              onChange={handleChange}
              defaultOption="Выберите вариант"
              error={errors.product}
            />
            <TextField
              type="text"
              label="Название размера"
              onChange={handleChange}
              value={data.size}
              error={errors.size}
              name="size"
            />
            <TextField
              type="text"
              label="Количество товара в размере"
              onChange={handleChange}
              value={data.value}
              error={errors.value}
              name="value"
            />
            <TextField
              type="text"
              label="Название размера"
              onChange={handleChange}
              value={data.size1}
              error={errors.size1}
              name="size1"
            />
            <TextField
              type="text"
              label="Количество товара в размере"
              onChange={handleChange}
              value={data.value1}
              error={errors.value1}
              name="value1"
            />
            <TextField
              type="text"
              label="Название размера"
              onChange={handleChange}
              value={data.size2}
              error={errors.size2}
              name="size2"
            />
            <TextField
              type="text"
              label="Количество товара в размере"
              onChange={handleChange}
              value={data.value2}
              error={errors.value2}
              name="value2"
            />
            <TextField
              type="text"
              label="Название размера"
              onChange={handleChange}
              value={data.size3}
              error={errors.size3}
              name="size3"
            />
            <TextField
              type="text"
              label="Количество товара в размере"
              onChange={handleChange}
              value={data.value3}
              error={errors.value3}
              name="value3"
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
  ) : (
    <h2>Loading</h2>
  );
};

export default ChangeProduct;

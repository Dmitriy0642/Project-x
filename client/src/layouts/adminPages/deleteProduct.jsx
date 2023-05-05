import React from "react";
import { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import validatorConfig from "../../utils/validatorConfig";
import productSerivce from "../../services/product.service";
import SelectedForm from "../../forms/selectedField";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, removingProduct } from "../../store/product";
import { useHistory } from "react-router-dom";
const DeleteProduct = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const prod = useSelector(getProduct());
  const [product, setProduct] = useState();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    product: "",
  });

  const handleChange = (e) => {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setProduct(prod);
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
    productSerivce.deleteProduct(data);
    dispatch(removingProduct(data));
    history.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return product !== null ? (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            <SelectedForm
              name="product"
              data={product}
              value={data.product}
              label="Выберите товар который необходимо удлаить"
              onChange={handleChange}
              defaultOption="Выберите вариант"
              error={errors.product}
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
    <h1>Loading</h1>
  );
};

export default DeleteProduct;

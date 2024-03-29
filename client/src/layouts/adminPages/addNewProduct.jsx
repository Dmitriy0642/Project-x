import React, { useState, useEffect } from "react";
import TextField from "../../forms/textField";
import { validator } from "../../utils/validator";
import validatorConfig from "../../utils/validatorConfig";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../store/categoryOfProduct";
import SelectedForm from "../../forms/selectedField";
import productSerivce from "../../services/product.service";
import { useHistory } from "react-router-dom";
import { loadNewProduct } from "../../store/product";

const AddNewProduct = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const categoryState = useSelector(getCategory());
  const [categ, setCategory] = useState();
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    name: "",
    firm: "",
    price: "",
    img: "",
    category: "",
    quantity: [
      { size: "XL", value: 0 },
      { size: "XXL", value: 0 },
      { size: "XS", value: 0 },
      { size: "M", value: 0 },
    ],
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
    productSerivce.createProduct(data);
    dispatch(loadNewProduct(data));
    history.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form onSubmit={handleSubmit}>
            {<h2>Add Product</h2>}
            <TextField
              type="text"
              label="Name product"
              onChange={handleChange}
              value={data.name}
              error={errors.name}
              name="name"
            />
            <TextField
              type="text"
              label="Firm product"
              onChange={handleChange}
              value={data.firm}
              error={errors.firm}
              name="firm"
            />
            <TextField
              type="text"
              label="Price product"
              onChange={handleChange}
              value={data.price}
              error={errors.price}
              name="price"
            />
            <TextField
              type="text"
              label="Photo product"
              onChange={handleChange}
              value={data.img}
              error={errors.img}
              name="img"
            />
            <SelectedForm
              value={data.category}
              data={categ}
              label="Select category product"
              onChange={handleChange}
              defaultOption="Choose option"
              error={errors.category}
              name="category"
            />

            <button
              disabled={!isValid}
              className="btn btn-primary w-100 mx-auto"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewProduct;

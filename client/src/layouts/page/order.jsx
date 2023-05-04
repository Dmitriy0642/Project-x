import React, { useState, useEffect } from "react";
import TextField from "../../forms/textField";
import validatorConfig from "../../utils/validatorConfig";
import { validator } from "../../utils/validator";
import RadioField from "../../forms/radioField";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import orderService from "../../services/orders.service";
import writingDataToDb from "../../functions/writingDataToDb";

const Order = () => {
  const history = useHistory();
  const [dataFromBascet, setDataFromBascet] = useState();
  const [data, setData] = useState({
    numtel: "",
    fio: "",
    sity: "",
    address: "",
    post: "СДЭК",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate();
    orderService
      .getBascetPurchases()
      .then((res) => {
        const toFormat = Object.keys(res).map((item) => res[item]);
        setDataFromBascet(toFormat);
      })
      .catch((error) => error.message);
  }, [data]);

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
      await writingDataToDb(data, dataFromBascet);
    } catch (error) {
      console.log(error.message);
    }
    toast.success(
      "Спасибо за покупку в нашем магазине,ваш заказ оформлен ожидайте обратной связи"
    );

    history.push("/");
    await orderService.refreshBascetAfterBuying();
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h2 className="mb-5">Order</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              name="fio"
              type="text"
              label="ФИО"
              value={data.fio}
              onChange={handleChange}
              error={errors.fio}
            />
            <TextField
              name="numtel"
              type="text"
              label="Номер телефона"
              value={data.numtel}
              onChange={handleChange}
              error={errors.numtel}
            />
            <TextField
              name="sity"
              type="text"
              label="Город"
              value={data.sity}
              onChange={handleChange}
              error={errors.sity}
            />
            <TextField
              name="address"
              type="text"
              label="Точный Адрес"
              value={data.address}
              onChange={handleChange}
              error={errors.address}
            />
            <RadioField
              options={[
                { name: "СДЭК", value: "СДЭК" },
                { name: "ПочтаРоссии", value: "ПочтаРоссии" },
                { name: "DHL", value: "DHL" },
              ]}
              value={data.post}
              name="post"
              onChange={handleChange}
            />
            <button
              className="btn btn-primary w-100 mx-auto"
              disabled={!isValid}
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;

import { toast } from "react-toastify";
const handleIncrement = (quantity, e, state, data) => {
  const getDataWithLs = localStorage.getItem("AllData");
  const parseDataToFormat = JSON.parse(getDataWithLs);
  const filtradeQuan = quantity.filter(
    (item) => `${item.size}` === `${e.target.id}`
  );

  const getObjQuan = filtradeQuan[0];
  state(getObjQuan);
  if (getObjQuan.value <= 0) {
    getObjQuan.value += 1;
    if (getObjQuan.value <= 1) {
      toast.error("Вы выбрали последний размер данного товара");
    }
  }

  const newData = {
    _id: data._id,
    firm: data.category,
    img: [data.img[0], data.img[1]],
    price: data.price,
    category: data.category,
    name: data.name,
    quantity: quantity,
  };
  const pushDataToLs = parseDataToFormat.map((item) => {
    if (item._id === newData._id) {
      return newData;
    }
    return item;
  });
  localStorage.setItem("AllData", JSON.stringify(pushDataToLs));
};

const handleDecrement = (quantity, e, state, data) => {
  const getDataWithLs = localStorage.getItem("AllData");
  const parseDataToFormat = JSON.parse(getDataWithLs);
  const filtradeQuan = quantity.filter(
    (item) => `${item.size}` === `${e.target.id}`
  );

  const getObjQuan = filtradeQuan[0];
  state(getObjQuan);
  if (getObjQuan.value === 1) {
    getObjQuan.value -= 1;
    if (getObjQuan.value < 0) {
    }
  }

  const newData = {
    _id: data._id,
    firm: data.category,
    img: [data.img[0], data.img[1]],
    price: data.price,
    category: data.category,
    name: data.name,
    quantity: quantity,
  };

  const pushDataToLs = parseDataToFormat.map((item) => {
    if (item._id === newData._id) {
      return newData;
    }
    return item;
  });
  localStorage.setItem("AllData", JSON.stringify(pushDataToLs));
};

const filtradeDataBascet = () => {};

const servicesBascet = {
  filtradeDataInbascet: filtradeDataBascet,
  increment: handleIncrement,
  decrement: handleDecrement,
};
export default servicesBascet;

import { toast } from "react-toastify";
import orderService from "../services/orders.service";
const handleIncrement = (quantity, e, state, data, initialData) => {
  const getDataWithLs = localStorage.getItem("AllData");
  const parseDataToFormat = JSON.parse(getDataWithLs);
  const getDataWithLsInitialSizes = localStorage.getItem("InitialSizes");
  const initiSizesToFormat = JSON.parse(getDataWithLsInitialSizes);
  const filtradeQuan = quantity.filter(
    (item) => `${item.size}` === `${e.target.id}`
  );

  const arrayOfSelecedItem = [];
  const transformDataToArray = initialData.map((item, index) => {
    if (item._id === data._id) {
      arrayOfSelecedItem.push(initialData[index]);
    }
  });
  const quantityFromSelectItem = arrayOfSelecedItem[0].quantity;

  const filteredInitialValuesFromSelecedItem = quantityFromSelectItem.filter(
    (item) => `${item.size}` === `${e.target.id}`
  );

  const initialValuesOfItem = filteredInitialValuesFromSelecedItem[0];

  const getObjQuan = filtradeQuan[0];
  state(getObjQuan);

  if (getObjQuan.value < initialValuesOfItem.value) {
    getObjQuan.value += 1;
    if (getObjQuan.value === initialValuesOfItem.value) {
      toast.error("Вы выбрали последний размер данного товара");
    }
  }

  const newData = {
    _id: data._id,
    firm: data.category,
    img: [...data.img],
    price: data.price,
    category: data.category,
    name: data.name,
    quantity: quantity,
  };
  const DecrementQunatData = quantityFromSelectItem.forEach((item, index) => {
    if (`${e.target.id}` === `${quantity[index].size}`) {
    }
  });

  const pushDataToLs = parseDataToFormat.map((item) => {
    if (item._id === newData._id) {
      return newData;
    }
    return item;
  });
  localStorage.setItem("AllData", JSON.stringify(pushDataToLs));
};

const handleDecrement = (quantity, e, state, data, initialData) => {
  const getDataWithLs = localStorage.getItem("AllData");
  const parseDataToFormat = JSON.parse(getDataWithLs);
  const getDataWithLsInitialSizes = localStorage.getItem("InitialSizes");
  const initiSizesToFormat = JSON.parse(getDataWithLsInitialSizes);
  const filtradeQuan = quantity.filter(
    (item) => `${item.size}` === `${e.target.id}`
  );

  const arrayOfSelecedItem = [];
  const transformDataToArray = initialData.map((item, index) => {
    if (item._id === data._id) {
      arrayOfSelecedItem.push(initialData[index]);
    }
  });
  const quantityFromSelectItem = arrayOfSelecedItem[0].quantity;
  const filteredInitialValuesFromSelecedItem = quantityFromSelectItem.filter(
    (item) => `${item.size}` === `${e.target.id}`
  );
  const initialValuesOfItem = filteredInitialValuesFromSelecedItem[0];

  const getObjQuan = filtradeQuan[0];
  state(getObjQuan);
  if (getObjQuan.value === initialValuesOfItem.value) {
    getObjQuan.value -= 1;

    if (getObjQuan.value < initialValuesOfItem.value) {
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

  const DecrementQunatData = quantityFromSelectItem.forEach((item, index) => {
    if (`${e.target.id}` === `${quantity[index].size}`) {
    }
  });

  const pushDataToLs = parseDataToFormat.map((item) => {
    if (item._id === newData._id) {
      return newData;
    }
    return item;
  });
  localStorage.setItem("AllData", JSON.stringify(pushDataToLs));
};

const servicesBascet = {
  increment: handleIncrement,
  decrement: handleDecrement,
};
export default servicesBascet;

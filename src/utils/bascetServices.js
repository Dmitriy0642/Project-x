import { toast } from "react-toastify";

const handleIncrement = (quantity, e, state, data) => {
  const getDataWithLs = localStorage.getItem("AllData");
  const parseDataToFormat = JSON.parse(getDataWithLs);
  const getDataWithLsInitialSizes = localStorage.getItem("InitialSizes");
  const initiSizesToFormat = JSON.parse(getDataWithLsInitialSizes);
  const filtradeQuan = quantity.filter(
    (item) => `${item.size}` === `${e.target.id}`
  );
  const arrayOfSelecedItem = [];
  const checkedInitialSizeValue = parseDataToFormat.map((item, index) => {
    if (item._id === data._id) {
      arrayOfSelecedItem.push(initiSizesToFormat[index]);
    }
  });
  const filteredInitialValuesFromSelecedItem = arrayOfSelecedItem[0].filter(
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
  const getDataWithLsInitialSizes = localStorage.getItem("InitialSizes");
  const initiSizesToFormat = JSON.parse(getDataWithLsInitialSizes);
  const filtradeQuan = quantity.filter(
    (item) => `${item.size}` === `${e.target.id}`
  );
  const arrayOfSelecedItem = [];
  const checkedInitialSizeValue = parseDataToFormat.map((item, index) => {
    if (item._id === data._id) {
      arrayOfSelecedItem.push(initiSizesToFormat[index]);
    }
  });
  const filteredInitialValuesFromSelecedItem = arrayOfSelecedItem[0].filter(
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

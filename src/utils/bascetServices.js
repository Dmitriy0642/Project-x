import { toast } from "react-toastify";
import orderService from "../services/orders.service";
const handleIncrement = async (quantity, e, state, data, initialData) => {
  ///filtrade quan form data
  const filtradeQuantityFromData = quantity.filter(
    (item) => `${item.size}` === `${e.target.id}`
  );

  ///getting data from db
  const arrayOfSelecedItem = [];
  const transformDataToArray = initialData.map((item, index) => {
    if (item._id === data._id) {
      arrayOfSelecedItem.push(initialData[index]);
    }
  });

  ///quantity with database
  const quantityFromSelectItem = arrayOfSelecedItem[0].quantity;

  const filtradeQuantityFromDbToSelectedSize = quantityFromSelectItem.filter(
    (item) => `${item.size}` === `${e.target.id}`
  );

  const initialValuesOfItem = filtradeQuantityFromDbToSelectedSize[0];

  const getObjQuan = filtradeQuantityFromData[0];
  state(getObjQuan);
  if (getObjQuan.value < initialValuesOfItem.value) {
    getObjQuan.value++;
    if (filtradeQuantityFromData.value === initialValuesOfItem.value) {
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

  await orderService.createBascetPurchases(newData);
};

const handleDecrement = async (quantity, e, state, data, initialData) => {
  const filtradeQuanFormData = quantity.filter(
    (item) => `${item.size}` === `${e.target.id}`
  );

  const arrayOfSelecedItem = [];
  const transformDataToArray = initialData.map((item, index) => {
    if (item._id === data._id) {
      arrayOfSelecedItem.push(initialData[index]);
    }
  });

  const quantityFromSelectItem = arrayOfSelecedItem[0].quantity;

  const filtradeQuantityFromDbToSelectedSize = quantityFromSelectItem.filter(
    (item) => `${item.size}` === `${e.target.id}`
  );
  const initialValuesOfItem = filtradeQuantityFromDbToSelectedSize[0];
  const getObjQuan = filtradeQuanFormData[0];
  state(getObjQuan);
  if (
    initialValuesOfItem.value === getObjQuan.value ||
    getObjQuan.value < initialValuesOfItem.value
  ) {
    if (getObjQuan.value > 0) {
      getObjQuan.value -= 1;
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
  await orderService.createBascetPurchases(newData);
};

const servicesBascet = {
  increment: handleIncrement,
  decrement: handleDecrement,
};
export default servicesBascet;

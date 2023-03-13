import { toast } from "react-toastify";
import orderService from "../services/orders.service";
const addedToBascet = async (object, selectedSize, allProd) => {
  ///Filtered data from db
  const filtradeSingleData = allProd.filter((item) => item._id === object._id);

  ///obj data
  const objData = filtradeSingleData[0];

  const initialyQuantityFromObj = object.quantity.filter(
    (item) => `${item.size}` === `${selectedSize}`
  );

  const secondQuantityFromObj = objData.quantity.filter(
    (item) => `${item.size}` === `${selectedSize}`
  );

  // console.log("fromOb", initialyQuantityFromObj);
  // console.log("fromDb", secondQuantityFromObj);

  if (`${selectedSize}` === `${selectedSize}`) {
    toast.success("Товар Добавлен в корзину");
  }

  const newQuantity = objData.quantity.map((item) => {
    if (`${item.size}` === `${selectedSize}`) {
      if (secondQuantityFromObj[0].value === initialyQuantityFromObj[0].value) {
        if (item.value > 0) {
          return { ...item, value: (item.value -= 1) };
        }
      }
    }
    return item;
  });

  const newObj = {
    ...objData,
    quantity: newQuantity,
  };

  const changeProductData = allProd.map((item) => {
    if (item._id === object._id) {
      return newObj;
    }
    return item;
  });

  await orderService.createBascetPurchases(newObj);
};

export default addedToBascet;

import { toast } from "react-toastify";
import orderService from "../services/orders.service";
const addedToBascet = async (object, selectedSize, allProd) => {
  ///Filtered data from db
  const filtradeSingleData = allProd.filter((item) => item._id === object._id);

  ///obj data
  const objData = filtradeSingleData[0];
  ///filterInitialQuantity
  const initialyQuantityFromObj = object.quantity.filter(
    (item) => `${item.size}` === `${selectedSize}`
  );
  ///filterQuantityFromZeroValues
  const secondQuantityFromObj = objData.quantity.filter(
    (item) => `${item.size}` === `${selectedSize}`
  );

  if (initialyQuantityFromObj[0].value === secondQuantityFromObj[0].value) {
    toast.success("Товар добавлен в корзину");
  } else if (
    initialyQuantityFromObj[0].value < secondQuantityFromObj[0].value
  ) {
    toast.error("В наличии нет данного размера");
  }

  if (`${selectedSize}` === `${secondQuantityFromObj[0].size}`) {
    if (secondQuantityFromObj[0].value === initialyQuantityFromObj[0].value) {
      if (secondQuantityFromObj[0].value > 0) {
        secondQuantityFromObj[0].value -= 1;
      }
    }
  }

  await orderService.createBascetPurchases(objData);
};

export default addedToBascet;

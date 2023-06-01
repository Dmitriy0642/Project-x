import orderService from "../services/orders.service";
import productSerivce from "../services/product.service";
import decrementPurchased from "./decrementPurchased";
const writingDataToDb = async (
  dataForm,
  dataFromBascet,
  quantityFromPurchased,
  slaesProductQuantity
) => {
  const dataFromPurchased = dataFromBascet.map(async (item) => {
    if (
      quantityFromPurchased.length === 0 &&
      slaesProductQuantity.length === 0
    ) {
      await decrementPurchased(item, item.quantity);
      await productSerivce.addSalesProduct(item);
      await orderService.createPurchasedProduct(item, dataForm);
    } else {
      await decrementPurchased(item, item.quantity);
      const newQuantity = item.quantity.map((j, index) => {
        if (quantityFromPurchased[index].value > 0) {
          return {
            ...j,
            value: (quantityFromPurchased[index].value += j.value),
          };
        }
        return j;
      });
      const quantityFroSalesProduct = item.quantity.map((j, index) => {
        if (slaesProductQuantity[index].value > 0) {
          return {
            ...j,
            value: (slaesProductQuantity[index].value += j.value),
          };
        }
        return j;
      });

      const newData = {
        category: item.category,
        firm: item.firm,
        img: [...item.img],
        name: item.name,
        price: item.price,
        quantity: newQuantity,
        _id: item._id,
      };
      const dataForSalesProduct = {
        category: item.category,
        firm: item.firm,
        img: [...item.img],
        name: item.name,
        price: item.price,
        quantity: quantityFroSalesProduct,
        _id: item._id,
      };

      await orderService.createPurchasedProduct(newData, dataForm);
      await productSerivce.addSalesProduct(dataForSalesProduct);
    }
  });
};

export default writingDataToDb;

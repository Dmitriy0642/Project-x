import orderService from "../services/orders.service";
import productSerivce from "../services/product.service";
import decrementPurchased from "./decrementPurchased";
const writingDataToDb = async (
  dataForm,
  dataFromBascet,
  quantityFromPurchased
) => {
  const dataFromPurchased = await dataFromBascet.map((item) => {
    if (quantityFromPurchased.length === 0) {
      decrementPurchased(item, item.quantity);
      productSerivce.addSalesProduct(item);
      orderService.createPurchasedProduct(item, dataForm);
    } else {
      decrementPurchased(item, item.quantity);
      const newQuantity = item.quantity.map((j, index) => {
        if (quantityFromPurchased[index].value > 0) {
          return {
            ...j,
            value: (quantityFromPurchased[index].value += j.value),
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
      orderService.createPurchasedProduct(newData, dataForm);
      productSerivce.addSalesProduct(newData);
    }
  });
};

export default writingDataToDb;

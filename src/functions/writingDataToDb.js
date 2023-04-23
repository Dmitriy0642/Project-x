import orderService from "../services/orders.service";
import productSerivce from "../services/product.service";
import decrementPurchased from "./decrementPurchased";
const writingDataToDb = async (dataForm, dataFromBascet) => {
  const dataFromPurchased = await dataFromBascet.map((item) => {
    orderService.getPurchasedProdQuantity(item).then((res) => {
      const quantityFromPurchased = res;
      if (
        quantityFromPurchased === null ||
        quantityFromPurchased === undefined
      ) {
        orderService.create(dataForm);
        decrementPurchased(item, item.quantity);
        orderService.createPurchasedProd(item);
        productSerivce.addSalesProduct(item);
      } else if (
        quantityFromPurchased !== null ||
        quantityFromPurchased !== undefined
      ) {
        orderService.create(dataForm);
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
        orderService.createPurchasedProd(newData);
        productSerivce.addSalesProduct(newData);
      }
    });
  });
};

export default writingDataToDb;

import orderService from "../services/orders.service";
const removingQuantity = async (prod) => {
  const product = await prod;
  const purchasedData = await orderService.getPurchasedProd();
  const filtradingProduct = [];
  const filtradeProduct = product.forEach((item) => {
    const filtradePurchasedItem = purchasedData.forEach((element) => {
      if (item._id === element._id) {
        filtradingProduct.push(item);
      }
    });
  });
  console.log(purchasedData);
  console.log(filtradingProduct);
};

export default removingQuantity;

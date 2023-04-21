import orderService from "../services/orders.service";
const decrementPurchased = async (data, quan) => {
  const initData = await orderService.getInitiProduct().then((res) => {
    const toFormat = Object.keys(res).map((item) => res[item]);
    const filtradeDataByBascet = [];
    if (data) {
      const filtradeDataByBascetData = toFormat.forEach((item) => {
        if (item._id === data._id) {
          return filtradeDataByBascet.push(item);
        }
      });
    }
    const quantityFromDb = filtradeDataByBascet[0].quantity;
    const decrementQuan = quantityFromDb.map((item, index) => {
      if (`${item.size}` === `${quan[index].size}`) {
        if (quan[index].value > 0) {
          return {
            ...item,
            value: (item.value -= quan[index].value),
          };
        }
      }
      return item;
    });
    const newData = {
      _id: data._id,
      category: data.category,
      firm: data.firm,
      img: [...data.img],
      name: data.name,
      price: data.price,
      quantity: decrementQuan,
    };

    orderService.changesDataProduct(newData);
  });
};

export default decrementPurchased;

import productSerivce from "../services/product.service";
const decrementPurchased = async (data, quan) => {
  const initData = await productSerivce.getAllProduct().then((res) => {
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
      if (quan[index].value > 0) {
        return {
          ...item,
          value: (item.value -= quan[index].value),
        };
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

    productSerivce.changeProduct(newData);
  });
};

export default decrementPurchased;

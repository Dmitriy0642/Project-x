import http from "./http.service";
import localStorageService from "./localStorage.service";

const userEndPoint = "/order";
const orderService = {
  create: async (payload) => {
    const { data } = await http.patch(
      `${userEndPoint}/${localStorageService.getUserId()}`,
      payload
    );
    return data;
  },
  getPurchasedProd: async () => {
    const { data } = await http.get(
      `${userEndPoint}/${localStorageService.getUserId()}/
        purchasedItem`
    );
    return data;
  },
  getPurchasedProdQuantity: async (item) => {
    const { data } = await http.get(
      `${userEndPoint}/${localStorageService.getUserId()}/purchasedItem/${
        item._id
      }/quantity`
    );
    return data;
  },
  createPurchasedProduct: async (prod) => {
    const { data } = await http.patch(
      `${userEndPoint}/${localStorageService.getUserId()}/purchasedItem/${
        prod._id
      }`,
      prod
    );
    return data;
  },
};
export default orderService;

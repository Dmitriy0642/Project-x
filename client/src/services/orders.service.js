import http from "./http.service";
import localStorageService from "./localStorage.service";

const userEndPoint = "/order";
const orderService = {
  create: async (payload) => {
    const { data } = await http.post(
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
};
export default orderService;

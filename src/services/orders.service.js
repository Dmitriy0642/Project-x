import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndPoint = "order/";
const orderService = {
  create: async (payload) => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await httpService.put(
      `${userEndPoint}` +
        localStorageService.getUserId() +
        `.json?auth=${accesToken}`,
      payload
    );
    return data;
  },
  createPurchasedProd: async (prod) => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await httpService.put(
      `${userEndPoint}` +
        localStorageService.getUserId() +
        `/purchasedProduct` +
        `.json?auth=${accesToken}`,
      prod
    );
    return data;
  },
};
export default orderService;

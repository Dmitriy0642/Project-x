import httpService from "./http.service";
import localStorageService from "./localStorage.service";
const userEndPoint = "order/";
const orderService = {
  create: async (payload) => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await httpService.patch(
      `${userEndPoint}` +
        localStorageService.getUserId() +
        `.json?auth=${accesToken}`,
      payload
    );
    return data;
  },
  getPurchasedProd: async () => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await httpService.get(
      `${userEndPoint}` +
        localStorageService.getUserId() +
        `/purchasedItem` +
        `/prod` +
        `.json?auth=${accesToken}`
    );

    return data;
  },
  createPurchasedProd: async ({ prod }) => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await httpService.patch(
      `${userEndPoint}` +
        localStorageService.getUserId() +
        `/purchasedItem` +
        `.json?auth=${accesToken}`,
      { prod }
    );

    return data;
  },
  changesDataProduct: async (product) => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await httpService.patch(
      "/product" + `/${product._id}` + `.json?auth=${accesToken}`,
      product
    );
    return data;
  },

  refreshBascetAfterBuying: async () => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await httpService.delete(
      "/bascet" + `.json?auth=${accesToken}`
    );
    return data;
  },
};
export default orderService;

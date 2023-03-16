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
  getInitiProduct: async () => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await httpService.get(
      "/product" + `.json?auth=${accesToken}`
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
  createBascetPurchases: async (obj) => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await httpService.patch(
      "/bascet/" +
        localStorageService.getUserId() +
        `/${obj._id}` +
        `.json?auth=${accesToken}`,
      obj
    );
    return data;
  },
  getBascetPurchases: async () => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await httpService.get(
      `/bascet/` + localStorageService.getUserId() + `.json?auth=${accesToken}`
    );
    return data;
  },
  deleteProductInBascet: async (id) => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await httpService.delete(
      "/bascet/" +
        localStorageService.getUserId() +
        `/${id}` +
        `.json?auth=${accesToken}`
    );
    return data;
  },
};
export default orderService;

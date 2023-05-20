import http from "./http.service";
import localStorageService from "./localStorage.service";

const userEndPoint = "order/";
const orderService = {
  create: async (payload) => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await http.patch(
      `${userEndPoint}` +
        localStorageService.getUserId() +
        `.json?auth=${accesToken}`,
      payload
    );
    return data;
  },
  getPurchasedProd: async () => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await http.get(
      `${userEndPoint}` +
        localStorageService.getUserId() +
        `/purchasedItem` +
        `.json?auth=${accesToken}`
    );

    return data;
  },
  getPurchasedProdQuantity: async (item) => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await http.get(
      `${userEndPoint}` +
        localStorageService.getUserId() +
        `/purchasedItem` +
        `/${item._id}` +
        "/quantity" +
        `.json?auth=${accesToken}`
    );
    return data;
  },
  createPurchasedProd: async (prod) => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await http.put(
      `${userEndPoint}` +
        localStorageService.getUserId() +
        `/purchasedItem` +
        `/${prod._id}` +
        `.json?auth=${accesToken}`,
      prod
    );

    return data;
  },
  getInitiProduct: async () => {
    const { data } = await http.get("/product");
    return data;
  },
  changesDataProduct: async (product) => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await http.put(
      "/product" + `/${product._id}` + `.json?auth=${accesToken}`,
      product
    );
    return data;
  },

  updateProductAddedToBascet: async (obj) => {
    const { data } = await http.patch(
      `/bascet/${localStorageService.getUserId()}/${obj._id}`,
      obj
    );
    return data;
  },

  decrementInCounter: async (obj) => {
    const { data } = await http.patch(
      `/bascet/${localStorageService.getUserId()}/bascet/${obj._id}`,
      { quantity: obj.quantity }
    );
    return data;
  },
  // incremantInCounter: async (obj) => {
  //   const { data } = await http.patch(
  //     `/bascet/${localStorageService.getUserId()}/bascet/${obj._id}`
  //   );
  //   return data;
  // },
  getBascetPurchases: async () => {
    const { data } = await http.get(
      `/bascet/${localStorageService.getUserId()}`
    );
    return data;
  },
  deleteProductInBascet: async (id) => {
    const { data } = await http.delete(
      `/bascet/${localStorageService.getUserId()}/bascet/${id}`
    );
    return data;
  },
  refreshBascetAfterBuying: async () => {
    const { data } = await http.delete(
      `/bascet/${localStorageService.getUserId()}`
    );
    return data;
  },
};
export default orderService;

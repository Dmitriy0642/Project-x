import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const productEndPoint = "product/";

const productSerivce = {
  createProduct: async (payload) => {
    const accesToken = localStorageService.getAccesToken();
    const changeImg = payload.img.split(",");
    payload.img = changeImg;
    const { data } = await httpService.put(
      `${productEndPoint}` + `${payload._id}` + `.json?auth=${accesToken}`,
      payload
    );
    return data;
  },
  deleteProduct: async (payload) => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await httpService.delete(
      `${productEndPoint}` + `${payload.product}` + `.json?auth=${accesToken}`
    );
    return data;
  },
};
export default productSerivce;

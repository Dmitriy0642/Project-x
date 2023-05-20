import http from "./http.service";
import localStorageService from "./localStorage.service";

const productEndPoint = "/product";

const productSerivce = {
  createProduct: async (payload) => {
    const changeImg = payload.img.split(",");
    payload.img = changeImg;
    const { data } = await http.post(`${productEndPoint}`, payload);
    return data;
  },
  deleteProduct: async (payload) => {
    const { data } = await http.delete(`${productEndPoint}/${payload}`);
    return data;
  },
  addSalesProduct: async (payload) => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await http.put(
      "/salesProduct" + `/${payload._id}` + `.json?auth=${accesToken}`,
      payload
    );
    return data;
  },
  changeQuantity: async (id, quan) => {
    const { data } = await http.patch(
      `${productEndPoint}/${id}/quantity`,
      quan
    );
    return data;
  },
};
export default productSerivce;

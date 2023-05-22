import http from "./http.service";
import localStorageService from "./localStorage.service";

const productEndPoint = "/product";

const productSerivce = {
  getAllProduct: async () => {
    const { data } = await http.get(`${productEndPoint}`);
    return data;
  },
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
    const { data } = await http.patch(`/salesProduct/${payload._id}`, payload);
    return data;
  },
  changeQuantity: async (id, quan) => {
    const { data } = await http.patch(
      `${productEndPoint}/${id}/quantity`,
      quan
    );
    return data;
  },
  changeProduct: async (product) => {
    const { data } = await http.patch(
      `${productEndPoint}/${product._id}`,
      product
    );
    return data;
  },
};
export default productSerivce;

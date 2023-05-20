import http from "./http.service";
import localStorageService from "./localStorage.service";
const bascetService = {
  updateProductAddedToBascet: async (obj) => {
    const { data } = await http.patch(
      `/bascet/${localStorageService.getUserId()}/${obj._id}`,
      obj
    );
    return data;
  },
  updatedProductInCounter: async (obj) => {
    const { data } = await http.patch(
      `/bascet/${localStorageService.getUserId()}/bascet/${obj._id}`,
      { quantity: obj.quantity }
    );
    return data;
  },
  getBascetData: async () => {
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
export default bascetService;

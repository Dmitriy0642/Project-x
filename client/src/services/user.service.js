import http from "./http.service";
import localStorageService from "./localStorage.service";

const userEndPoint = "/user/";

const userService = {
  create: async (payload) => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await http.put(
      `${userEndPoint}` + `${payload._id}` + `.json?auth=${accesToken}`,
      payload
    );
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await http.get(
      `${userEndPoint}` + localStorageService.getUserId()
    );
    return data;
  },
  getRefreshUser: async (balance) => {
    const { data } = await http.put(
      `${userEndPoint}` + localStorageService.getUserId() + `/balance`,
      balance
    );
    return data;
  },
};

export default userService;

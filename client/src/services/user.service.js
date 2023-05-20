import http from "./http.service";
import localStorageService from "./localStorage.service";

const userEndPoint = "/user/";

const userService = {
  create: async (payload) => {
    const { data } = await http.put(
      `${userEndPoint}` + `${payload._id}`,
      payload
    );
    return data;
  },
  getCurrentUser: async () => {
    if (localStorageService.getUserId() !== null) {
      const { data } = await http.get(
        `${userEndPoint}` + localStorageService.getUserId()
      );
      return data;
    }
  },
  getRefreshUser: async (balance) => {
    const { data } = await http.patch(
      `${userEndPoint}${localStorageService.getUserId()}`,
      { balance: balance }
    );
    return data;
  },
};

export default userService;

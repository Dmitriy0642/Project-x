import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndPoint = "user/";

const userService = {
  create: async (payload) => {
    const { data } = await httpService.put(
      `${userEndPoint}` + `${payload._id}` + `.json`,
      payload
    );
    return data;
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      `${userEndPoint}` + localStorageService.getUserId() + `.json`
    );
    return data;
  },
};

export default userService;

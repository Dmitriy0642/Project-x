import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndPoint = "user/";

const userService = {
  create: async (payload) => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await httpService.put(
      `${userEndPoint}` + `${payload._id}` + `.json?auth=${accesToken}`,
      payload
    );
    return data;
  },
  getCurrentUser: async () => {
    const accesToken = localStorageService.getAccesToken();
    const { data } = await httpService.get(
      `${userEndPoint}` +
        localStorageService.getUserId() +
        `.json?auth=${accesToken}`
    );
    return data;
  },
};

export default userService;

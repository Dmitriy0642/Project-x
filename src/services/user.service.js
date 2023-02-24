import httpService from "./http.service";

const userEndPoint = "user/";

const userService = {
  create: async (payload) => {
    const { data } = await httpService.put(
      `${userEndPoint}` + `${payload._id}` + `.json`,
      payload
    );
    return data;
  },
};

export default userService;

import axios from "axios";
import config from "../config.json";
axios.defaults.baseURL = config.ApiEndPOint;
axios.interceptors.response.use(
  (res) => res,
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedErrors) {
      console.log("UnexpectedErrors");
    }
    return Promise.reject(error);
  }
);
const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
export default httpService;

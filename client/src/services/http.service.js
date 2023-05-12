import axios from "axios";
import { toast } from "react-toastify";
import config from "../config.json";
import localStorageService from "./localStorage.service";
import authService from "./auth.service";
axios.defaults.baseURL = config.ApiEndPOint;
axios.defaults.baseURL = config.api;

const http = axios.create({
  baseURL: config.ApiEndPOint,
});

http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefrestTokent();
    const isExpired = refreshToken && expiresDate < Date.now();
    if (isExpired) {
      const data = authService.refreshToken();
      localStorageService.setTokens(data);
    }
    const accessToken = localStorageService.getAccesToken();
    if (accessToken) {
      config.params = {
        ...config.params,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  function (error) {
    const expectedErrors =
      error.response && error.response.status >= 400 && error.response < 500;
    if (!expectedErrors) {
      if (error.message === "INVALID_PASSWORD") {
        console.log(error);
        toast.error("INVALID_PASSWORD");
      }
      if (error.message === "Network Error") {
        console.log(error);
      }
      if (
        error.message === "Request failed with status code 400" ||
        error.code === 400
      ) {
        toast.error("Пользователь с таким email уже зарегестрирован");
      } else {
        console.log(error);
        toast.warning(error.message);
      }
    }
    return Promise.reject(error);
  }
);
const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};
export default httpService;

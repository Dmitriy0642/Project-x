import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";
import authService from "./auth.service";

const http = axios.create({
  baseURL: configFile.ApiEndPOint,
});
axios.defaults.baseURL = configFile.ApiEndPOint;
http.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefrestTokent();
    const accessToken = localStorageService.getAccesToken();
    const isExpired = refreshToken && expiresDate < Date.now();
    if (isExpired) {
      const data = authService.refreshToken();
      localStorageService.setTokens(data);
    }
    if (accessToken) {
      config.headers = {
        ...config.headers,
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
        toast.error("INVALID_PASSWORD");
      }
      if (error.message === "Network Error") {
        toast.error("REBOOT_PAGE")
      }
      if (
        error.message === "Request failed with status code 400" ||
        error.code === 400
      ) {
        toast.error("User with this email exist");
      } else {
        console.log(error);
        toast.warning(error.message);
      }
    }
    return Promise.reject(error);
  }
);


export default http;

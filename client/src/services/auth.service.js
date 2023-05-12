import axios from "axios";
import { toast } from "react-toastify";
import localStorageService, {
  getRefrestTokent,
  setTokens,
} from "./localStorage.service";
import config from "../config.json";

const httpAuth = axios.create({
  baseURL: config.ApiEndPOint + "/auth/",
});
const authService = {
  signUp: async ({ email, password }) => {
    try {
      const data = await httpAuth.post("signUp", {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      return data;
    } catch (error) {
      console.log(error.response.data.error.message);
      if (error.response.data.error.message === "INVALID_PASSWORD") {
        return toast.error("Вы вели неверный пароль");
      }
      if (error.response.data.error.message === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        return toast.error("Вы сделали много попыток ,попробуйте позже");
      }
      if (error.response.data.error.message === "EMAIL_NOT_FOUND") {
        return toast.error("Такого email нет");
      }
    }
  },
  logIn: async ({ email, password }) => {
    try {
      const data = await httpAuth.post("signInWithPassword", {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      return data;
    } catch (e) {
      if (e.response.data.error.message === "INVALID_PASSWORD") {
        return toast.error("Вы вели неверный пароль");
      }
      if (e.response.data.error.message === "EMAIL_NOT_FOUND") {
        return toast.error("Такого email нет");
      }
      if (e.response.data.error.message === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        return toast.error("Вы сделали много попыток ,попробуйте позже");
      }
    }
  },

  refreshToken: async () => {
    const refreshToken = getRefrestTokent();
    const { data } = await httpAuth.post("token", {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });
    localStorageService.setTokens(data);
    return data;
  },
};

export default authService;

import axios from "axios";
import { toast } from "react-toastify";
import localStorageService, {
  getRefrestTokent,
  setTokens,
} from "./localStorage.service";
import config from "../config.json";

const authService = {
  signUp: async ({ email, password }) => {
    const url = config.ApiEndPOint + "/auth/" + "signUp";
    try {
      const data = axios.post(url, {
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
    const url = config.ApiEndPOint + "/auth/" + "signInWithPassword";
    try {
      const data = axios.post(url, {
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
    const url = config.ApiEndPOint + "/auth/" + "token";
    const refreshToken = getRefrestTokent();
    const { data } = await axios.post(url, {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });
    localStorageService.setTokens({
      refreshToken: data.refresh_token,
      idToken: data.id_token,
      localId: data.user_id,
      expiresIn: data.expires_in,
    });
    return data;
  },
};

export default authService;

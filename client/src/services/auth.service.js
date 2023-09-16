import httpService from "./http.service";
import { toast } from "react-toastify";
import localStorageService, {
  getRefrestTokent,
  setTokens,
} from "./localStorage.service";
import config from "../config.json";

const httpAuth = httpService.create({
  baseURL: config.ApiEndPOint + "/auth/",
});
const authService = {
  signUp: async (payload) => {
    try {
      const data = await httpAuth.post("signUp", payload);
      setTokens(data);
      return data;
    } catch (error) {
      console.log(error.response.data.error.message);
      if (error.response.data.error.message === "INVALID_PASSWORD") {
        return toast.error("Wrong password");
      }
      if (error.response.data.error.message === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        return toast.error("You make many trying , try later");
      }
      if (error.response.data.error.message === "EMAIL_NOT_FOUND") {
        return toast.error("this email not exist");
      }
    }
  },
  logIn: async (payload) => {
    try {
      const data = await httpAuth.post("signInWithPassword", payload);
      setTokens(data);
      return data;
    } catch (e) {
      if (e.response.data.error.message === "INVALID_PASSWORD") {
        return toast.error("Wrong password");
      }
      if (e.response.data.error.message === "EMAIL_NOT_FOUND") {
        return toast.error("This email not exist");
      }
      if (e.response.data.error.message === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        return toast.error("You make many trying , try later");
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

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import userService from "../services/user.service";
import localStorageService, {
  setTokens,
} from "../services/localStorage.service";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setUsers] = useState({});
  async function signUp({ email, password }) {
    const key = `AIzaSyCFKm-NzKP4yGvPnz2hgVWOjk0zxb4d_to`;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
    try {
      const { data } = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await createUser({ _id: data.localId, email });
    } catch (error) {
      console.log(error);
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const ErrorObject = {
            email: "Пользователь с таким email уже существует",
          };
          throw ErrorObject;
        }
      }
    }
  }

  async function logIn({ email, password }) {
    const key = "AIzaSyCFKm-NzKP4yGvPnz2hgVWOjk0zxb4d_to";
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
    try {
      const { data } = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      getUserData();
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        if (message === "INVALID_PASSWORD") {
          const errorObject = { password: "Неверный пароль" };
          throw errorObject;
        }
        if (message === "EMAIL_NOT_FOUND") {
          const errorObject = { email: "Неверный email" };
          throw errorObject;
        }
      }
    }
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      setUsers(content);
    } catch (error) {
      console.log(error);
    }
  }

  async function getUserData() {
    try {
      const data = await userService.getCurrentUser();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (localStorageService.getAccesToken()) {
      getUserData();
    }
  }, []);

  async function htttpAuth() {
    const key = "AIzaSyCFKm-NzKP4yGvPnz2hgVWOjk0zxb4d_to";
    const url = "https://securetoken.googleapis.com/v1/token?key=";
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefrestTokent();
    if (refreshToken && expiresDate < Date.now()) {
      const { data } = await axios.post(url + key, {
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      });
      console.log(data);
      localStorageService.setTokens({
        refreshToken: data.refresh_token,
        idToken: data.id_token,
        localId: data.user_id,
        expiresIn: data.expires_in,
      });
    }
  }
  useEffect(() => {
    htttpAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, currentUser, logIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

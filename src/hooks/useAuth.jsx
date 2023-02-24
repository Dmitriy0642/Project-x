import React, { useContext, useState } from "react";
import axios from "axios";
import userService from "../services/user.service";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState();
  const TOKEN_KEY = "jwt-token";
  const REFRESH_TOKEN = "jwt-refresh-token";
  const EXPIRES_KEY = "jwt-expires";
  function setTokens({ refreshToken, idToken, expiresIn = 3600 }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
  }
  async function signUp({ email, password, ...rest }) {
    const key = `AIzaSyCFKm-NzKP4yGvPnz2hgVWOjk0zxb4d_to`;
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
    try {
      const { data } = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      createUser({ _id: data.localId, email });
    } catch (error) {
      console.log(error);
    }
  }

  async function createUser(data) {
    try {
      const { content } = userService.create(data);
      setUsers(content);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ signUp }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

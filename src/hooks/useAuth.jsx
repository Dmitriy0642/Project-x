import React, { useContext, useState } from "react";
import axios from "axios";
import userService from "../services/user.service";
import { setTokens } from "../services/localStorage.service";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState();
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

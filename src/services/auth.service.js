import axios from "axios";
const key = "AIzaSyCFKm-NzKP4yGvPnz2hgVWOjk0zxb4d_to";

const authService = {
  signUp: async ({ email, password }) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`;
    const data = axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
  logIn: async ({ email, password }) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`;
    const data = axios.post(url, {
      email,
      password,
      returnSecureToken: true,
    });
    return data;
  },
};

export default authService;

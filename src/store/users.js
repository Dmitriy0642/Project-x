import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";

const userSlice = createSlice({
  name: "users",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    auth: null,
    isLoggedIn: false,
  },
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: usersReducer, actions } = userSlice;
const { usersRequested, usersReceved, usersRequestFiled } = actions;
export default usersReducer;

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const data = await userService.getCurrentUser();
    dispatch(usersReceved(data));
  } catch (error) {
    dispatch(usersRequestFiled(error.message));
  }
};

export const signUp =
  ({ email, password, fio }) =>
  async (dispatch) => {
    dispatch(usersRequested());
    try {
      const { data } = await authService.signUp({ email, password });
      localStorageService.setTokens(data);
      dispatch(usersReceved({ userId: data.localId }));
      await userService.create({
        _id: data.localId,
        email,
        fio,
        balance: 10000,
      });
      window.location.reload();
    } catch (error) {
      dispatch(usersRequestFiled(error.message));
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
  };

export const logIn =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(usersRequested());
    try {
      const { data } = await authService.logIn({ email, password });
      localStorageService.setTokens(data);
      dispatch(usersReceved({ userId: data.localId, balance: 10000 }));
      window.location.reload();
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
  };

export const logOut = () => () => {
  localStorageService.authRemoveData();
};

export const getCurrentUsers = () => (state) => state.users.entities;

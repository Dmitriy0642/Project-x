import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import { toast } from "react-toastify";
const userSlice = createSlice({
  name: "users",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    auth: null,
  },
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
      state.auth = true;
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequested: (state) => {
      state.error = null;
    },
    userLogOut: (state) => {
      state.entities = null;
      state.auth = null;
    },
  },
});

const { reducer: usersReducer, actions } = userSlice;
const { usersRequested, usersReceved, usersRequestFiled, userLogOut } = actions;
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
      if (error.response.data.error.message === "EMAIL_EXISTS") {
        return toast.error("Даннйы пользователь зарегестрирован");
      }
      if (error.response.data.error.message === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        return toast.error("Вы сделали много попыток ,попробуйте позже");
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
      if (error.response.data.error.message === "EMAIL_NOT_FOUND") {
        return toast.error("Такого email нет");
      }
      if (error.response.data.error.message === "INVALID_PASSWORD") {
        return toast.error("Вы вели неверный пароль");
      }

      if (error.response.data.error.message === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        return toast.error("Вы сделали много попыток ,попробуйте позже");
      }
      dispatch(usersRequestFiled(error.message));
    }
  };

export const logOut = () => (dispatch) => {
  localStorageService.authRemoveData();
  dispatch(userLogOut());
};

export const getCurrentUsers = () => (state) => state.users.entities;
export const getErrors = () => (state) => state.users.error;

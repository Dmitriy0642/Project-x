import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";

const userSlice = createSlice({
  name: "users",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
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

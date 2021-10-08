import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../common/utils/toasts";

import { RootState } from "../../redux/store";
import { IUser, IUserLogin } from "./types";

interface IUserState {
  info?: IUser;
  loading: boolean;
}

const initialState: IUserState = {
  loading: false,
};

export const login = createAsyncThunk('user/login', async (data: { username: string, password: string }) => {
  const response = await axios.post<IUserLogin, { data: IUser }>("/user/login", data);
  return response.data
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: state => {
      state = initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.info = action.payload
        showSuccessToast("Login success")
      })
      .addCase(login.rejected, (state, action) => {
        state = initialState
        console.log(action.payload || action.error.message, "ERROR")
        showErrorToast("Unable to login", action.error.message || "")
      })
  }
})

export const { reset } = userSlice.actions

export const userInfo = (state: RootState) => state.user.info
export const userLoading = (state: RootState) => state.user.loading

export default userSlice.reducer
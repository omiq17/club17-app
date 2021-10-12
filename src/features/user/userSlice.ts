import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../common/utils/toasts";

import { IError, ILoginAttributes, ILoginResult, IUser } from "./types";

interface IUserState {
  info?: IUser;
  loading: boolean;
}

const initialState: IUserState = {
  loading: false,
};

export const login = createAsyncThunk<
  ILoginResult,
  ILoginAttributes,
  {
    rejectValue: IError
  }
>('user/login', async (data, thunkApi) => {
  const response = await axios({
    method: "POST",
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/user/login`,
    data: data
  });

  if (response.status === 200) {
    return response.data
  } else {
    return thunkApi.rejectWithValue(response.data)
  }
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IUser>) => {
      state.info = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        const userInfo = action.payload.user
        state.loading = false
        state.info = userInfo
        showSuccessToast("Login success")

        // set data to local storage
        localStorage.setItem("club17app.user", JSON.stringify(userInfo))
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        const errorMessage = action.payload?.message || action.error.message
        console.log(errorMessage, "ERROR")
        showErrorToast("Unable to login", errorMessage)
      })
  }
})

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer
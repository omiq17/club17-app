import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../common/utils/toasts";

import { RootState } from "../../redux/store";
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
    url: `${process.env.SERVER_URL}/v1/user/login`,
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
        state.info = action.payload.user
        showSuccessToast("Successfully logged in")
      })
      .addCase(login.rejected, (state, action) => {
        state = initialState
        const errorMessage = action.payload.message || action.error.message
        console.log(errorMessage, "ERROR")
        showErrorToast("Unable to login", errorMessage)
      })
  }
})

export const { reset } = userSlice.actions

export const userInfo = (state: RootState) => state.user.info
export const userLoading = (state: RootState) => state.user.loading

export default userSlice.reducer
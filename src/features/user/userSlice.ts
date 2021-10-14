import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../../common/utils/toasts";

import { IError, ILoginAttributes, ILoginResult, ISignupAttributes, ISignupResult, IUser } from "./types";

interface IUserState {
  info?: IUser;
  loading: boolean;
  auth: {
    checked: boolean;
    success: boolean;
  }
}

const initialState: IUserState = {
  loading: false,
  auth: {
    checked: false,
    success: false
  }
};

export const login = createAsyncThunk<
  ILoginResult,
  ILoginAttributes,
  {
    rejectValue: IError
  }
>('user/login', async (data, thunkApi) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/user/login`,
      data: data
    });
    return response.data
  } catch (err) {
    return thunkApi.rejectWithValue(err.response.data)

  }
})

export const signup = createAsyncThunk<
  ISignupResult,
  ISignupAttributes,
  {
    rejectValue: IError
  }
>('user/signup', async (data, thunkApi) => {
  try {
    const response = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/user/signup`,
      data: data
    });
    return response.data
  } catch (err) {
    return thunkApi.rejectWithValue(err.response.data)

  }
})

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<IUser>) => {
      state.info = action.payload
      state.auth = {
        checked: true,
        success: true
      }
    },
    setAuthCheckingError: (state) => {
      state.auth = {
        checked: true,
        success: false
      }
    },
    logout: (state) => {
      // remove user info from local storage
      localStorage.removeItem("club17app.user")
      state.info = undefined
    }
  },
  extraReducers: (builder) => {
    builder
      // Login cases
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
        showErrorToast("Unable to login", errorMessage)
      })
      // Signup cases
      .addCase(signup.pending, (state) => {
        state.loading = true
      })
      .addCase(signup.fulfilled, (state) => {
        state.loading = false
        showSuccessToast("Signup success. Please login now")
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false
        const errorMessage = action.payload?.message || action.error.message
        showErrorToast("Unable to signup", errorMessage)
      })
  }
})

export const { setUserInfo, setAuthCheckingError, logout } = userSlice.actions

export default userSlice.reducer
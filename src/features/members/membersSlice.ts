import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";

import { showErrorToast, showSuccessToast } from "../../common/utils/toasts";
import {
  IAddMemberAttributes, IAddMemberResponse, IAddMemberResult, IError,
  IGetMembersResult, IMember, IRemoveMemberAttributes, IUpdateMemberAttributes
} from "./types";

interface IMemberState {
  list: IMember[];
  loading: boolean;
}

const initialState: IMemberState = {
  list: [],
  loading: false,
};

export const getMembersList = createAsyncThunk<
  IGetMembersResult,
  string,
  {
    rejectValue: IError
  }
>('member/list', async (token, thunkApi) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/member/list`,
      headers: {
        "x-access-token": token
      }
    });
    return response.data
  } catch (err) {
    return thunkApi.rejectWithValue(err.response.data)

  }
})


export const addMember = createAsyncThunk<
  IAddMemberResult,
  IAddMemberAttributes,
  {
    rejectValue: IError
  }
>('member/add', async (data, thunkApi) => {
  try {
    const { token, ...memberData } = data
    const response = await axios({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/member/add`,
      data: memberData,
      headers: {
        "x-access-token": token
      }
    });
    const result: IAddMemberResponse = response.data
    return { newMember: { ...memberData, _id: result._id } }
  } catch (err) {
    return thunkApi.rejectWithValue(err.response.data)

  }
})

export const updateMember = createAsyncThunk<
  IMember,
  IUpdateMemberAttributes,
  {
    rejectValue: IError
  }
>('member/update', async (data, thunkApi) => {
  try {
    const { token, _id, ...memberData } = data
    await axios({
      method: "PUT",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/member/update/info/${_id}`,
      data: memberData,
      headers: {
        "x-access-token": token
      }
    });
    return { ...memberData, _id }
  } catch (err) {
    return thunkApi.rejectWithValue(err.response.data)
  }
})

export const removeMember = createAsyncThunk<
  string,
  IRemoveMemberAttributes,
  {
    rejectValue: IError
  }
>('member/remove', async (data, thunkApi) => {
  try {
    await axios({
      method: "DELETE",
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/v1/member/delete/${data.id}`,
      headers: {
        "x-access-token": data.token
      }
    });
    return data.id
  } catch (err) {
    return thunkApi.rejectWithValue(err.response.data)

  }
})


export const membersSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    activeLoading: (state) => {
      state.loading = true
    },
    deActiveLoading: (state) => {
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    builder
      // Get members list cases
      .addCase(getMembersList.pending, (state) => {
        state.loading = true
      })
      .addCase(getMembersList.fulfilled, (state, action) => {
        state.list = action.payload.members
        state.loading = false
      })
      .addCase(getMembersList.rejected, (state, action) => {
        state.loading = false
        const errorMessage = action.payload?.message || action.error.message
        showErrorToast("Unable to get members list", errorMessage)
      })
      // Add member cases
      .addCase(addMember.pending, (state) => {
        state.loading = true
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.list.push(action.payload.newMember)
        state.loading = false
        showSuccessToast("Successfully added new member")
      })
      .addCase(addMember.rejected, (state, action) => {
        state.loading = false
        const errorMessage = action.payload?.message || action.error.message
        showErrorToast("Unable to add member", errorMessage)
      })
      // Update member cases
      .addCase(updateMember.pending, (state) => {
        state.loading = true
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.list = state.list.map((item) => item._id === action.payload._id ? action.payload : item)
        state.loading = false
        showSuccessToast("Successfully updated member data")
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.loading = false
        const errorMessage = action.payload?.message || action.error.message
        showErrorToast("Unable to update member data", errorMessage)
      })
      // Remove member cases
      .addCase(removeMember.pending, (state) => {
        state.loading = true
      })
      .addCase(removeMember.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item._id !== action.payload)
        state.loading = false
        showSuccessToast("Successfully removed the member")
      })
      .addCase(removeMember.rejected, (state, action) => {
        state.loading = false
        const errorMessage = action.payload?.message || action.error.message
        showErrorToast("Unable to remove member", errorMessage)
      })
  }
})

export const { activeLoading, deActiveLoading } = membersSlice.actions

export default membersSlice.reducer
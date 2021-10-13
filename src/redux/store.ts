import { configureStore } from '@reduxjs/toolkit'
import membersReducer from '../features/members/membersSlice'
import userReducer from '../features/user/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    members: membersReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
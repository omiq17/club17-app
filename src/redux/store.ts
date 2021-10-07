import { configureStore } from '@reduxjs/toolkit'
// ...

const store = configureStore({
  reducer: {
    // users: usersReducer,
    // members: membersReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
import { configureStore } from "@reduxjs/toolkit";
import user from './user/userReducer'
import load from './load/loadReducer'

export const store = configureStore({
  reducer: {
    user,
    load
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

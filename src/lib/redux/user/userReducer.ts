import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import {UserState} from "../../../types/userState-types"
import { UserEmailConnexionQuery, UserFacebookConnexionQuery, UserGoogleConnexionQuery, UserQuery } from "../../../types/user-types";

const initialState: UserState = {
  infos: null,
  userEmail: null,
  userFacebook: null,
  userGoogle: null,
  isLogged: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (
        state, 
        action: PayloadAction<{user: UserQuery, userEmail: UserEmailConnexionQuery} | {user: UserQuery, userFacebook: UserFacebookConnexionQuery} | {user: UserQuery, userGoogle: UserGoogleConnexionQuery}>) => {
        console.log("payload", action.payload)
        state.infos = action.payload.user;

        if("userEmail" in action.payload) {
            state.userEmail = action.payload.userEmail;
        }

        if("userFacebook" in action.payload) {
            state.userFacebook = action.payload.userFacebook;
        }

        if("userGoogle" in action.payload) {
            state.userGoogle = action.payload.userGoogle;
        }

        state.isLogged = true;
    },
    logoutUser: (state, action: PayloadAction<null>) => {
        state.infos = null;
        state.userEmail = null;
        state.userFacebook = null;
        state.userGoogle = null;
        state.isLogged = false;
      },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;

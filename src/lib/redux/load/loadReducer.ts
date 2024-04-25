import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { UserEmailConnexionQuery } from "../../../types/user/user-email-types";
import { UserFacebookConnexionQuery } from "../../../types/user/user-facebook-types";
import { UserGoogleConnexionQuery } from "../../../types/user/user-google-types";

const initialState: {isLoading: boolean} = {
  isLoading: false
};

export const loadSlice = createSlice({
  name: "load",
  initialState,
  reducers: { 
    changeIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
});

export const { changeIsLoading } = loadSlice.actions;
export const selectLoad= (state: RootState) => state.load;
export default loadSlice.reducer;

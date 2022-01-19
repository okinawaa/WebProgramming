import { createSlice } from "@reduxjs/toolkit";
import { getUserInfo, signIn } from "./authThunk";

export interface InitialStateType {
    userInfo: AuthModule.UserDto | null;
    accessToken: string | null;
    signInLoading: boolean;
    signInError: boolean;
    token: string;
    errorMsg: string;
}

const initialState: InitialStateType = {
    userInfo: null,
    accessToken: null,
    signInLoading: false,
    signInError: false,
    token: "",
    errorMsg: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(signIn.pending, (state) => {
                state.signInLoading = true;
                state.signInError = false;
                state.userInfo = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.signInLoading = false;
                state.signInError = false;
                state.token = action.payload.token;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.signInLoading = false;
                state.signInError = true;
            })
            .addCase(getUserInfo.fulfilled, () => {});
    },
});

export const {} = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "store";

export const signIn = createAsyncThunk<
    {
        token: string;
    },
    {
        email: string;
        password: string;
    }
>("auth/signIn", async (payload, { rejectWithValue }) => {
    try {
        console.log(payload);
        return {
            token: "asdkljhalskd",
        };
    } catch (error) {
        console.log(error);
        return rejectWithValue(error);
    }
});

export const getUserInfo = createAsyncThunk<any, any>(
    "auth/getUserInfo",
    () => {},
);

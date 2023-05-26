import { createSlice } from "@reduxjs/toolkit";
import { ArgLogin, ArgRegister, ProfileType, authApi } from "./auth.api";
import { createAppAsyncThunk } from "features/common/utils/create-app-async-thunk";

const register = createAppAsyncThunk<void, ArgRegister>(
  "auth/register",
  async (arg, thunkAPI) => {
    const res = await authApi.register(arg);
    console.log(res.data);
  }
);

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLogin>(
  "auth/login",
  async (arg, thunkAPI) => {
    const res = await authApi.login(arg);
    return { profile: res.data };
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
  },
});

export const authReducer = slice.reducer;
export const authThunks = { register, login };

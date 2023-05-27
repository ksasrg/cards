import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ArgLogin,
  ArgRegister,
  LogoutType,
  ProfileType,
  authApi,
} from "./auth.api";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { appActions } from "app/app.slice";

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

const me = createAppAsyncThunk<{ profile: ProfileType }, void>(
  "auth/me",
  async (_, { dispatch }) => {
    const res = await authApi.me();
    dispatch(authActions.setIsAuthorized({ isAuthorized: true }));
    dispatch(appActions.setIsAppInitialized({ isAppInitialized: true }));
    return { profile: res.data };
  }
);

const logout = createAppAsyncThunk<LogoutType, void>(
  "auth/logout",
  async () => {
    const res = await authApi.logout();
    return res.data;
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    isAuthorized: false,
  },
  reducers: {
    setIsAuthorized: (
      state,
      action: PayloadAction<{ isAuthorized: boolean }>
    ) => {
      state.isAuthorized = action.payload.isAuthorized;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isAuthorized = true;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.profile = null;
        state.isAuthorized = false;
      });
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { register, login, me, logout };

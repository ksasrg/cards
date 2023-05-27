import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ArgLogin,
  ArgRegister,
  ArgForgot,
  LogoutType,
  ProfileType,
  authApi,
  ArgUpdate,
} from "./auth.api";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { appActions } from "app/app.slice";
import axios, { AxiosError } from "axios";

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

const update = createAppAsyncThunk<{ profile: ProfileType }, ArgUpdate>(
  "auth/update",
  async (arg, thunkAPI) => {
    const res = await authApi.update(arg);
    return { profile: res.data.updatedUser };
  }
);

const me = createAppAsyncThunk<{ profile: ProfileType }, void>(
  "auth/me",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await authApi.me();
      dispatch(authActions.setIsAuthorized({ isAuthorized: true }));
      return { profile: res.data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // console.log(error.response.data.error);
      }
      return rejectWithValue("error");
    } finally {
      dispatch(appActions.setIsAppInitialized({ isAppInitialized: true }));
    }
  }
);

const logout = createAppAsyncThunk<LogoutType, void>(
  "auth/logout",
  async () => {
    const res = await authApi.logout();
    return res.data;
  }
);

const forgot = createAppAsyncThunk<void, ArgForgot>(
  "auth/forgot",
  async (arg) => {
    const res = await authApi.forgot(arg);
    console.log(res.data); // TODO

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
      })
      .addCase(update.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      });
  },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { register, login, me, logout, forgot, update };

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
import { setAppError } from "common/utils/setAppError";

const register = createAppAsyncThunk<void, ArgRegister>(
  "auth/register",
  async (arg, thunkAPI) => {
    try {
      const res = await authApi.register(arg);
      console.log(res.data); // TODO
    } catch (error) {
      return setAppError(error, thunkAPI);
    }
  }
);

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLogin>(
  "auth/login",
  async (arg, thunkAPI) => {
    try {
      const res = await authApi.login(arg);
      return { profile: res.data };
    } catch (error) {
      return setAppError(error, thunkAPI);
    }
  }
);

const update = createAppAsyncThunk<{ profile: ProfileType }, ArgUpdate>(
  "auth/update",
  async (arg, thunkAPI) => {
    try {
      const res = await authApi.update(arg);
      return { profile: res.data.updatedUser };
    } catch (error) {
      return setAppError(error, thunkAPI);
    }
  }
);

const me = createAppAsyncThunk<{ profile: ProfileType }, void>(
  "auth/me",
  async (_, thunkAPI) => {
    try {
      const res = await authApi.me();
      thunkAPI.dispatch(authActions.setIsAuthorized({ isAuthorized: true }));
      return { profile: res.data };
    } catch (error) {
      return thunkAPI.rejectWithValue("error");
    } finally {
      thunkAPI.dispatch(
        appActions.setIsAppInitialized({ isAppInitialized: true })
      );
    }
  }
);

const logout = createAppAsyncThunk<LogoutType, void>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const res = await authApi.logout();
      return res.data;
    } catch (error) {
      return setAppError(error, thunkAPI);
    }
  }
);

const forgot = createAppAsyncThunk<void, ArgForgot>(
  "auth/forgot",
  async (arg, thunkAPI) => {
    try {
      const res = await authApi.forgot(arg);
      console.log(res.data); // TODO
      return res.data;
    } catch (error) {
      return setAppError(error, thunkAPI);
    }
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

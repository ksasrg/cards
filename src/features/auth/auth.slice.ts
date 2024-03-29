import { createSlice } from "@reduxjs/toolkit";
import {
  ArgLogin,
  ArgRegister,
  ArgForgot,
  LogoutType,
  ProfileType,
  authApi,
  ArgUpdate,
  ForgotType,
  ArgSetPass,
  RegisterResponse,
} from "./auth.api";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import axios from "axios";

const register = createAppAsyncThunk<RegisterResponse, ArgRegister>(
  "auth/register",
  async (arg, thunkAPI) => {
    try {
      const res = await authApi.register(arg);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
      return thunkAPI.rejectWithValue(error);
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
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const setPass = createAppAsyncThunk<{ profile: ProfileType }, ArgSetPass>(
  "auth/set-pass",
  async (arg, thunkAPI) => {
    try {
      const res = await authApi.setPass(arg);
      return { profile: res.data.updatedUser };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const me = createAppAsyncThunk<{ profile: ProfileType }, void>(
  "auth/me",
  async (_, thunkAPI) => {
    try {
      const res = await authApi.me();
      return { profile: res.data };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return thunkAPI.rejectWithValue("");
      }
      return thunkAPI.rejectWithValue(error);
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
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const forgot = createAppAsyncThunk<ForgotType, ArgForgot>(
  "auth/forgot",
  async (arg, thunkAPI) => {
    try {
      const res = await authApi.forgot(arg);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    isAuthorized: false,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isAuthorized = true;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.isAuthorized = true;
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
export const authThunks = {
  register,
  login,
  me,
  logout,
  forgot,
  update,
  setPass,
};

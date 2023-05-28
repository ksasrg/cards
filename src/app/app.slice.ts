import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";

const slice = createSlice({
  name: "app",
  initialState: {
    error: null as string | null,
    isAppInitialized: false,
    isLoading: false,
  },
  reducers: {
    setIsAppInitialized: (
      state,
      action: PayloadAction<{ isAppInitialized: boolean }>
    ) => {
      state.isAppInitialized = action.payload.isAppInitialized;
    },
    setError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          const err = action.payload as Error | AxiosError<{ error: string }>;
          if (isAxiosError(err)) {
            state.error = err.response ? err.response.data.error : err.message;
          } else if (err) {
            state.error = `Native error ${err.message}`;
          }
          state.isLoading = false;
          state.isAppInitialized = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state) => {
          state.isLoading = false;
          state.isAppInitialized = true;
        }
      );
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

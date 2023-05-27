import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "app",
  initialState: {
    error: null as string | null,
    isAppInitialized: false,
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
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

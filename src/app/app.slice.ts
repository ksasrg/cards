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
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;

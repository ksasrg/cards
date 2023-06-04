import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { ArgGetCards, Card, GetResponse, cardsApi } from "./cards.api";

const initialState = {
  list: { cards: [] as Card[] } as GetResponse,
};

export const slice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    resetList: (state, action: PayloadAction<void>) => {
      state.list = { cards: [] as Card[] } as GetResponse;
    },
  },
  extraReducers(builder) {
    builder.addCase(get.fulfilled, (state, action) => {
      state.list = { ...action.payload };
    });
  },
});

const get = createAppAsyncThunk<GetResponse, ArgGetCards>(
  "cards/get-cards",
  async (arg, thunkAPI) => {
    try {
      const res = await cardsApi.getCards(arg);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const cardsReducers = slice.reducer;
export const cardsActions = slice.actions;
export const cardsThunks = { get };

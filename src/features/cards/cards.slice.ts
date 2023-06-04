import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { ArgGetCards, Card, GetResponse, cardsApi } from "./cards.api";

const initialState = {
  list: { cards: [] as Card[] } as GetResponse,
  query: {} as ArgGetCards,
};

export const slice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setQuery: (
      state,
      action: PayloadAction<{ query: Partial<ArgGetCards> }>
    ) => {
      state.query = { ...state.query, ...action.payload.query };
    },
  },
  extraReducers(builder) {
    builder.addCase(get.fulfilled, (state, action) => {
      state.list = { ...action.payload };
      state.query.page && (state.query.page = action.payload.page); // TODO remember why
    });
  },
});

const get = createAppAsyncThunk<GetResponse, ArgGetCards>(
  "cards/get-cards",
  async (arg, thunkAPI) => {
    try {
      const query = { ...thunkAPI.getState().cards.query, ...arg };
      const res = await cardsApi.getCards(query);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const cardsReducers = slice.reducer;
export const cardsActions = slice.actions;
export const cardsThunks = { get };

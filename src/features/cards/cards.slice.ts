import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import {
  ArgGetCards,
  ArgPostCard,
  Card,
  GetResponse,
  PostResponse,
  cardsApi,
} from "./cards.api";

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
  "cards/get",
  async (arg, thunkAPI) => {
    try {
      const res = await cardsApi.getCards(arg);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const create = createAppAsyncThunk<
  PostResponse,
  { payload: ArgPostCard; query: ArgGetCards }
>("cards/create", async (arg, thunkAPI) => {
  try {
    const res = await cardsApi.createCard(arg.payload);

    const page = thunkAPI.getState().cards.list.page;
    if (page === 1) await thunkAPI.dispatch(get({ ...arg.query }));

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const cardsReducers = slice.reducer;
export const cardsActions = slice.actions;
export const cardsThunks = { get, create };

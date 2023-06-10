import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import {
  ArgGetCards,
  ArgPostCard,
  Card,
  DeleteResponse,
  GetResponse,
  PostResponse,
  PutGradeResponse,
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
    await thunkAPI.dispatch(get(arg.query));
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const deleteCard = createAppAsyncThunk<
  DeleteResponse,
  { cardId: string; query: ArgGetCards }
>("cards/delete", async (arg, thunkAPI) => {
  try {
    const res = await cardsApi.deleteCard(arg.cardId);
    await thunkAPI.dispatch(get(arg.query));
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const putGrade = createAppAsyncThunk<
  PutGradeResponse,
  { card_id: string; grade: number }
>("cards/put-grade", async (arg, thunkAPI) => {
  try {
    const res = await cardsApi.putGrade(arg.card_id, arg.grade);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const cardsReducers = slice.reducer;
export const cardsActions = slice.actions;
export const cardsThunks = { get, create, deleteCard, putGrade };

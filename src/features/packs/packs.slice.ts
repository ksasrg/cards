import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import {
  ArgChangeCardPack,
  ArgCreateCardPack,
  ArgGetPacks,
  packsApi,
} from "./packs.api";

const initialState = {
  list: {
    cardPacks: [] as CardPack[],
    page: 0,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: "",
    tokenDeathTime: 0,
  },
  checkUpdate: 0,
  editUpdate: 0,
};

export const slice = createSlice({
  name: "packs",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(get.fulfilled, (state, action) => {
        state.list = { ...action.payload };
      })
      .addCase(deletePack.fulfilled, (state, action) => {
        state.checkUpdate = state.checkUpdate + 1;
      })
      .addCase(change.fulfilled, (state, action) => {
        state.editUpdate = state.editUpdate + 1;
      });
  },
});

const get = createAppAsyncThunk<GetCardPack, ArgGetPacks>(
  "packs/get-packs",
  async (arg, thunkAPI) => {
    try {
      const res = await packsApi.getPacks(arg);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const deletePack = createAppAsyncThunk<DeleteCardPack, { packId: string }>(
  "packs/delete-pack",
  async (arg, thunkAPI) => {
    try {
      const res = await packsApi.delete(arg.packId);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const create = createAppAsyncThunk<
  CreateCardPack,
  { payload: ArgCreateCardPack; query: ArgGetPacks }
>("packs/create-pack", async (arg, thunkAPI) => {
  try {
    const res = await packsApi.create(arg.payload);
    await thunkAPI.dispatch(get(arg.query));
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const change = createAppAsyncThunk<
  CreateCardPack,
  { payload: ArgChangeCardPack }
>("packs/create-pack", async (arg, thunkAPI) => {
  try {
    const res = await packsApi.changePack(arg.payload);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export interface GetCardPack {
  cardPacks: CardPack[];
  page: number;
  pageCount: number;
  cardPacksTotalCount: number;
  minCardsCount: number;
  maxCardsCount: number;
  token: string;
  tokenDeathTime: number;
}

export interface CreateCardPack {
  newCardsPack: CardPack;
  token: string;
  tokenDeathTime: number;
}

export interface DeleteCardPack {
  deletedCardsPack: CardPack;
  token: string;
  tokenDeathTime: number;
}

export interface CardPack {
  _id: string;
  user_id: string;
  user_name: string;
  private: boolean;
  name: string;
  path: string;
  grade: number;
  shots: number;
  deckCover?: string;
  cardsCount: number;
  type: string;
  rating: number;
  created: string;
  updated: string;
  more_id: string;
  __v: number;
}

export const packsReducers = slice.reducer;
export const packsActions = slice.actions;
export const packsThunks = { get, deletePack, create, change };

import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { ArgGetPacks, packsApi } from "./packs.api";

export const slice = createSlice({
  name: "packs",
  initialState: {
    packs: {
      cardPacks: [] as CardPack[],
      page: 0,
      pageCount: 0,
      cardPacksTotalCount: 0,
      minCardsCount: 0,
      maxCardsCount: 0,
      token: "",
      tokenDeathTime: 0,
    },
  },

  reducers: {},
  extraReducers(builder) {
    builder.addCase(get.fulfilled, (state, action) => {
      state.packs = { ...action.payload };
    });
  },
});

const get = createAppAsyncThunk<GetCardPack, ArgGetPacks>(
  "packs/get-packs",
  async (arg, thunkAPI) => {
    try {
      const res = await packsApi.getPacks(arg);
      console.log(res.data); // TODO

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// TODO types GetCardPack
const deletePack = createAppAsyncThunk<
  GetCardPack,
  { packId: string; params: ArgGetPacks }
>("packs/delete-pack", async (arg, thunkAPI) => {
  try {
    const res = await packsApi.delete(arg.packId);
    await thunkAPI.dispatch(get(arg.params));
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// TODO types GetCardPack
const create = createAppAsyncThunk<GetCardPack, void>(
  "packs/create-pack",
  async (arg, thunkAPI) => {
    try {
      const res = await packsApi.create();

      await thunkAPI.dispatch(get({})); // TODO query

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

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
export const packsThunks = { get, deletePack, create };

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { ArgCreateCardPack, ArgGetPacks, packsApi } from "./packs.api";

export type PackListQuery = {
  page?: number | undefined;
  pageCount?: number | undefined;
  packName?: string | undefined;
  min?: number | undefined;
  max?: number | undefined;
  sortPacks?: string | undefined;
  user_id?: string | undefined;
};

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
  query: {} as PackListQuery,
};

export const slice = createSlice({
  name: "packs",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<{ query: PackListQuery }>) => {
      state.query = { ...state.query, ...action.payload.query };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(get.fulfilled, (state, action) => {
        state.list = { ...action.payload };
        state.query.page && (state.query.page = action.payload.page); // TODO remember why
      })
      .addCase(create.fulfilled, (state, action) => {
        state.query = { pageCount: state.query.pageCount };
      });
  },
});

const get = createAppAsyncThunk<GetCardPack, ArgGetPacks | undefined>(
  "packs/get-packs",
  async (arg, thunkAPI) => {
    try {
      const query = { ...thunkAPI.getState().packs.query, ...arg };
      const res = await packsApi.getPacks(query);
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
      await thunkAPI.dispatch(get());
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const create = createAppAsyncThunk<CreateCardPack, ArgCreateCardPack>(
  "packs/create-pack",
  async (arg, thunkAPI) => {
    try {
      const res = await packsApi.create(arg);

      const page = thunkAPI.getState().packs.list.page;
      if (page === 1) await thunkAPI.dispatch(get({ page: 1 }));

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
export const packsThunks = { get, deletePack, create };

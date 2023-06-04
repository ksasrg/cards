import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { appReducer } from "./app.slice";
import { authReducer } from "features/auth/auth.slice";
import { packsReducers } from "features/packs/packs.slice";
import { cardsReducers } from "features/cards/cards.slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    packs: packsReducers,
    cards: cardsReducers,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

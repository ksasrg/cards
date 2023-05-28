import { appActions } from "app/app.slice";
import { AppDispatch } from "app/store";
import axios from "axios";

type ThunkAPI = {
  dispatch: AppDispatch;
  rejectWithValue: any; // ToODO any
};

export const setAppError = (error: unknown, thunkAPI: ThunkAPI) => {
  let message = "";
  if (axios.isAxiosError(error) && error.response) {
    message = error.response.data.error;
  } else {
    message = (error as Error).message;
  }

  thunkAPI.dispatch(appActions.setError({ error: message }));

  return thunkAPI.rejectWithValue(message);
};

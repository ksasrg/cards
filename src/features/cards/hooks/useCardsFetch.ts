import { useAppDispatch } from "app/hooks";
import { useSearchParams } from "react-router-dom";
import { ArgGetCards } from "../cards.api";
import { useEffect } from "react";
import { cardsActions, cardsThunks } from "../cards.slice";

export const useCardsFetch = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const params: ArgGetCards = Object.fromEntries(searchParams);

  useEffect(
    () => {
      dispatch(cardsThunks.get(params));

      return () => {
        dispatch(cardsActions.resetList());
      };
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [dispatch]
    /* eslint-enable react-hooks/exhaustive-deps */
  );
};

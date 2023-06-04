import { useAppDispatch } from "app/hooks";
import { useSearchParams } from "react-router-dom";
import { ArgGetCards } from "../cards.api";
import { useEffect } from "react";
import { cardsActions, cardsThunks } from "../cards.slice";

export const useCardsFetch = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const params: ArgGetCards = Object.fromEntries(searchParams);

  useEffect(() => {
    return () => {
      dispatch(cardsActions.resetList());
    };
  }, [dispatch]);

  useEffect(
    () => {
      dispatch(cardsThunks.get(params));
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [
      dispatch,
      params.min,
      params.max,
      params.page,
      params.pageCount,
      params.cardsPack_id,
      params.sortCards,
      params.cardAnswer,
      params.cardQuestion,
    ]
    /* eslint-enable react-hooks/exhaustive-deps */
  );
};

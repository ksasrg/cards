import { useAppDispatch } from "app/hooks";
import { useSearchParams } from "react-router-dom";
import { ArgGetCards } from "../cards.api";
import { useEffect } from "react";
import { cardsActions } from "../cards.slice";

export const useCardsSetSearchParams = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const params: Partial<ArgGetCards> = Object.fromEntries(searchParams);

  useEffect(
    () => {
      const query: Partial<ArgGetCards> = {};
      params.min && (query["min"] = Number(params.min));
      params.max && (query["max"] = Number(params.max));
      params.page && (query["page"] = Number(params.page));
      params.pageCount && (query["pageCount"] = Number(params.pageCount));
      params.sortCards && (query["sortCards"] = params.sortCards);
      params.cardAnswer && (query["cardAnswer"] = params.cardAnswer);
      params.cardQuestion && (query["cardQuestion"] = params.cardQuestion);
      params.cardsPack_id && (query["cardsPack_id"] = params.cardsPack_id);

      dispatch(cardsActions.setQuery({ query }));

      return () => {
        dispatch(
          cardsActions.setQuery({
            query: { page: undefined, cardsPack_id: undefined },
          })
        );
        dispatch(cardsActions.resetList());
      };
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [dispatch]
    /* eslint-enable react-hooks/exhaustive-deps */
  );
};

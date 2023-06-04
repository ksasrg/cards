import { useAppDispatch, useAppSelector } from "app/hooks";
import { useSearchParams } from "react-router-dom";
import { ArgGetCards } from "../cards.api";
import { useEffect } from "react";
import { cardsThunks } from "../cards.slice";

export const useCardsFetch = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params: Partial<ArgGetCards> = Object.fromEntries(searchParams);

  const min = useAppSelector((state) => state.cards.query.min);
  const max = useAppSelector((state) => state.cards.query.max);
  const page = useAppSelector((state) => state.cards.query.page);
  const pageCount = useAppSelector((state) => state.cards.query.pageCount);
  const sortCards = useAppSelector((state) => state.cards.query.sortCards);
  const cardAnswer = useAppSelector((state) => state.cards.query.cardAnswer);
  const cardsPack_id = useAppSelector(
    (state) => state.cards.query.cardsPack_id
  );
  const cardQuestion = useAppSelector(
    (state) => state.cards.query.cardQuestion
  );

  useEffect(
    () => {
      const searchParams = { ...params } as Record<string, string>;
      min && (searchParams["min"] = min.toString());
      max && (searchParams["max"] = max.toString());
      page && (searchParams["page"] = page.toString());
      pageCount && (searchParams["pageCount"] = pageCount.toString());
      sortCards && (searchParams["sortCards"] = sortCards.toString());
      cardAnswer && (searchParams["cardAnswer"] = cardAnswer.toString());
      cardQuestion && (searchParams["cardQuestion"] = cardQuestion.toString());
      setSearchParams(searchParams);

      cardsPack_id && dispatch(cardsThunks.get({ cardsPack_id }));
    },
    /* eslint-disable react-hooks/exhaustive-deps */
    [
      dispatch,
      min,
      max,
      page,
      pageCount,
      cardsPack_id,
      sortCards,
      cardAnswer,
      cardQuestion,
    ]
    /* eslint-enable react-hooks/exhaustive-deps */
  );
};

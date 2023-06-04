import { useAppDispatch, useAppSelector } from "app/hooks";
import { useSearchParams } from "react-router-dom";
import { ArgGetCards } from "../cards.api";
import { useEffect } from "react";
import { cardsThunks } from "../cards.slice";

export const useFetchCards = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const params: Partial<ArgGetCards> = Object.fromEntries(searchParams);
  const { cardsPack_id } = params;

  const page = useAppSelector((state) => state.cards.query.page);
  const pageCount = useAppSelector((state) => state.cards.query.pageCount);

  useEffect(() => {
    cardsPack_id && dispatch(cardsThunks.get({ cardsPack_id }));
    console.log("fhfg");
  }, [dispatch, cardsPack_id, page, pageCount]);
};

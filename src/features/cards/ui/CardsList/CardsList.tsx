import Button from "@mui/material/Button/Button";
import { useAppDispatch, useAppSelector } from "app/hooks";
import s from "./style.module.css";
import { CardsTable } from "features/cards/components/CardsTable/CardsTable";
import { cardsActions } from "features/cards/cards.slice";
import {
  AppPagination,
  PaginationQuery,
} from "common/components/AppPagination/AppPagination";
import { useFetchCards } from "features/cards/hooks/useFetchCards";

export const CardsList = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.cards.list.page);
  const pageCount = useAppSelector((state) => state.cards.list.pageCount);
  const totalCount = useAppSelector(
    (state) => state.cards.list.cardsTotalCount
  );

  useFetchCards();

  const onChange = (query: PaginationQuery) => {
    dispatch(cardsActions.setQuery({ query }));
  };

  return (
    <div className="container page">
      <div className={s.up}>
        <div className={s.title}>Friend’s Pack</div>
        <Button>Learn</Button>
      </div>

      <AppPagination onChange={onChange} {...{ page, pageCount, totalCount }} />
      <div className={s.filters}>{/* <SearchPacks /> */}</div>

      <CardsTable />
    </div>
  );
};

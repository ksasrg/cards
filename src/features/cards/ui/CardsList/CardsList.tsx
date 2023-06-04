import Button from "@mui/material/Button/Button";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { CardsTable } from "features/cards/components/CardsTable/CardsTable";
import { cardsActions } from "features/cards/cards.slice";
import { AppPagination, BackLink, PaginationQuery } from "common/components";
import { useCardsFetch } from "features/cards/hooks/useCardsFetch";
import { useCardsSetSearchParams } from "features/cards/hooks/useCardsSetSearchParams";
import s from "./style.module.css";

export const CardsList = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.cards.list.page);
  const pageCount = useAppSelector((state) => state.cards.list.pageCount);
  const totalCount = useAppSelector(
    (state) => state.cards.list.cardsTotalCount
  );

  useCardsSetSearchParams();
  useCardsFetch();

  const onChange = (query: PaginationQuery) => {
    dispatch(cardsActions.setQuery({ query }));
  };

  return (
    <div className="container page">
      <BackLink />
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

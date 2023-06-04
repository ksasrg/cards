import Button from "@mui/material/Button/Button";
import { useAppDispatch, useAppSelector } from "app/hooks";
import s from "./style.module.css";
import { CardsTable } from "features/cards/components/CardsTable/CardsTable";
import { cardsActions } from "features/cards/cards.slice";
import {
  CardsPagination,
  PaginationQuery,
} from "features/cards/components/CardsPagination/CardsPagination";
import { useFetchCards } from "features/cards/hooks/useFetchCards";

export const CardsList = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.cards.list.page);
  const pageCount = useAppSelector((state) => state.cards.list.pageCount);
  const cardsTotalCount = useAppSelector(
    (state) => state.cards.list.cardsTotalCount
  );

  useFetchCards();

  const onChange = (query: PaginationQuery) => {
    console.log(query);
    dispatch(cardsActions.setQuery({ query }));
  };

  return (
    <div className="container page">
      <div className={s.up}>
        <div className={s.title}>Friend’s Pack</div>
        <Button>Learn</Button>
      </div>

      <div className={s.filters}>
        <CardsPagination
          onChange={onChange}
          {...{ page, pageCount, cardsTotalCount }}
        />
        {/* <SearchPacks /> */}
      </div>

      <CardsTable />
    </div>
  );
};

import { useAppDispatch, useAppSelector } from "app/hooks";
import { CardsTable } from "features/cards/components/CardsTable/CardsTable";
import { AppPagination, BackLink } from "common/components";
import { useCardsFetch } from "features/cards/hooks/useCardsFetch";
import { useSearchParams } from "react-router-dom";
import { cardsThunks } from "features/cards/cards.slice";
import { SearchCards } from "features/cards/components/SearchCards/SearchCards";
import { CardsListHeader } from "./CardsListHeader/CardsListHeader";
import { Select } from "common/components/Select/Select";
import s from "./style.module.css";

export const CardsList = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const page = useAppSelector((state) => state.cards.list.page);
  const pageCount = useAppSelector((state) => state.cards.list.pageCount);
  const totalCount = useAppSelector(
    (state) => state.cards.list.cardsTotalCount
  );

  useCardsFetch();

  const onPage = (page: number) => {
    const query = { ...params, page: page.toString() };
    setSearchParams(query);
    dispatch(cardsThunks.get(query));
  };

  const onPageCount = (pageCount: number) => {
    const query = { ...params, page: "1", pageCount: pageCount.toString() };
    const query2 = { ...params, page: "1", pageCount };
    setSearchParams(query);
    dispatch(cardsThunks.get(query2));
  };

  return (
    <div className="container page">
      <BackLink />
      <CardsListHeader />

      <div className={s.pagination}>
        <AppPagination {...{ page, pageCount, totalCount, onPage }} />
        <Select pageCount={pageCount} onChange={onPageCount} />
      </div>

      <div className={s.filters}>
        <SearchCards />
      </div>

      <CardsTable />
    </div>
  );
};

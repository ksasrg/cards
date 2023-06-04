import Button from "@mui/material/Button/Button";
import { useAppSelector } from "app/hooks";
import { CardsTable } from "features/cards/components/CardsTable/CardsTable";
import { AppPagination, BackLink, PaginationQuery } from "common/components";
import { useCardsFetch } from "features/cards/hooks/useCardsFetch";
import { useSearchParams } from "react-router-dom";
import s from "./style.module.css";

export const CardsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams);
  const page = useAppSelector((state) => state.cards.list.page);
  const pageCount = useAppSelector((state) => state.cards.list.pageCount);
  const totalCount = useAppSelector(
    (state) => state.cards.list.cardsTotalCount
  );

  useCardsFetch();

  const onChange = (query: PaginationQuery) => {
    setSearchParams({ ...params, ...(query as Record<string, string>) });
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
